import { navigate } from '../main';

export function renderHome(container: HTMLElement) {
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
    document.getElementById('login-btn')?.addEventListener('click', () => navigate('login'));
    document.getElementById('signup-btn')?.addEventListener('click', () => navigate('signup'));
}