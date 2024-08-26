import { logout } from '../api';
import { navigate } from '../main';
import { renderStreak } from './streak';

export function renderDashboard(container: HTMLElement | null) {
    if (!container) {
        console.error('Dashboard container not found');
        return;
    }
    console.log('Rendering dashboard...');
    const username = localStorage.getItem('username');
    container.innerHTML = `
        <h1>Current Streaks</h1>
        <div id="streak-container">
            <div id="streaks-list"></div>
            <h3>Create New Streak</h3>
            <form id="create-streak-form">
                <input type="text" id="streak-name" placeholder="Streak Name" required>
                <button type="submit">Create</button>
            </form>
        </div>
        <button id="settings-button">Settings</button>
        <button id="logout-button">Logout</button>
    `;

    const streakContainer = document.getElementById('streak-container');
    if (streakContainer) {
        console.log('Calling renderStreak...');
        renderStreak(streakContainer);
    } else {
        console.error('Streak container not found in dashboard');
    }

    const logoutButton = document.getElementById('logout-button');
    logoutButton?.addEventListener('click', async () => {
        try {
            await logout();
            navigate('home');  // Redirect to the home page after logout
        } catch (error) {
            console.error('Logout error:', error);
            alert('Failed to logout. Please try again.');
        }
    });

    const settingsButton = document.getElementById('settings-button');
    settingsButton?.addEventListener('click', () => {
        navigate('settings');
    });
}