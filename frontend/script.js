// Função para carregar a lista de pacotes na página inicial
document.addEventListener('DOMContentLoaded', async () => {
    async function checkAuth() {
        try {
            const response = await fetch('/api/packages', { credentials: 'include' });
            if (!response.ok) {
                window.location.href = '/login';  // Redireciona se não autenticado
                return false;
            }
            return true;
        } catch (error) {
            window.location.href = '/login';
            return false;
        }
    }

    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) return;

    async function loadPackages() {
        try {
            const response = await fetch('/api/packages', { credentials: 'include' });
            if (!response.ok) {
                throw new Error('Erro ao buscar pacotes');
            }

            const packages = await response.json();
            document.getElementById('packages').innerHTML = packages.map(p =>
                `<li><a href='/package.html?id=${p.id}'>${p.name}</a> - R$ ${p.price},00</li>`
            ).join('');
        } catch (error) {
            console.error('Erro ao carregar pacotes:', error);
        }
    }
    
    loadPackages();
});

// Função para carregar os detalhes do pacote
async function loadPackageDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const packageId = urlParams.get('id');

    try {
        const response = await fetch('/api/packages');
        if (!response.ok) {
            throw new Error('Erro ao buscar pacotes');
        }

        const packages = await response.json();
        const travelPackage = packages.find(p => p.id == packageId);

        if (!travelPackage) {
            document.body.innerHTML = '<h1>Pacote não encontrado</h1>';
            return;
        }

        // Preenchendo os detalhes na página
        document.getElementById('package-name').innerText = travelPackage.name;
        document.getElementById('package-description').innerText = travelPackage.description;
        document.getElementById('package-destination').innerText = travelPackage.destination;
        document.getElementById('package-date').innerText = travelPackage.date;
        document.getElementById('package-price').innerText = travelPackage.price;
    } catch (error) {
        console.error('Erro ao carregar detalhes do pacote:', error);
    }
}

// Verifica se estamos na página de detalhes e carrega as informações
if (document.getElementById('package-name')) {
    document.addEventListener('DOMContentLoaded', loadPackageDetails);
}

// Função para simular a compra de um pacote
async function buyPackage() {
    alert('Compra realizada com sucesso!');
}

// Função de logout
function logout() {
    window.location.href = '/logout';
}
