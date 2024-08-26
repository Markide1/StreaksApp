import { login } from '../api';
import { navigate } from '../main';
import { handleError } from '../utils/errorHandler';

export function renderLogin(container: HTMLElement | null) {
    if (!container) return;

    container.innerHTML = `
        <h2>Login</h2>
        <form id="login-form">
            <input type="email" id="email" placeholder="Email" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">Login</button>
            <button id="back-btn">Back</button>
        </form>
        <p>Don't have an account? <a href="#" id="signup-link">Sign up</a></p>
        <p>Forgot your password? <a href="#" id="reset-password-link">Reset password</a></p>
    `;

    const form = document.getElementById('login-form') as HTMLFormElement;
    const signupLink = document.getElementById('signup-link') as HTMLAnchorElement;
    const resetPasswordLink = document.getElementById('reset-password-link') as HTMLAnchorElement;
    const backBtn = document.getElementById('back-btn') as HTMLButtonElement;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        try {
            await login(email, password);
            navigate('dashboard');
        } catch (error) {
            const errorMessage = handleError(error);
            alert(`Login failed: ${errorMessage}`);
        }
    });

    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        navigate('signup');
    });

    resetPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        navigate('passwordReset');
    });

    backBtn.addEventListener('click', () => {
        navigate('home');
    });
}