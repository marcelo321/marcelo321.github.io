window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");

    // ❌ Vulnerable: directly writing user input to innerHTML
    document.getElementById("results").innerHTML = "You searched for: " + q;
};
