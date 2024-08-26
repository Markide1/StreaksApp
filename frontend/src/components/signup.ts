import { signup } from '../api';
import { navigate } from '../main';

export function renderSignup(container: HTMLElement | null) {
    if (!container) return;

    container.innerHTML = `
        <h2>Sign Up</h2>
        <form id="signup-form">
            <input type="email" id="email" placeholder="Email" required>
            <input type="username" id="username" placeholder="Username" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">Sign Up</button>
            <button id="back-btn">Back</button>
        </form>
        <p id="message"></p>
        <p>Already have an account? <a href="#" id="login-link">Login</a></p>
    `;

    const form = document.getElementById('signup-form') as HTMLFormElement;
    const loginLink = document.getElementById('login-link');
    const messageElement = document.getElementById('message');
    const backBtn = document.getElementById('back-btn') as HTMLButtonElement;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        try {
            const result = await signup(email, username, password);
            if (result.success) {
                if (messageElement) {
                    messageElement.textContent = 'Signup successful! Redirecting to login...';
                    messageElement.style.color = 'green';
                }
                // Clear the form
                form.reset();
                // Redirect to login after a short delay
                setTimeout(() => {
                    navigate('login');
                }, 2000); // 2 seconds delay
            } else {
                if (messageElement) {
                    messageElement.textContent = 'Signup failed. Please try again.';
                    messageElement.style.color = 'red';
                }
            }
        } catch (error) {
            console.error('Signup error:', error);
            if (messageElement) {
                messageElement.textContent = error instanceof Error ? error.message : 'An error occurred. Please try again.';
                messageElement.style.color = 'red';
            }
        }
    });

    loginLink?.addEventListener('click', (e) => {
        e.preventDefault();
        navigate('login');
    });

    backBtn.addEventListener('click', () => {
        navigate('home');
    });
}