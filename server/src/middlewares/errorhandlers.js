const express = require('express');

// 404 Not Found handler
function notFoundHandler(req, res, next) {
    res.status(404).json({ error: 'Resource not found' });
}

// General error handler
function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
}

module.exports = {
    notFoundHandler,
    errorHandler
};