import { getStreakStats, getStreaks } from '../api';
import { renderCalendar } from './calender';
import { renderLineGraph } from './lineGraph';

export async function renderStats(container: HTMLElement) {
    const { longestStreak, currentStreak } = await getStreakStats();
    const streaks = await getStreaks();

    container.innerHTML = `
        <div class="stats-container">
            <h2>Streak Stats</h2>
            <div id="streak-summary">
                <p id="longest-streak">Longest Streak: ${longestStreak} days</p>
                <p id="current-streak">Current Streak: ${currentStreak} days</p>
            </div>
            <div id="calendar-container"></div>
            <div id="line-graph-container"></div>
        </div>
    `;

    const calendarContainer = document.getElementById('calendar-container');
    if (calendarContainer) {
        renderCalendar(calendarContainer, streaks);
    }

    const lineGraphContainer = document.getElementById('line-graph-container');
    if (lineGraphContainer) {
        renderLineGraph(lineGraphContainer, streaks);
    }
}
