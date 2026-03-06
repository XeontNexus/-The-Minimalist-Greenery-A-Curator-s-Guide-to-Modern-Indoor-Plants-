// Authentication System
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Check if user is already logged in
        const savedUser = localStorage.getItem('minimalist-greenery-user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        }
    }

    // Google Sign-In handler
    handleGoogleSignIn(response) {
        try {
            const payload = this.decodeJWT(response.credential);
            const user = {
                id: payload.sub,
                email: payload.email,
                name: payload.name,
                picture: payload.picture,
                role: 'user', // Default role for Google users
                provider: 'google',
                loginTime: new Date().toISOString()
            };

            // Check if user exists in our database
            const existingUser = this.findUserByEmail(user.email);
            if (existingUser) {
                // Update existing user
                Object.assign(existingUser, user);
                this.saveUser(existingUser);
            } else {
                // Create new user
                user.createdAt = new Date().toISOString();
                this.saveUser(user);
            }

            this.currentUser = user;
            this.redirectAfterLogin();
        } catch (error) {
            console.error('Google sign-in error:', error);
            this.showMessage('Login gagal. Silakan coba lagi.', 'error');
        }
    }

    // Admin login handler
    handleAdminLogin(event) {
        event.preventDefault();
        
        const email = document.getElementById('admin-email').value;
        const password = document.getElementById('admin-password').value;

        // Simple admin validation (in production, use proper authentication)
        if (email === 'admin@minimalistgreenery.com' && password === 'admin123') {
            const adminUser = {
                id: 'admin-default',
                email: email,
                name: 'Administrator',
                role: 'admin',
                provider: 'local',
                loginTime: new Date().toISOString()
            };

            this.currentUser = adminUser;
            this.saveUser(adminUser);
            this.redirectAfterLogin();
        } else {
            this.showMessage('Email atau password salah!', 'error');
        }
    }

    // Registration handler
    handleRegister(event) {
        event.preventDefault();
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        // Check if user already exists
        if (this.findUserByEmail(email)) {
            this.showMessage('Email sudah terdaftar!', 'error');
            return;
        }

        const newUser = {
            id: 'user_' + Date.now(),
            email: email,
            name: name,
            role: 'user',
            provider: 'local',
            password: this.hashPassword(password), // In production, use proper hashing
            createdAt: new Date().toISOString()
        };

        this.saveUser(newUser);
        this.currentUser = newUser;
        this.redirectAfterLogin();
    }

    // User management
    findUserByEmail(email) {
        const users = JSON.parse(localStorage.getItem('minimalist-greenery-users') || '[]');
        return users.find(user => user.email === email);
    }

    saveUser(user) {
        let users = JSON.parse(localStorage.getItem('minimalist-greenery-users') || '[]');
        const existingIndex = users.findIndex(u => u.email === user.email);
        
        if (existingIndex !== -1) {
            users[existingIndex] = user;
        } else {
            users.push(user);
        }

        localStorage.setItem('minimalist-greenery-users', JSON.stringify(users));
        localStorage.setItem('minimalist-greenery-user', JSON.stringify(user));
    }

    // Authentication helpers
    isLoggedIn() {
        return this.currentUser !== null;
    }

    isAdmin() {
        return this.currentUser && this.currentUser.role === 'admin';
    }

    getCurrentUser() {
        return this.currentUser;
    }

    logout() {
        localStorage.removeItem('minimalist-greenery-user');
        this.currentUser = null;
        window.location.href = 'index.html';
    }

    // Redirect based on role
    redirectAfterLogin() {
        if (this.isAdmin()) {
            window.location.href = 'admin.html';
        } else {
            // Check if there's a redirect URL from purchase attempt
            const redirectUrl = sessionStorage.getItem('redirect-after-login');
            if (redirectUrl) {
                sessionStorage.removeItem('redirect-after-login');
                window.location.href = redirectUrl;
            } else {
                window.location.href = 'index.html';
            }
        }
    }

    // Utility functions
    decodeJWT(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    hashPassword(password) {
        // Simple hash for demo (in production, use bcrypt or similar)
        return btoa(password);
    }

    showMessage(message, type = 'success') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
            type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`;
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}

// Global functions for HTML event handlers
let authSystem;

function handleGoogleSignIn(response) {
    authSystem.handleGoogleSignIn(response);
}

function handleAdminLogin(event) {
    authSystem.handleAdminLogin(event);
}

function handleRegister(event) {
    authSystem.handleRegister(event);
}

function showRegisterForm() {
    document.getElementById('admin-login').parentElement.classList.add('hidden');
    document.getElementById('register-form').classList.remove('hidden');
}

function showLoginForm() {
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('admin-login').parentElement.classList.remove('hidden');
}

// Initialize auth system
document.addEventListener('DOMContentLoaded', function() {
    authSystem = new AuthSystem();
});

// Export for use in other scripts
window.AuthSystem = AuthSystem;
