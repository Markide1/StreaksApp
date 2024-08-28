import { renderLogin } from './components/login';
import { renderDashboard } from './components/dashboard';
import { renderSignup } from './components/signup';
import { renderHome } from './components/home';
import { renderPasswordReset } from './components/passwordReset';
import { renderSetNewPassword } from './components/setNewPassword';
import { renderSettings } from './components/settings';
const routes = {
    home: renderHome,
    login: renderLogin,
    dashboard: renderDashboard,
    signup: renderSignup,
    passwordReset: renderPasswordReset,
    setNewPassword: renderSetNewPassword,
    settings: renderSettings,
};
export function navigate(route) {
    const container = document.getElementById('app');
    if (container && route in routes) {
        console.log(`Navigating to route: ${route}`);
        container.innerHTML = ''; // Clear the container before rendering new content
        routes[route](container);
        // Update URL without page reload
        window.history.pushState(null, '', `#${route}`);
    }
    else {
        console.error('Invalid route or container not found:', route);
    }
}
function handleLogout() {
    // Clear user session data
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // Redirect to home page
    navigate('home');
}
function handleNavigation() {
    const hash = window.location.hash.slice(1) || 'home';
    console.log(`Current hash: ${hash}`);
    if (hash in routes) {
        navigate(hash);
    }
    else {
        navigate('home');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    // Set up navigation event listener
    window.addEventListener('hashchange', handleNavigation);
    // Handle initial route
    handleNavigation();
    // Set up logout functionality
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
    else {
        console.error('Logout button not found');
    }
});
window.addEventListener('error', (event) => {
    console.error('Unhandled error:', event.error);
    alert('An unexpected error occurred. Please try again later.');
});
//# sourceMappingURL=main.js.map