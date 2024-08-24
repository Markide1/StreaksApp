import { logout } from '../api';
import { navigate } from '../main';
import { renderStreak } from './streak';

export function renderDashboard(container: HTMLElement | null) {
    if (!container) {
        console.error('Dashboard container not found');
        return;
    }

    console.log('Rendering dashboard...');
    container.innerHTML = `
        <h1>Dashboard</h1>
        <div id="streak-container"></div>
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
}
