import { requestPasswordReset } from '../api';
import { navigate } from '../main';

export function renderPasswordReset(container: HTMLElement) {
    container.innerHTML = `
        <h2>Reset Password</h2>
        <form id="password-reset-form">
            <input type="email" id="email" placeholder="Enter your email" required>
            <button type="submit">Request Password Reset</button>
        </form>
        <p><a href="#" id="back-to-login">Back to Login</a></p>
    `;

    const form = document.getElementById('password-reset-form') as HTMLFormElement;
    const backToLoginLink = document.getElementById('back-to-login');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = (document.getElementById('email') as HTMLInputElement).value;

        try {
            await requestPasswordReset(email);
            alert('The reset code has been sent to your email.');
            navigate('setNewPassword');
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

export function renderPasswordResetConfirmation(container: HTMLElement) {
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

    const form = document.getElementById('password-reset-confirm-form') as HTMLFormElement;
    const backToLoginLink = document.getElementById('back-to-login');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const resetCode = (document.getElementById('reset-code') as HTMLInputElement).value;
        const newPassword = (document.getElementById('new-password') as HTMLInputElement).value;
        const confirmPassword = (document.getElementById('confirm-password') as HTMLInputElement).value;

        try {
            const response = await fetch(`/api/auth/reset-password/confirm`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resetCode, password: newPassword, confirmPassword }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            alert('Your password has been successfully reset.');
            navigate('login');
        } catch (error) {
            console.error('Password reset confirmation error:', error);
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
