import { msalInstance } from './azure_tesis.js';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const loginResponse = await msalInstance.loginPopup({
            scopes: ['user.read']
        });

        const account = loginResponse.account;
        alert(`Login successful: ${account.username}`);

        window.location.href = 'datos_mac.html';  
    } catch (error) {
        console.error('Login failed:', error);
        alert('Error logging in.');
    }
});




