var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { logout } from '../api';
import { navigate } from '../main';
import { renderStreak } from './streak';
export function renderDashboard(container) {
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
    }
    else {
        console.error('Streak container not found in dashboard');
    }
    const logoutButton = document.getElementById('logout-button');
    logoutButton === null || logoutButton === void 0 ? void 0 : logoutButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield logout();
            navigate('home'); // Redirect to the home page after logout
        }
        catch (error) {
            console.error('Logout error:', error);
            alert('Failed to logout. Please try again.');
        }
    }));
}
//# sourceMappingURL=dashboard.js.map