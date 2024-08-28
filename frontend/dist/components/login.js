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
import { handleError } from '../utils/errorHandler';
export function renderLogin(container) {
    if (!container)
        return;
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
    const form = document.getElementById('login-form');
    const signupLink = document.getElementById('signup-link');
    const resetPasswordLink = document.getElementById('reset-password-link');
    const backBtn = document.getElementById('back-btn');
    form.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
            yield login(email, password);
            navigate('dashboard');
        }
        catch (error) {
            const errorMessage = handleError(error);
            alert(`Login failed: ${errorMessage}`);
        }
    }));
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
//# sourceMappingURL=login.js.map