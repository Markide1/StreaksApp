const API_URL = 'http://localhost:3000';

export async function login(email: string, password: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to login: ${errorData.error || response.statusText}`);
  }

  const data = await response.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
  } else {
    throw new Error('No token received');
  }
}

export async function getStreaks(): Promise<any> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    console.log('Token being sent:', token);
    const response = await fetch(`${API_URL}/api/streaks`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Get streaks error:', error);
    throw error;
  }
}

export async function signup(email: string, username: string, password: string): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Signup failed');
    }

    return { success: true, message: 'Signup successful' };
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}

export async function createStreak(name: string): Promise<any> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/api/streaks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Create streak error:', error);
    throw error;
  }
}

export async function deleteStreak(streakId: string): Promise<void> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/api/streaks/${streakId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    // No need to parse JSON for a successful deletion
  } catch (error) {
    console.error('Delete streak error:', error);
    throw error;
  }
}

export async function updateStreakCount(streakId: string): Promise<any> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/api/streaks/${streakId}/increase`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Update streak count error:', error);
    throw error;
  }
}

export async function resetStreak(streakId: string): Promise<any> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/api/streaks/${streakId}/reset`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Reset streak error:', error);
    throw error;
  }
}

export async function requestPasswordReset(email: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to request password reset: ${response.statusText}`);
  }
}

export async function resetPassword(resetCode: string, newPassword: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/auth/reset-password/${resetCode}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password: newPassword }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to reset password: ${response.statusText}`);
  }
}

export function logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
}

export async function updateUserProfile(username: string | null, email: string | null, password: string | null): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    const updateData: { username?: string; email?: string; password?: string } = {};

    if (username !== null) {
        updateData.username = username;
    }
    if (email !== null) {
        updateData.email = email;
    }
    if (password !== null) {
        updateData.password = password;
    }

    const response = await fetch(`${API_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (errorData.code === 'USERNAME_EXISTS') {
            throw new Error('Username already exists');
        } else if (errorData.code === 'EMAIL_EXISTS') {
            throw new Error('Email already exists');
        } else {
            throw new Error(errorData.message || `Failed to update profile: ${response.statusText}`);
        }
    }
}

export async function uploadProfilePhoto(photo: File): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    const formData = new FormData();
    formData.append('photo', photo);

    const response = await fetch(`${API_URL}/api/users/profile/photo`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to upload profile photo: ${response.statusText}`);
    }
}