function searchBudgets() {
    const brandInput = document.getElementById('brand').value.toLowerCase();
    const modelInput = document.getElementById('model').value.toLowerCase();
    const budgetInput = parseFloat(document.getElementById('budget').value);

    fetch('./js/datos.json')
        .then(response => response.json())
        .then(data => {
            const results = data.filter(car => {
                const brandMatch = car.brand.toLowerCase().includes(brandInput);
                const modelMatch = car.model.toLowerCase().includes(modelInput);
                const budgetMatch = isNaN(budgetInput) || car.budget <= budgetInput;

                return brandMatch && modelMatch && budgetMatch;
            });

            if (results.length === 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'No se encontraron resultados',
                    text: 'Intenta con diferentes criterios de búsqueda.'
                });
            } else {
                displayResults(results);
            }
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al cargar los datos. Por favor, intenta de nuevo.'
            });
        });
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    results.forEach(car => {
        const carElement = document.createElement('div');
        carElement.classList.add('result-item');
        carElement.innerHTML = `<p>Marca: ${car.brand}</p><p>Modelo: ${car.model}</p><p>Presupuesto: $${car.budget}</p>`;
        resultsContainer.appendChild(carElement);
    });

    Swal.fire({
        icon: 'success',
        title: 'Resultados cargados',
        text: 'Se han encontrado resultados según los criterios de búsqueda.'
    });
}
