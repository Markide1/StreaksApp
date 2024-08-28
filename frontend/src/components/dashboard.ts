import { logout } from '../api';
import { navigate } from '../main';
import { renderStreak } from './streak';
import { getStreakStats } from '../api';
import { API_URL } from '../config/config';
import { renderStats } from '../utils/stats';

export async function renderDashboard(container: HTMLElement | null) {
    if (!container) {
        console.error('Dashboard container not found');
        return;
    }

    console.log('Rendering dashboard...');
    const username = localStorage.getItem('username') || 'User';

    try {
        const { longestStreak, currentStreak } = await getStreakStats();

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
                            <button id="stats-button">Stats</button>
                            <button id="settings-button">Settings</button>
                            <button id="logout-button">Logout</button>
                        </div>
                    </div>
                </div>
                <div class="dashboard-content">
                    <div class="main-content">
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
        } else {
            console.error('Streak container not found in dashboard');
        }

        const userAvatar = container.querySelector('#user-avatar') as HTMLImageElement;
        const avatarUrl = localStorage.getItem('avatarUrl');
        if (avatarUrl) {
            userAvatar.src = `${API_URL}/${avatarUrl}`;
        } else {
            userAvatar.src = require('../assets/default-avatar.png').default;
        }

        const profileDropdownButton = container.querySelector('#profile-dropdown-button');
        const profileDropdownContent = container.querySelector('.profile-dropdown-content');

        profileDropdownButton?.addEventListener('click', () => {
            profileDropdownContent?.classList.toggle('show');
        });

        const statsButton = container.querySelector('#stats-button');
        statsButton?.addEventListener('click', () => {
            renderStats(container);
        });

        const settingsButton = container.querySelector('#settings-button');
        settingsButton?.addEventListener('click', () => {
            navigate('settings');
        });

        const logoutButton = container.querySelector('#logout-button');
        logoutButton?.addEventListener('click', async () => {
            try {
                await logout();
                localStorage.removeItem('username');
                navigate('home');
            } catch (error) {
                console.error('Logout error:', error);
                alert('Failed to logout. Please try again.');
            }
        });

        document.addEventListener('click', (event) => {
            if (!profileDropdownButton?.contains(event.target as Node)) {
                profileDropdownContent?.classList.remove('show');
            }
        });

    } catch (error) {
        console.error('Error rendering dashboard:', error);
        container.innerHTML = '<p>Error loading dashboard. Please try again later.</p>';
    }
}