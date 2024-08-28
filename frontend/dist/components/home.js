import { navigate } from '../main';
export function renderHome(container) {
    var _a, _b;
    container.innerHTML = `
        <div class="home-container">
            <h1>Welcome to StreaksApp</h1>
            <h3>Track your daily habits and build streaks to stay motivated!</h3>
            <p>StreaksApp helps you achieve your goals by making it easy to track your progress and stay accountable. Whether you want to exercise more, eat healthier, or learn a new skill, StreaksApp can help you stay on track.</p>
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