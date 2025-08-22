function isValidUsername(input) {
    // This regex is vulnerable to ReDoS
    return /^[a-zA-Z0-9]+(.*[a-zA-Z0-9]+)*$/.test(input);
}

console.log("Check:", isValidUsername("a".repeat(50000) + "!"));
