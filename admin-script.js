document.addEventListener('DOMContentLoaded', function() {
    const selectClientForm = document.getElementById('select-client-form');
    const clientSelect = document.getElementById('client-select');
    const clientActionsSection = document.getElementById('client-actions');

    function loadClients() {
        const clients = JSON.parse(localStorage.getItem('clients')) || [];
        clientSelect.innerHTML = '';
        clients.forEach(client => {
            const option = document.createElement('option');
            option.value = client.login;
            option.textContent = client.login;
            clientSelect.appendChild(option);
        });
    }

    function loadClientData(login) {
        const clients = JSON.parse(localStorage.getItem('clients')) || [];
        return clients.find(client => client.login === login);
    }

    function saveClients(clients) {
        localStorage.setItem('clients', JSON.stringify(clients));
    }

    selectClientForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedClientLogin = clientSelect.value;
        if (selectedClientLogin) {
            clientActionsSection.style.display = 'block';
            loadClientOptions(selectedClientLogin);
        }
    });

    function loadClientOptions(login) {
        const client = loadClientData(login);
        if (client) {
            // Load services
            const removeServiceSelect = document.getElementById('remove-service-name');
            removeServiceSelect.innerHTML = '';
            client.services.forEach(service => {
                const option = document.createElement('option');
                option.value = service;
                option.textContent = service;
                removeServiceSelect.appendChild(option);
            });

            // Load printers
            const removePrinterSelect = document.getElementById('remove-printer');
            removePrinterSelect.innerHTML = '';
            client.printers.forEach(printer => {
                const option = document.createElement('option');
                option.value = printer;
                option.textContent = printer;
                removePrinterSelect.appendChild(option);
            });
        }
    }

    document.getElementById('add-service-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedClientLogin = clientSelect.value;
        const serviceName = document.getElementById('service-name').value;
        if (selectedClientLogin && serviceName) {
            const clients = JSON.parse(localStorage.getItem('clients')) || [];
            const client = clients.find(client => client.login === selectedClientLogin);
            if (client && !client.services.includes(serviceName)) {
                client.services.push(serviceName);
                saveClients(clients);
                loadClientOptions(selectedClientLogin);
            }
        }
    });

    document.getElementById('remove-service-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedClientLogin = clientSelect.value;
        const serviceName = document.getElementById('remove-service-name').value;
        if (selectedClientLogin && serviceName) {
            const clients = JSON.parse(localStorage.getItem('clients')) || [];
            const client = clients.find(client => client.login === selectedClientLogin);
            if (client) {
                client.services = client.services.filter(service => service !== serviceName);
                saveClients(clients);
                loadClientOptions(selectedClientLogin);
            }
        }
    });

    document.getElementById('add-printer-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedClientLogin = clientSelect.value;
        const printerType = document.getElementById('printer-type').value;
        if (selectedClientLogin && printerType) {
            const clients = JSON.parse(localStorage.getItem('clients')) || [];
            const client = clients.find(client => client.login === selectedClientLogin);
            if (client && !client.printers.includes(printerType)) {
                client.printers.push(printerType);
                saveClients(clients);
                loadClientOptions(selectedClientLogin);
            }
        }
    });

    document.getElementById('remove-printer-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedClientLogin = clientSelect.value;
        const printerType = document.getElementById('remove-printer').value;
        if (selectedClientLogin && printerType) {
            const clients = JSON.parse(localStorage.getItem('clients')) || [];
            const client = clients.find(client => client.login === selectedClientLogin);
            if (client) {
                client.printers = client.printers.filter(printer => printer !== printerType);
                saveClients(clients);
                loadClientOptions(selectedClientLogin);
            }
        }
    });

    document.getElementById('withdraw-money-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedClientLogin = clientSelect.value;
        const withdrawAmount = parseFloat(document.getElementById('withdraw-amount').value);
        if (selectedClientLogin && withdrawAmount) {
            const clients = JSON.parse(localStorage.getItem('clients')) || [];
            const client = clients.find(client => client.login === selectedClientLogin);
            if (client) {
                client.money = (client.money || 0) - withdrawAmount;
                saveClients(clients);
                document.getElementById('withdraw-amount').value = '';
            }
        }
    });

    // Initial load
    loadClients();
});
