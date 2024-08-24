var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getStreaks, updateStreakCount, resetStreak, createStreak, deleteStreak } from '../api';
import { debounce } from '../utils';
let streaksData = [];
const debouncedRenderStreak = debounce((container) => __awaiter(void 0, void 0, void 0, function* () {
    if (!container) {
        console.error('Streak container not found');
        return;
    }
    try {
        console.log('Rendering streaks...');
        streaksData = yield getStreaks();
        console.log('Streaks data received:', streaksData);
        renderStreaksList(container);
    }
    catch (error) {
        console.error('Render streak error:', error);
        container.innerHTML = `<p>Failed to load streak data. Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>`;
    }
}), 300);
function renderStreaksList(container) {
    const streaksList = document.getElementById('streaks-list');
    if (streaksList && Array.isArray(streaksData)) {
        streaksList.innerHTML = '';
        streaksData.forEach((streak) => {
            if (streak && streak.name && streak.count !== undefined && streak.lastReset !== undefined) {
                const streakElement = document.createElement('div');
                streakElement.innerHTML = `
                    <h3>${streak.name}</h3>
                    <p>Current streak: ${streak.count} days</p>
                    <p>Last reset: ${new Date(streak.lastReset).toLocaleDateString()}</p>
                    <button class="update-streak" data-id="${streak.id}">Increment Streak</button>
                    <button class="reset-streak" data-id="${streak.id}">Reset Streak</button>
                    <button class="delete-streak" data-id="${streak.id}">Delete Streak</button>
                `;
                streaksList.appendChild(streakElement);
            }
            else {
                console.error('Invalid streak format:', streak);
            }
        });
    }
    else {
        console.error('Invalid streaks data format');
    }
}
export function renderStreak(container) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!container) {
            console.error('Streak container not found');
            return;
        }
        container.innerHTML = `
        <h2>Your Streaks</h2>
        <div id="streaks-list"></div>
        <h3>Create New Streak</h3>
        <form id="create-streak-form">
            <input type="text" id="streak-name" placeholder="Streak Name" required>
            <button type="submit">Create Streak</button>
        </form>
    `;
        const createStreakForm = document.getElementById('create-streak-form');
        createStreakForm === null || createStreakForm === void 0 ? void 0 : createStreakForm.addEventListener('submit', (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const name = document.getElementById('streak-name').value;
            try {
                yield createStreak(name);
                debouncedRenderStreak(container);
            }
            catch (error) {
                console.error('Create streak error:', error);
                alert('Failed to create streak');
            }
        }));
        container.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
            if (e.target instanceof HTMLElement) {
                const streakId = e.target.getAttribute('data-id');
                if (streakId) {
                    try {
                        if (e.target.classList.contains('update-streak')) {
                            yield updateStreakCount(streakId);
                        }
                        else if (e.target.classList.contains('reset-streak')) {
                            yield resetStreak(streakId);
                        }
                        else if (e.target.classList.contains('delete-streak')) {
                            yield deleteStreak(streakId);
                        }
                        debouncedRenderStreak(container);
                    }
                    catch (error) {
                        console.error('Streak action error:', error);
                        alert('Failed to perform action on streak');
                    }
                }
            }
        }));
        debouncedRenderStreak(container);
    });
}
//# sourceMappingURL=streak.js.map