const promisifyWithDelay = (cb, delay = 2500) => {
    let timeoutId = null;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        return new Promise((res) => {
            timeoutId = setTimeout(() => {
                timeoutId = null;
                res(cb(...args));
            }, delay);
        });
    }
}

export { promisifyWithDelay };