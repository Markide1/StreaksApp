var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { signup } from '../api';
import { navigate } from '../main';
export function renderSignup(container) {
    if (!container)
        return;
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
    const form = document.getElementById('signup-form');
    const loginLink = document.getElementById('login-link');
    const messageElement = document.getElementById('message');
    const backBtn = document.getElementById('back-btn');
    form.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        try {
            const result = yield signup(email, username, password);
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
            }
            else {
                if (messageElement) {
                    messageElement.textContent = 'Signup failed. Please try again.';
                    messageElement.style.color = 'red';
                }
            }
        }
        catch (error) {
            console.error('Signup error:', error);
            if (messageElement) {
                messageElement.textContent = error instanceof Error ? error.message : 'An error occurred. Please try again.';
                messageElement.style.color = 'red';
            }
        }
    }));
    loginLink === null || loginLink === void 0 ? void 0 : loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        navigate('login');
    });
    backBtn.addEventListener('click', () => {
        navigate('home');
    });
}
//# sourceMappingURL=signup.js.map