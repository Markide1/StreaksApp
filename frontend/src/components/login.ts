import { login } from '../api';
import { navigate } from '../main';

export function renderLogin(container: HTMLElement | null) {
    if (!container) return;

    container.innerHTML = `
        <h2>Login</h2>
        <form id="login-form">
            <input type="email" id="email" placeholder="Email" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="#" id="signup-link">Sign up</a></p>
        <p>Forgot your password? <a href="#" id="reset-password-link">Reset password</a></p>
    `;

    const form = document.getElementById('login-form') as HTMLFormElement;
    const signupLink = document.getElementById('signup-link') as HTMLAnchorElement;
    const resetPasswordLink = document.getElementById('reset-password-link') as HTMLAnchorElement;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        console.log('Login attempt with:', { email, password }); // Debugging line

        try {
            await login(email, password);
            navigate('dashboard'); // Proceed to dashboard only if login is successful
        } catch (error) {
            let errorMessage = 'An unexpected error occurred';

            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === 'string') {
                errorMessage = error;
            }

            console.error('Login error:', error);
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
}
