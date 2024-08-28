import { renderDashboard } from '../components/dashboard';
import { renderLineGraph } from './lineGraph';
import { getStreakStats } from '../api';
import { getStreaks } from '../api';
import { renderCalendar } from '/home/m_/StreaksApp/frontend/src/utils/calender';

export async function renderStats(container: HTMLElement) {
    try {
        const { longestStreak, currentStreak } = await getStreakStats();
        const streaks = await getStreaks();

        container.innerHTML = `
            <div class="stats-container">
                <button id="back-button" class="dashboard-button">Dash</button>
                <h2>Streak Statistics</h2>
                <p>Longest Streak: ${longestStreak} days</p>
                <p>Current Streak: ${currentStreak} days</p>
                <div id="calendar-container"></div>
                <div id="line-graph-container"></div>
            </div>
        `;

        const backButton = document.getElementById('back-button');
        backButton?.addEventListener('click', () => renderDashboard(container));

        const calendarContainer = document.getElementById('calendar-container');
        if (calendarContainer) {
            renderCalendar(calendarContainer, streaks);
        }

        const lineGraphContainer = document.getElementById('line-graph-container');
        if (lineGraphContainer) {
            renderLineGraph(lineGraphContainer, streaks);
        }
    } catch (error) {
        console.error('Error rendering stats:', error);
        container.innerHTML = '<p>Error loading stats. Please try again later.</p>';
    }
}
