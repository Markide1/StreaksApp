import { Streak as StreakType } from '../components/streak';
import Chart from 'chart.js/auto';

// Use StreakType instead of Streak in the rest of the file
interface Streak extends StreakType {
    length: number;
}

export function renderLineGraph(container: HTMLElement, streaks: Streak[]) {
    container.innerHTML = '<canvas id="streak-graph"></canvas>';

    const ctx = document.getElementById('streak-graph') as HTMLCanvasElement;
    const sortedStreaks = streaks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: sortedStreaks.map(streak => new Date(streak.createdAt).toLocaleDateString()),
            datasets: [{
                label: 'Streak Length',
                data: sortedStreaks.map(streak => streak.length),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
