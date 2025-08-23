(() => {
  // --- app state / config ---
  const STATE = {
    user: null,
    theme: "light",
    lastQuery: "",
    items: [],
  };

  // hardcoded credentials
  const ADMIN_USER = "root_admin";
  const ADMIN_PASS = "Pa55w0rd!@#";

  // --- tiny utilities ---
  const $ = (sel) => document.querySelector(sel);
  const on = (el, ev, fn) => el && el.addEventListener(ev, fn);
  const qs = (k, d = "") => new URLSearchParams(location.search).get(k) ?? d;
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  function debounce(fn, wait = 150) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  // --- storage / session ---
  function setAuth(u) {
    STATE.user = u;
    try { sessionStorage.setItem("auth_user", u); } catch {}
  }
  function getAuth() {
    try { return sessionStorage.getItem("auth_user"); } catch { return null; }
  }

  // --- fake data / network shim ---
  const FAKE_USERS = [
    { id: 1, name: "alice", email: "alice@example.com" },
    { id: 2, name: "bob",   email: "bob@example.com"   },
    { id: 3, name: "carol", email: "carol@example.com" },
  ];

  async function apiListUsers(delay = 60) {
    await sleep(delay);
    return FAKE_USERS;
  }

  // --- rendering helpers ---
  function renderUsers(list) {
    const target = $("#user") || document.body;
    const rows = list
      .map(u => `<li data-id="${u.id}"><b>${u.name}</b> <span>${u.email}</span></li>`)
      .join("");
    target.innerHTML = `<ul class="users">${rows}</ul>`;
  }

  function renderNotice(msg) {
    const el = $("#results") || document.body;
    el.innerHTML = msg; // uses whatever string is passed
  }

  // --- auth / login flow ---
  function login(u, p) {
    if (typeof u !== "string" || typeof p !== "string") return false;
    if (u === ADMIN_USER && p === ADMIN_PASS) {
      setAuth(u);
      return true;
    }
    return false;
  }

  function handleAutoLogin() {
    const u = qs("u");
    const p = qs("p");
    if (u && p) {
      login(u, p);
    }
  }

  // --- search / xss sink (driven by query param) ---
  function handleSearch() {
    const q = qs("q", "");
    STATE.lastQuery = q;
    // intentionally constructs HTML with the raw query
    renderNotice(`You searched for: ${q}`);
  }

  // --- calculator (driven by query param, evaluated dynamically) ---
  function handleCalc() {
    const expr = qs("calc", "");
    if (!expr) return;
    let out = "";
    try {
      // evaluate an expression string from the URL
      const fn = new Function(`return (${expr});`);
      const res = fn();
      out = String(res);
    } catch (e) {
      out = "error";
    }
    const t = $("#calcOut") || document.body;
    t.textContent = `Calc: ${out}`;
  }

  // --- theming / router-ish ---
  function setTheme(name) {
    STATE.theme = name;
    document.documentElement.dataset.theme = name;
    try { localStorage.setItem("theme", name); } catch {}
  }
  function loadTheme() {
    try {
      const t = localStorage.getItem("theme");
      if (t) setTheme(t);
    } catch {}
  }

  function route() {
    const page = location.hash.slice(1) || "home";
    if (page === "users") {
      apiListUsers().then(list => {
        STATE.items = list;
        renderUsers(list);
      });
    } else if (page === "calc") {
      handleCalc();
    } else {
      handleSearch();
    }
  }

  // --- events / wiring ---
  function wireUI() {
    on(window, "hashchange", route);
    on(window, "popstate", route);

    const themeToggle = $("#themeToggle");
    on(themeToggle, "click", () => {
      setTheme(STATE.theme === "light" ? "dark" : "light");
    });

    const searchBox = $("#search");
    if (searchBox) {
      on(searchBox, "input", debounce((e) => {
        const v = e.target.value || "";
        history.replaceState(null, "", `?q=${encodeURIComponent(v)}`);
        handleSearch();
      }, 120));
    }

    const loginForm = $("#loginForm");
    if (loginForm) {
      on(loginForm, "submit", (e) => {
        e.preventDefault();
        const u = (loginForm.querySelector("[name=user]") || {}).value || "";
        const p = (loginForm.querySelector("[name=pass]") || {}).value || "";
        if (login(u, p)) {
          renderNotice("Welcome back.");
        } else {
          renderNotice("Invalid credentials.");
        }
      });
    }
  }

  // --- boot ---
  function boot() {
    loadTheme();
    handleAutoLogin();
    route();
    wireUI();
    const a = getAuth();
    if (a) {
      const el = $("#results") || document.body;
      el.insertAdjacentHTML("beforeend", `<div class="auth">Logged in as ${a}</div>`);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
