export function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export function validatePassword(password) {
    return password.length >= 6;
}
export function validateUsername(username) {
    return /^[a-zA-Z0-9_]{3,30}$/.test(username);
}
//# sourceMappingURL=userProfileValidator.js.map