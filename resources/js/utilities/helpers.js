// /src/utils/helpers.js
/**
 * Example: lowercase a string
 */
export function lowercase(s) {
    if (!s) return "";
    return s.toLowerCase();
}

/**
 * ucfirst the first letter of a string
 */
export function ucfirst(s) {
    if (!s) return "";
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
}

export function applyEnum(enums, value) {
    const result = Object.keys(enums).find(key => enums[key] === value)

    return ucfirst(result);
}
