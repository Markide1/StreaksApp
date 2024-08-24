import { navigate } from '../main';

export function renderHome(container: HTMLElement) {
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
    document.getElementById('login-btn')?.addEventListener('click', () => navigate('login'));
    document.getElementById('signup-btn')?.addEventListener('click', () => navigate('signup'));
}