/**
 * Utility functions for general use
 */

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, or empty object)
 * @param {*} value
 * @returns {boolean}
 */
function isEmpty(value) {
    if (value == null) return true;
    if (typeof value === 'string' && value.trim() === '') return true;
    if (Array.isArray(value) && value.length === 0) return true;
    if (typeof value === 'object' && Object.keys(value).length === 0) return true;
    return false;
}

/**
 * Deep clones an object or array
 * @param {*} obj
 * @returns {*}
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Capitalizes the first letter of a string
 * @param {string} str
 * @returns {string}
 */
function capitalize(str) {
    if (typeof str !== 'string' || !str.length) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
    isEmpty,
    deepClone,
    capitalize,
};