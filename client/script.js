document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const userLoginElement = document.getElementById('user-login');
    const userServicesElement = document.getElementById('user-services');
    const userPrintersElement = document.getElementById('user-printers');
    const userMoneyElement = document.getElementById('user-money');

    // Функция для загрузки данных пользователя
    function loadUserData() {
        const login = localStorage.getItem('login');
        const clients = JSON.parse(localStorage.getItem('clients')) || [];
        const client = clients.find(client => client.login === login);
        
        if (userLoginElement) {
            userLoginElement.textContent = login;
        }

        if (userServicesElement) {
            userServicesElement.innerHTML = client.services.map(service => `<li>${service}</li>`).join('');
        }

        if (userPrintersElement) {
            userPrintersElement.innerHTML = client.printers.map(printer => `<li>${printer}</li>`).join('');
        }

        if (userMoneyElement) {
            userMoneyElement.textContent = `${client.money || 0} руб.`;
        }
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const login = document.getElementById('register-login').value;
            const password = document.getElementById('register-password').value;
            
            // Загрузка существующих клиентов
            const clients = JSON.parse(localStorage.getItem('clients')) || [];
            
            // Проверка на уникальность логина
            if (clients.find(client => client.login === login)) {
                document.getElementById('register-error-message').textContent = 'Логин уже занят.';
                return;
            }

            // Создание нового клиента
            const newClient = {
                login: login,
                password: password,
                services: [],
                printers: [],
                money: 0
            };
            
            // Добавление нового клиента в localStorage
            clients.push(newClient);
            localStorage.setItem('clients', JSON.stringify(clients));
            
            window.location.href = 'dashboard.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const login = document.getElementById('login-login').value;
            const password = document.getElementById('login-password').value;
            const clients = JSON.parse(localStorage.getItem('clients')) || [];
            const client = clients.find(client => client.login === login && client.password === password);

            if (client) {
                localStorage.setItem('login', login);
                window.location.href = 'dashboard.html';
            } else {
                document.getElementById('login-error-message').textContent = 'Логин или пароль не совпадают';
            }
        });
    }

    if (document.body.classList.contains('dashboard')) {
        loadUserData();
    }
});
