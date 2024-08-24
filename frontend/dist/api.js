var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = 'http://localhost:3000';
export function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const data = yield response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            return data;
        }
        catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    });
}
export function signup(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = yield response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }
            return { success: true, message: 'Signup successful' };
        }
        catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    });
}
export function getStreaks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            console.log('Token being sent:', token);
            console.log('Fetching streaks data...');
            const response = yield fetch(`${API_URL}/api/streaks`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            const data = yield response.json();
            console.log('Streaks data received:', data);
            return data;
        }
        catch (error) {
            console.error('Get streaks error:', error);
            throw error;
        }
    });
}
export function createStreak(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            const response = yield fetch(`${API_URL}/api/streaks`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name }),
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            return response.json();
        }
        catch (error) {
            console.error('Create streak error:', error);
            throw error;
        }
    });
}
export function deleteStreak(streakId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            const response = yield fetch(`${API_URL}/api/streaks/${streakId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            return response.json();
        }
        catch (error) {
            console.error('Delete streak error:', error);
            throw error;
        }
    });
}
export function updateStreakCount(streakId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            if (!token || !userId) {
                throw new Error('No token or userId found');
            }
            const response = yield fetch(`${API_URL}/api/streaks/${userId}/streaks/${streakId}/increase`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            return response.json();
        }
        catch (error) {
            console.error('Update streak count error:', error);
            throw error;
        }
    });
}
export function resetStreak(streakId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            const response = yield fetch(`${API_URL}/api/streaks/${streakId}/reset`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                const errorText = yield response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            return response.json();
        }
        catch (error) {
            console.error('Reset streak error:', error);
            throw error;
        }
    });
}
export function requestPasswordReset(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${API_URL}/api/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        if (!response.ok) {
            const errorData = yield response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to request password reset: ${response.statusText}`);
        }
    });
}
export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
}
//# sourceMappingURL=api.js.map