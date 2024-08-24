import { resetPassword } from '../api';
import { navigate } from '../main';

export function renderSetNewPassword(container: HTMLElement) {
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

    const form = document.getElementById('set-new-password-form') as HTMLFormElement;
    const backToLoginLink = document.getElementById('back-to-login');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const resetCode = (document.getElementById('reset-code') as HTMLInputElement).value;
        const newPassword = (document.getElementById('new-password') as HTMLInputElement).value;
        const confirmPassword = (document.getElementById('confirm-password') as HTMLInputElement).value;

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        try {
            await resetPassword(resetCode, newPassword);
            alert('Password has been updated successfully.');
            navigate('login');
        } catch (error) {
            console.error('Password reset error:', error);
            if (error instanceof Error) {
                alert(`Password reset failed: ${error.message}`);
            } else {
                alert('An unexpected error occurred. Please try again.');
            }
        }
    });

    backToLoginLink?.addEventListener('click', (e) => {
        e.preventDefault();
        navigate('login');
    });
}
