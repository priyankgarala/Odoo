class HttpError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.name = 'HttpError';
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

function createHttpError(statusCode, message) {
    return new HttpError(statusCode, message);
}

module.exports = {
    HttpError,
    createHttpError,
};