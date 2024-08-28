const API_URL = 'http://localhost:3000';

import { validateEmail, validatePassword, validateUsername } from './validators/userProfileValidator';

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
    localStorage.setItem('username', data.username); // Store the username
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
  if (!validateEmail(email)) {
    throw new Error('Invalid email format');
  }
  if (!validatePassword(password)) {
    throw new Error('Password must be at least 6 characters long');
  }
  if (!validateUsername(username)) {
    throw new Error('Username must be 3-30 characters long and contain only letters, numbers, and underscores');
  }

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

export async function logout(): Promise<void> {
  // Perform any necessary logout operations on the server
  // ...

  // Clear local storage
  localStorage.removeItem('token');
  localStorage.removeItem('username');
}

export async function updateUserProfile(username: string | null, email: string | null, password: string | null): Promise<boolean | 'verification_required'> {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    const updateData: { username?: string; email?: string; password?: string } = {};

    if (username !== null && username !== '') {
        updateData.username = username;
    }
    if (email !== null && email !== '') {
        updateData.email = email;
    }
    if (password !== null && password !== '') {
        updateData.password = password;
    }

    if (Object.keys(updateData).length === 0) {
        // No fields to update
        return false;
    }

    const response = await fetch(`${API_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
    });

    if (response.status === 200) {
        const text = await response.text();
        if (text === 'OK') {
            return true;
        }
        try {
            const responseData = JSON.parse(text);
            if (responseData.message === 'Verification code sent to new email') {
                return 'verification_required';
            }
        } catch (error) {
            console.error('Error parsing response:', error);
        }
    }

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

    return true;
}

export async function verifyEmail(verificationCode: string): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/api/users/verify-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ verificationCode }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to verify email: ${response.statusText}`);
    }
}

export async function uploadProfilePhoto(photo: File): Promise<void> {
    console.log('Uploading profile photo:', photo.name);
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found');
        throw new Error('No token found');
    }

    const formData = new FormData();
    formData.append('photo', photo);

    console.log('Sending photo upload request');
    const response = await fetch(`${API_URL}/api/users/profile/photo`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    });

    console.log('Photo upload response status:', response.status);
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Photo upload error:', errorData);
        throw new Error(errorData.message || `Failed to upload profile photo: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log('Profile photo uploaded successfully', responseData);
    
    // Store the new avatar URL in localStorage
    if (responseData.photoUrl) {
        localStorage.setItem('avatarUrl', responseData.photoUrl);
    }
}

export async function getStreakStats(): Promise<{ longestStreak: number, currentStreak: number }> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/api/streaks/stats`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Get streak stats error:', error);
    throw error;
  }
}