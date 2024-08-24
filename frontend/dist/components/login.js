var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { login } from '../api';
import { navigate } from '../main';
export function renderLogin(container) {
    if (!container)
        return;
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
    const form = document.getElementById('login-form');
    const signupLink = document.getElementById('signup-link');
    const resetPasswordLink = document.getElementById('reset-password-link');
    form.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
            const result = yield login(email, password);
            if (result && result.token) {
                localStorage.setItem('token', result.token);
                navigate('dashboard');
            }
            else {
                alert('Login failed. Please check your credentials and try again.');
            }
        }
        catch (error) {
            console.error('Login error:', error);
            if (error instanceof Error) {
                alert(`Login failed: ${error.message}`);
            }
            else {
                alert('An unexpected error occurred. Please try again.');
            }
        }
    }));
    signupLink === null || signupLink === void 0 ? void 0 : signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        navigate('signup');
    });
    resetPasswordLink === null || resetPasswordLink === void 0 ? void 0 : resetPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        navigate('passwordReset');
    });
}
//# sourceMappingURL=login.js.map