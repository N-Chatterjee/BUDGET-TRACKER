// Placeholder for user data
let userData = {
    username: '',
    password: '',
    total: 0,
    goal: 0,
    transactions: []
};

// Utility function to get user data from local storage
function getUserData() {
    return JSON.parse(localStorage.getItem('userData')) || userData;
}

// Utility function to save user data to local storage
function saveUserData(data) {
    localStorage.setItem('userData', JSON.stringify(data));
}

// Login function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let data = getUserData();
    if (data.username === username && data.password === password) {
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid username or password');
    }
}

// Sign up function
function signup() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        userData = { username, password, total: 0, goal: 0, transactions: [] };
        saveUserData(userData);
        window.location.href = 'dashboard.html';
    } else {
        alert('Please enter username and password');
    }
}

// Show Save Modal
function showSaveModal() {
    document.getElementById('save-modal').style.display = 'block';
}

// Close Save Modal
function closeSaveModal() {
    document.getElementById('save-modal').style.display = 'none';
}

// Save Money
function saveMoney() {
    const amount = parseFloat(document.getElementById('save-amount').value);
    const description = document.getElementById('save-description').value;

    if (isNaN(amount) || amount <= 0 || !description) {
        alert('Invalid input');
        return;
    }

    let data = getUserData();
    data.total += amount;
    data.transactions.push({
        amount,
        description,
        timestamp: new Date().toISOString()
    });
    saveUserData(data);
    alert(`Saved ${amount}`);
    closeSaveModal();
}

// Show Spend Modal
function showSpendModal() {
    document.getElementById('spend-modal').style.display = 'block';
}

// Close Spend Modal
function closeSpendModal() {
    document.getElementById('spend-modal').style.display = 'none';
}

// Spend Money
function spendMoney() {
    const amount = parseFloat(document.getElementById('spend-amount').value);
    const description = document.getElementById('spend-description').value;

    if (isNaN(amount) || amount <= 0 || !description) {
        alert('Invalid input');
        return;
    }

    let data = getUserData();
    if (amount > data.total) {
        alert('Insufficient funds');
        return;
    }

    data.total -= amount;
    data.transactions.push({
        amount: -amount,
        description,
        timestamp: new Date().toISOString()
    });
    saveUserData(data);
    alert(`Spent ${amount}`);
    closeSpendModal();
}

// Set Budget Goal
function setGoal() {
    const goal = parseFloat(prompt('Enter your new budget goal:'));
    if (isNaN(goal) || goal < 0) {
        alert('Invalid input');
        return;
    }

    let data = getUserData();
    data.goal = goal;
    saveUserData(data);
    alert(`Goal set to ${goal}`);
}

// View Transactions
function viewTransactions() {
    let data = getUserData();
    let transactions = data.transactions.map(t => `
        <p>Amount: ${t.amount}, Description: ${t.description}, Date: ${new Date(t.timestamp).toLocaleString()}</p>
    `).join('');
    document.getElementById('transaction-list').innerHTML = transactions;
}

// Delete Account
function deleteAccount() {
    const password = document.getElementById('delete-password').value;

    let data = getUserData();
    if (data.password === password) {
        localStorage.removeItem('userData');
        window.location.href = 'index.html';
    } else {
        alert('Incorrect password');
    }
}

// Logout function
function logout() {
    window.location.href = 'index.html';
}

// Initialize page-specific functions
window.onload = function() {
    if (document.getElementById('transaction-list')) {
        viewTransactions();
    }
};
