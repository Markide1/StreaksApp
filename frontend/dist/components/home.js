import { navigate } from '../main';
export function renderHome(container) {
    var _a, _b;
    container.innerHTML = `
        <div class="home-container">
            <h1>Welcome to StreaksApp</h1>
            <h3>Here you can track your daily habits <br> and build streaks to stay motivated!</h3>
            <p>Please login or sign up to continue.</p>
            <button id="login-btn">Login</button>
            <button id="signup-btn">Sign Up</button>
        </div>
    `;
    // Add event listeners to the buttons
    (_a = document.getElementById('login-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => navigate('login'));
    (_b = document.getElementById('signup-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => navigate('signup'));
}
//# sourceMappingURL=home.js.map