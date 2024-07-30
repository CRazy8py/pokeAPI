var array = []; 

function buscarPokemon() {
    const input = document.getElementById('pokemonInput').value.toLowerCase();
    var url = `https://pokeapi.co/api/v2/pokemon/${input}`; 
    fetch(url)
        .then(res => res.json())
        .then(response => {
            // Llenar la tabla con la información del Pokémon
            const tableBody = document.getElementById('pokemonBody');
            const row = tableBody.insertRow(-1);
            const idCell = row.insertCell(0);
            const nameCell = row.insertCell(1);
            const heightCell = row.insertCell(2);
            const weightCell = row.insertCell(3);
            const imageCell = row.insertCell(4);

            var apiPokemon = {
                "id": response.id,
                "name": response.name,
                "height": response.height,
                "weight": response.weight,
                "image": response.sprites.front_default
            };

            imgHTML.src= response.sprites.front_default;
            array.push(apiPokemon);
            localStorage.setItem("pokemon", JSON.stringify(array));

            idCell.textContent = response.id;
            nameCell.textContent = response.name;
            heightCell.textContent = response.height;
            weightCell.textContent = response.weight;

            // Agregar la imagen del Pokémon
            const image = document.createElement('img');
            image.src = response.sprites.front_default;
            image.alt = response.name;
            image.id = 'pokemon-image';
            imageCell.appendChild(image);
        })
        .catch(error => {
            console.error('Error al buscar el Pokémon:', error);
            alert('No se encontró ningún Pokémon con ese nombre o número.');
        });
}

function borrar() {
    const tableBody = document.getElementById('pokemonBody');
    const inputField = document.getElementById('pokemonInput');
    
    tableBody.innerHTML = ''; 
    inputField.value = '';
    localStorage.clear();
}

window.onload = function() {
    // Recuperar los datos del localStorage
    const storedPokemon = JSON.parse(localStorage.getItem('pokemon'));
    
    // Si hay datos guardados, mostrarlos en la tabla
    if (storedPokemon) {
        const tableBody = document.getElementById('pokemonBody');
        storedPokemon.forEach(pokemon => {
            const row = tableBody.insertRow(-1);
            const idCell = row.insertCell(0);
            const nameCell = row.insertCell(1);
            const heightCell = row.insertCell(2);
            const weightCell = row.insertCell(3);
            const imageCell = row.insertCell(4);

            idCell.textContent = pokemon.id;
            nameCell.textContent = pokemon.name;
            heightCell.textContent = pokemon.height;
            weightCell.textContent = pokemon.weight;

            const image = document.createElement('img');
            image.src = pokemon.image;
            image.alt = pokemon.name;
            image.id = 'pokemon-image';
            imageCell.appendChild(image);
        });
    }
}

