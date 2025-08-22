function merge(target, source) {
    for (let key in source) {
        target[key] = source[key];
    }
    return target;
}

const params = Object.fromEntries(new URLSearchParams(location.search).entries());
merge(Object.prototype, params);   // unsafe

console.log("User object:", {});
