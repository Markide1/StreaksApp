import { Streak as StreakType } from '../components/streak';
import Chart from 'chart.js/auto';
import { DateTime } from 'luxon';
import 'chartjs-adapter-luxon';
import { TimeScale } from 'chart.js';

Chart.register(TimeScale);

interface Streak extends StreakType {
    length: number;
}

export function renderLineGraph(container: HTMLElement, streaks: Streak[]) {
    container.innerHTML = '<canvas id="streak-graph"></canvas>';

    const ctx = document.getElementById('streak-graph') as HTMLCanvasElement;
    const sortedStreaks = streaks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    const datasets = streaks.map(streak => ({
        label: streak.name,
        data: generateDataPoints(streak),
        borderColor: getRandomColor(),
        tension: 0.1
    }));

    new Chart(ctx, {
        type: 'line',
        data: { datasets },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function generateDataPoints(streak: Streak) {
    const dataPoints = [];
    let currentDate = new Date(streak.createdAt);
    const endDate = new Date(streak.lastUpdated);
    let count = 0;

    while (currentDate <= endDate) {
        dataPoints.push({
            x: new Date(currentDate),
            y: count
        });
        count++;
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dataPoints;
}

function getRandomColor() {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
}
