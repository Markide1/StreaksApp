import { logout } from '../api';
import { navigate } from '../main';
import { renderStreak } from './streak';
import { getStreakStats } from '../api';

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
                <h1>Welcome, ${username}!</h1>
                <div class="dashboard-content">
                    <div class="sidebar">
                        <button id="settings-button" class="dashboard-button">Profile Settings</button>
                        <button id="logout-button" class="dashboard-button">Logout</button>
                    </div>
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
        } else {
            console.error('Streak container not found in dashboard');
        }

        const logoutButton = document.getElementById('logout-button');
        logoutButton?.addEventListener('click', async () => {
            try {
                await logout();
                localStorage.removeItem('username'); // Clear username on logout
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
    } catch (error) {
        console.error('Error rendering dashboard:', error);
        container.innerHTML = '<p>Error loading dashboard. Please try again later.</p>';
    }
}