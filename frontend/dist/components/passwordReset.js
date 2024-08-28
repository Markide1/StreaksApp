var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { requestPasswordReset } from '../api';
import { navigate } from '../main';
export function renderPasswordReset(container) {
    container.innerHTML = `
        <h2>Reset Password</h2>
        <form id="password-reset-form">
            <input type="email" id="email" placeholder="Enter your email" required>
            <button type="submit">Request Password Reset</button>
        </form>
        <p><a href="#" id="back-to-login">Back to Login</a></p>
    `;
    const form = document.getElementById('password-reset-form');
    const backToLoginLink = document.getElementById('back-to-login');
    form.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const email = document.getElementById('email').value;
        try {
            yield requestPasswordReset(email);
            alert('The reset code has been sent to your email.');
            navigate('setNewPassword');
        }
        catch (error) {
            console.error('Password reset error:', error);
            if (error instanceof Error) {
                alert(`Password reset failed: ${error.message}`);
            }
            else {
                alert('An unexpected error occurred. Please try again.');
            }
        }
    }));
    backToLoginLink === null || backToLoginLink === void 0 ? void 0 : backToLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        navigate('login');
    });
}
export function renderPasswordResetConfirmation(container) {
    container.innerHTML = `
        <h2>Confirm Password Reset</h2>
        <form id="password-reset-confirm-form">
            <input type="text" id="reset-code" placeholder="Enter reset code" required>
            <input type="password" id="new-password" placeholder="Enter new password" required>
            <input type="password" id="confirm-password" placeholder="Confirm new password" required>
            <button type="submit">Reset Password</button>
        </form>
        <p><a href="#" id="back-to-login">Back to Login</a></p>
    `;
    const form = document.getElementById('password-reset-confirm-form');
    const backToLoginLink = document.getElementById('back-to-login');
    form.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const resetCode = document.getElementById('reset-code').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        try {
            const response = yield fetch(`/api/auth/reset-password/confirm`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resetCode, password: newPassword, confirmPassword }),
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            alert('Your password has been successfully reset.');
            navigate('login');
        }
        catch (error) {
            console.error('Password reset confirmation error:', error);
            if (error instanceof Error) {
                alert(`Password reset failed: ${error.message}`);
            }
            else {
                alert('An unexpected error occurred. Please try again.');
            }
        }
    }));
    backToLoginLink === null || backToLoginLink === void 0 ? void 0 : backToLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        navigate('login');
    });
}
//# sourceMappingURL=passwordReset.js.map