const Tesseract = require("tesseract.js");

exports.extractTextFromImage = async (filePath) => {
  try {
    const { data: { text } } = await Tesseract.recognize(filePath, "eng");
    return text;
  } catch (error) {
    console.error("OCR Error:", error);
    return "";
  }
};
