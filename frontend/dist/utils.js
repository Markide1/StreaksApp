export function debounce(func, waitFor) {
    let timeout = null;
    return (...args) => {
        return new Promise((resolve) => {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                resolve(func(...args));
            }, waitFor);
        });
    };
}
//# sourceMappingURL=utils.js.map