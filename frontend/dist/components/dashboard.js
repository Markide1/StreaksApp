var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { logout } from '../api';
import { navigate } from '../main';
import { renderStreak } from './streak';
import { getStreakStats } from '../api';
import { API_URL } from '../config/config';
export function renderDashboard(container) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!container) {
            console.error('Dashboard container not found');
            return;
        }
        console.log('Rendering dashboard...');
        const username = localStorage.getItem('username') || 'User';
        try {
            const { longestStreak, currentStreak } = yield getStreakStats();
            container.innerHTML = `
            <div class="dashboard">
                <div class="dashboard-header">
                    <h1>Welcome, ${username}!</h1>
                    <div class="profile-dropdown">
                        <button id="profile-dropdown-button" class="profile-dropdown-button">
                            <img src="/assets/default-avatar.png" alt="profile" id="user-avatar">
                            <span class="arrow-down"></span>
                        </button>
                        <div class="profile-dropdown-content">
                            <button id="settings-button">Settings</button>
                            <button id="logout-button">Logout</button>
                        </div>
                    </div>
                </div>
                <div class="dashboard-content">
                    <div class="main-content">
                        <div id="streak-summary">
                            <h2>Streak Summary</h2>
                            <p id="longest-streak">Longest Streak: ${longestStreak} days</p>
                            <p id="current-streak">Current Streak: ${currentStreak} days</p>
                        </div>
                        <div id="streak-container">
                            <h2>Your Streaks</h2>
                            <div id="streaks-list"></div>
                            <h3>Create New Streak</h3>
                            <form id="create-streak-form">
                                <input type="text" id="streak-name" placeholder="Streak Name" required>
                                <button type="submit" class="dashboard-button">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
            const streakContainer = document.getElementById('streak-container');
            if (streakContainer) {
                console.log('Calling renderStreak...');
                renderStreak(streakContainer);
            }
            else {
                console.error('Streak container not found in dashboard');
            }
            const userAvatar = container.querySelector('#user-avatar');
            const avatarUrl = localStorage.getItem('avatarUrl');
            if (avatarUrl) {
                userAvatar.src = `${API_URL}/${avatarUrl}`;
            }
            else {
                userAvatar.src = require('../assets/default-avatar.png').default;
            }
            const profileDropdownButton = container.querySelector('#profile-dropdown-button');
            const profileDropdownContent = container.querySelector('.profile-dropdown-content');
            profileDropdownButton === null || profileDropdownButton === void 0 ? void 0 : profileDropdownButton.addEventListener('click', () => {
                profileDropdownContent === null || profileDropdownContent === void 0 ? void 0 : profileDropdownContent.classList.toggle('show');
            });
            const settingsButton = container.querySelector('#settings-button');
            settingsButton === null || settingsButton === void 0 ? void 0 : settingsButton.addEventListener('click', () => {
                navigate('settings');
            });
            const logoutButton = container.querySelector('#logout-button');
            logoutButton === null || logoutButton === void 0 ? void 0 : logoutButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield logout();
                    localStorage.removeItem('username');
                    navigate('home');
                }
                catch (error) {
                    console.error('Logout error:', error);
                    alert('Failed to logout. Please try again.');
                }
            }));
            document.addEventListener('click', (event) => {
                if (!(profileDropdownButton === null || profileDropdownButton === void 0 ? void 0 : profileDropdownButton.contains(event.target))) {
                    profileDropdownContent === null || profileDropdownContent === void 0 ? void 0 : profileDropdownContent.classList.remove('show');
                }
            });
        }
        catch (error) {
            console.error('Error rendering dashboard:', error);
            container.innerHTML = '<p>Error loading dashboard. Please try again later.</p>';
        }
    });
}
//# sourceMappingURL=dashboard.js.map