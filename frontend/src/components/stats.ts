import { renderDashboard } from './dashboard';
import { renderLineGraph } from './lineGraph';
import { getStreakStats } from '../api';

export async function renderStats(container: HTMLElement) {
    try {
        const { longestStreak, currentStreak } = await getStreakStats();

        container.innerHTML = `
            <div class="stats-container">
                <button id="back-button" class="dashboard-button">Back to Dashboard</button>
                <h2>Streak Statistics</h2>
                <p>Longest Streak: ${longestStreak} days</p>
                <p>Current Streak: ${currentStreak} days</p>
                <div id="line-graph-container"></div>
            </div>
        `;

        const backButton = document.getElementById('back-button');
        backButton?.addEventListener('click', () => renderDashboard(container));

        const lineGraphContainer = document.getElementById('line-graph-container');
        if (lineGraphContainer) {
            renderLineGraph(lineGraphContainer, []);  // Pass an empty array for now
        }
    } catch (error) {
        console.error('Error rendering stats:', error);
        container.innerHTML = '<p>Error loading stats. Please try again later.</p>';
    }
}
