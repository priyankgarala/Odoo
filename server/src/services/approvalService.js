const Approval = require("../models/Approval");
const Expense = require("../models/Expense");
const ApprovalFlow = require("../models/ApprovalFlow");
const mongoose = require("mongoose");

async function createApprovalsForExpense(expense) {
  // Build approvals from the flow attached to this expense
  const flow = await ApprovalFlow.findById(expense.approvalFlowId);
  if (!flow) return;

  const approvalsToCreate = [];
  for (const step of flow.steps) {
    for (const approverId of step.approverIds) {
      approvalsToCreate.push({
        expenseId: expense._id,
        approverId,
        stepNumber: step.stepNumber,
        status: "pending",
        active: false
      });
    }
  }
  // create all and then activate first step
  const created = await Approval.insertMany(approvalsToCreate);
  // activate first step
  await Approval.updateMany({ expenseId: expense._id, stepNumber: flow.steps[0].stepNumber }, { $set: { active: true } });
  return created;
}

async function evaluateRule(expenseId) {
  const expense = await Expense.findById(expenseId).populate('approvalFlowId');
  if (!expense || !expense.approvalFlowId) return false;

  const flow = expense.approvalFlowId;
  if (!flow.rule || flow.rule.type === 'none') return false;

  // all approvals (across steps)
  const allApprovals = await Approval.find({ expenseId });
  const totalApprovers = new Set(allApprovals.map(a => a.approverId.toString())).size;
  const approvedCount = allApprovals.filter(a => a.status === 'approved').length;

  let byPercentage = false;
  let bySpecific = false;

  if ((flow.rule.type === 'percentage' || flow.rule.type === 'hybrid') && flow.rule.percentageThreshold) {
    const percent = (approvedCount / (totalApprovers || 1)) * 100;
    byPercentage = percent >= flow.rule.percentageThreshold;
  }

  if ((flow.rule.type === 'specific' || flow.rule.type === 'hybrid') && flow.rule.specificApproverId) {
    const sp = allApprovals.find(a => a.approverId.toString() === flow.rule.specificApproverId.toString() && a.status === 'approved');
    bySpecific = !!sp;
  }

  return byPercentage || bySpecific;
}

async function advanceStepIfNeeded(expenseId) {
  const expense = await Expense.findById(expenseId).populate('approvalFlowId');
  if (!expense || !expense.approvalFlowId) return;

  const flow = expense.approvalFlowId;
  const steps = flow.steps.sort((a,b) => a.stepNumber - b.stepNumber);
  for (const step of steps) {
    const approvals = await Approval.find({ expenseId, stepNumber: step.stepNumber });
    // If any approval in this step is pending, step is not complete
    const pending = approvals.filter(a => a.status === 'pending' || (a.status === 'pending' && a.active));
    const anyRejected = approvals.some(a => a.status === 'rejected');

    if (anyRejected) {
      // immediate rejection policy: reject whole expense
      await Expense.findByIdAndUpdate(expenseId, { status: 'rejected' });
      // optionally mark remaining approvals as skipped
      await Approval.updateMany({ expenseId, status: 'pending' }, { $set: { status: 'skipped', active: false }});
      return;
    }

    // check if this step is fully approved (all non-skipped are approved)
    const allDone = approvals.every(a => a.status === 'approved' || a.status === 'skipped');

    if (!allDone) {
      // step still in progress; nothing to do
      return;
    }

    // step finished -> find next step
    const nextStep = steps.find(s => s.stepNumber === step.stepNumber + 1);
    if (nextStep) {
      // activate next step approvals
      await Approval.updateMany({ expenseId, stepNumber: nextStep.stepNumber }, { $set: { active: true } });
      return;
    } else {
      // no next step: all steps done -> finalize expense status depending on rule
      const ruleSatisfied = await evaluateRule(expenseId);
      if (ruleSatisfied) {
        await Expense.findByIdAndUpdate(expenseId, { status: 'approved' });
      } else {
        // if no special rule but all steps approved -> approved
        await Expense.findByIdAndUpdate(expenseId, { status: 'approved' });
      }
      return;
    }
  }
}

async function onApprovalDecision(approvalId) {
  // Called when an approval doc is updated to approved/rejected
  const approval = await Approval.findById(approvalId);
  if (!approval) return;

  const expenseId = approval.expenseId.toString();

  // first evaluate rule to see if flow can be short-circuited
  const ruleSatisfied = await evaluateRule(expenseId);
  if (ruleSatisfied) {
    // mark expense approved and mark pending approvals skipped
    await Expense.findByIdAndUpdate(expenseId, { status: 'approved' });
    await Approval.updateMany({ expenseId, status: 'pending' }, { $set: { status: 'skipped', active: false }});
    return;
  }

  // otherwise attempt to advance steps
  await advanceStepIfNeeded(expenseId);
}

module.exports = {
  createApprovalsForExpense,
  evaluateRule,
  onApprovalDecision
};
