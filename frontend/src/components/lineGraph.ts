import { Streak } from './streak';
import Chart from 'chart.js/auto';

export function renderLineGraph(container: HTMLElement, streaks: Streak[]) {
    container.innerHTML = '<canvas id="streak-graph"></canvas>';

    const ctx = document.getElementById('streak-graph') as HTMLCanvasElement;
    const sortedStreaks = streaks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: sortedStreaks.map(streak => new Date(streak.createdAt).toLocaleDateString()),
            datasets: [{
                label: 'Streak Count',
                data: sortedStreaks.map(streak => streak.count),
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
