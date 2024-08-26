import { updateUserProfile, uploadProfilePhoto } from '../api';
import { handleError } from '../utils/errorHandler';
import { navigate } from '../main';

export function renderSettings(container: HTMLElement | null) {
    if (!container) {
        console.error('Settings container not found');
        return;
    }

    container.innerHTML = `
        <style>
            #settings-form {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .settings-row {
                display: flex;
                align-items: center;
                margin-bottom: 15px;
            }
            .settings-row label {
                display: flex;
                align-items: center;
                margin-right: 10px;
                min-width: 150px;
            }
            .settings-row input[type="checkbox"] {
                margin-right: 5px;
            }
            .settings-row input[type="text"],
            .settings-row input[type="email"],
            .settings-row input[type="password"],
            .settings-row input[type="file"] {
                flex: 1;
                padding: 5px;
            }
            .button-container {
                display: flex;
                justify-content: space-between;
                margin-top: 20px;
            }
            @media (max-width: 480px) {
                .settings-row {
                    flex-direction: column;
                    align-items: flex-start;
                }
                .settings-row label {
                    margin-bottom: 5px;
                }
                .settings-row input[type="text"],
                .settings-row input[type="email"],
                .settings-row input[type="password"],
                .settings-row input[type="file"] {
                    width: 100%;
                }
            }
        </style>
        <h1>Settings</h1>
        <form id="settings-form">
            <div class="settings-row">
                <label>
                    <input type="checkbox" id="change-username" name="change-username">
                    Update Username
                </label>
                <input type="text" id="username" name="username" disabled>
            </div>

            <div class="settings-row">
                <label>
                    <input type="checkbox" id="change-email" name="change-email">
                    Update Email
                </label>
                <input type="email" id="email" name="email" disabled>
            </div>

            <div class="settings-row">
                <label>
                    <input type="checkbox" id="change-password" name="change-password">
                    Update Password
                </label>
                <input type="password" id="password" name="password" disabled>
            </div>

            <div class="settings-row">
                <label>
                    <input type="checkbox" id="change-profile-photo" name="change-profile-photo">
                    Update Profile Photo
                </label>
                <input type="file" id="profile-photo" name="profile-photo" accept="image/*" disabled>
            </div>

            <div class="button-container">
                <button type="submit">Save Changes</button>
                <button type="button" id="back-button">Back</button>
            </div>
        </form>
    `;

    const settingsForm = document.getElementById('settings-form') as HTMLFormElement;
    const changeUsernameCheckbox = document.getElementById('change-username') as HTMLInputElement;
    const changeEmailCheckbox = document.getElementById('change-email') as HTMLInputElement;
    const changePasswordCheckbox = document.getElementById('change-password') as HTMLInputElement;
    const changeProfilePhotoCheckbox = document.getElementById('change-profile-photo') as HTMLInputElement;

    changeUsernameCheckbox.addEventListener('change', () => {
        (document.getElementById('username') as HTMLInputElement).disabled = !changeUsernameCheckbox.checked;
    });

    changeEmailCheckbox.addEventListener('change', () => {
        (document.getElementById('email') as HTMLInputElement).disabled = !changeEmailCheckbox.checked;
    });

    changePasswordCheckbox.addEventListener('change', () => {
        (document.getElementById('password') as HTMLInputElement).disabled = !changePasswordCheckbox.checked;
    });

    changeProfilePhotoCheckbox.addEventListener('change', () => {
        (document.getElementById('profile-photo') as HTMLInputElement).disabled = !changeProfilePhotoCheckbox.checked;
    });

    settingsForm?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = (document.getElementById('username') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const profilePhoto = (document.getElementById('profile-photo') as HTMLInputElement).files?.[0];

        try {
            await updateUserProfile(username, email, password);

            if (profilePhoto) {
                await uploadProfilePhoto(profilePhoto);
            }

            alert('Profile updated successfully');
        } catch (error) {
            const errorMessage = handleError(error);
            alert(`Failed to update profile: ${errorMessage}`);
        }
    });

    const backButton = document.getElementById('back-button');
    backButton?.addEventListener('click', () => {
        navigate('dashboard');
    });
}