var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { resetPassword } from '../api';
import { navigate } from '../main';
export function renderSetNewPassword(container) {
    container.innerHTML = `
        <h2>Set New Password</h2>
        <form id="set-new-password-form">
            <input type="text" id="reset-code" placeholder="Reset Code" required>
            <input type="password" id="new-password" placeholder="New Password" required>
            <input type="password" id="confirm-password" placeholder="Confirm New Password" required>
            <button type="submit">Set New Password</button>
        </form>
        <p><a href="#" id="back-to-login">Back to Login</a></p>
    `;
    const form = document.getElementById('set-new-password-form');
    const backToLoginLink = document.getElementById('back-to-login');
    form.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const resetCode = document.getElementById('reset-code').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }
        try {
            yield resetPassword(resetCode, newPassword);
            alert('Password has been updated successfully.');
            navigate('login');
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
//# sourceMappingURL=setNewPassword.js.map