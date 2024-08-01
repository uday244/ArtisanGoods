document.addEventListener('DOMContentLoaded', () => {
    const currentPage = document.body.dataset.page;

    if (currentPage === 'login') {
        handleLogin();
    } else if (currentPage === 'register') {
        handleRegistration();
    } else if (currentPage === 'items') {
        handleItemsPage();
    }
});

function handleLogin() {
    const loginForm = document.getElementById('loginForm');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        window.location.href = 'items.html';
        return;
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', username);
            window.location.href = 'items.html';
        } else {
            alert('Invalid username or password');
        }
    });
}

function handleRegistration() {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const gender = document.getElementById('gender').value;
        const phone = document.getElementById('phone').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.username === username && user.password === password);

        if (existingUser) {
            alert('User already exists with the same username and password');
            return;
        }

        const newUser = { firstName, lastName, email, gender, phone, username, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful');
        window.location.href = 'login.html';
    });
}

function handleItemsPage() {
    const cartCount = document.getElementById('cartCount');

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
        cartCount.textContent = count;
    }

    window.addToCart = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        cart[id] = (cart[id] || 0) + 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    };

    window.removeFromCart = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        if (cart[id]) {
            delete cart[id];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        }
    };

    document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });

    updateCartCount();
}
