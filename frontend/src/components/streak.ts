import { getStreaks, updateStreakCount, resetStreak, createStreak, deleteStreak } from '../api';
import { debounce } from '../utils';
import { handleError } from '../utils/errorHandler';

let streaksData: any[] = [];
let longestStreak = 0;
let currentStreak = 0;

const debouncedRenderStreak = debounce(async (container: HTMLElement) => {
    if (!container) {
        console.error('Streak container not found');
        return;
    }

    try {
        console.log('Rendering streaks...');
        streaksData = await getStreaks();
        console.log('Streaks data received:', streaksData);

        updateStreakSummary();
        renderStreaksList(container);
    } catch (error) {
        console.error('Render streak error:', error);
        container.innerHTML = `<p>Failed to load streak data. Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>`;
    }
}, 300);

function updateStreakSummary() {
    longestStreak = Math.max(...streaksData.map(streak => streak.count));
    currentStreak = streaksData.reduce((sum, streak) => sum + streak.count, 0);

    const longestStreakElement = document.getElementById('longest-streak');
    const currentStreakElement = document.getElementById('current-streak');

    if (longestStreakElement) longestStreakElement.textContent = `Longest Streak: ${longestStreak} days`;
    if (currentStreakElement) currentStreakElement.textContent = `Current Streak: ${currentStreak} days`;
}

function renderStreaksList(container: HTMLElement) {
    const streaksList = document.getElementById('streaks-list');
    if (streaksList && Array.isArray(streaksData)) {
        streaksList.innerHTML = '';

        streaksData.forEach((streak: any) => {
            if (streak && streak.name && streak.count !== undefined && streak.lastReset !== undefined) {
                const streakElement = document.createElement('div');
                streakElement.innerHTML = `
                    <h3>${streak.name}</h3>
                    <p>Current streak: ${streak.count} days</p>
                    <p>Last reset: ${new Date(streak.lastReset).toLocaleDateString()}</p>
                    <button class="update-streak" data-id="${streak.id}">Update</button>
                    <button class="reset-streak" data-id="${streak.id}">Reset</button>
                    <button class="delete-streak" data-id="${streak.id}">Delete</button>
                `;
                streaksList.appendChild(streakElement);
            } else {
                console.error('Invalid streak format:', streak);
            }
        });
    } else {
        console.error('Invalid streaks data format');
    }
}

export async function renderStreak(container: HTMLElement | null) {
    if (!container) {
        console.error('Streak container not found');
        return;
    }

    container.innerHTML = `
        <div id="streaks-list"></div>
        <h3>Create New Streak</h3>
        <form id="create-streak-form">
            <input type="text" id="streak-name" placeholder="Streak Name" required>
            <button type="submit">Create</button>
        </form>
    `;

    const createStreakForm = document.getElementById('create-streak-form') as HTMLFormElement;

    createStreakForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = (document.getElementById('streak-name') as HTMLInputElement).value;
        
        try {
            await createStreak(name);
            debouncedRenderStreak(container);
        } catch (error) {
            const errorMessage = handleError(error);
            alert(`Failed to create streak: ${errorMessage}`);
        }
    });

    container.addEventListener('click', async (e) => {
        if (e.target instanceof HTMLElement) {
            const streakId = e.target.getAttribute('data-id');
            if (streakId) {
                try {
                    if (e.target.classList.contains('update-streak')) {
                        await updateStreakCount(streakId);
                    } else if (e.target.classList.contains('reset-streak')) {
                        await resetStreak(streakId);
                    } else if (e.target.classList.contains('delete-streak')) {
                        await deleteStreak(streakId);
                    }
                    debouncedRenderStreak(container);
                } catch (error) {
                    console.error('Streak action error:', error);
                    alert('Failed to perform action on streak');
                }
            }
        }
    });

    debouncedRenderStreak(container);
}

export interface Streak {
    id: string;
    name: string;
    count: number;
    createdAt: string;
    lastUpdated: string;
    lastReset: string;
    deletedAt?: string | null;
}