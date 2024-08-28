var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { updateUserProfile, uploadProfilePhoto, verifyEmail } from '../api';
import { handleError } from '../utils/errorHandler';
import { navigate } from '../main';
export function renderSettings(container) {
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
    const settingsForm = document.getElementById('settings-form');
    const changeUsernameCheckbox = document.getElementById('change-username');
    const changeEmailCheckbox = document.getElementById('change-email');
    const changePasswordCheckbox = document.getElementById('change-password');
    const changeProfilePhotoCheckbox = document.getElementById('change-profile-photo');
    changeUsernameCheckbox.addEventListener('change', () => {
        document.getElementById('username').disabled = !changeUsernameCheckbox.checked;
    });
    changeEmailCheckbox.addEventListener('change', () => {
        document.getElementById('email').disabled = !changeEmailCheckbox.checked;
    });
    changePasswordCheckbox.addEventListener('change', () => {
        document.getElementById('password').disabled = !changePasswordCheckbox.checked;
    });
    changeProfilePhotoCheckbox.addEventListener('change', () => {
        document.getElementById('profile-photo').disabled = !changeProfilePhotoCheckbox.checked;
    });
    settingsForm === null || settingsForm === void 0 ? void 0 : settingsForm.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const profilePhoto = (_a = document.getElementById('profile-photo').files) === null || _a === void 0 ? void 0 : _a[0];
        let hasChanges = false;
        try {
            if (username || email || password) {
                const profileUpdateResult = yield updateUserProfile(username, email, password);
                console.log('Profile update response:', profileUpdateResult);
                hasChanges = true;
                if (profileUpdateResult === 'verification_required') {
                    const verificationCode = prompt('Please enter the verification code sent to your new email:');
                    if (verificationCode) {
                        yield verifyEmail(verificationCode);
                        console.log('Email verified successfully');
                        alert('Profile updated and email verified successfully');
                    }
                    else {
                        throw new Error('Email verification cancelled');
                    }
                }
                else {
                    console.log('Profile updated successfully');
                    alert('Profile updated successfully');
                }
            }
            if (profilePhoto) {
                yield uploadProfilePhoto(profilePhoto);
                console.log('Profile photo uploaded successfully');
                hasChanges = true;
            }
            if (!hasChanges) {
                alert('No changes were made.');
            }
            else {
                navigate('dashboard');
            }
        }
        catch (error) {
            console.error('Error updating profile:', error);
            const errorMessage = handleError(error);
            alert(`Failed to update profile: ${errorMessage}`);
        }
    }));
    const backButton = document.getElementById('back-button');
    backButton === null || backButton === void 0 ? void 0 : backButton.addEventListener('click', () => {
        navigate('dashboard');
    });
}
//# sourceMappingURL=settings.js.map