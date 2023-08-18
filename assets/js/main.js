const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

// Não concluído

pokemonList.addEventListener('click', (event) => {
    const clickedPokemonElement = event.target.closest('.pokemon');
    if (clickedPokemonElement) {
        const pokemonId = clickedPokemonElement.getAttribute('data-id');
        const selectedPokemon = pokemons.find(pokemon => pokemon.number === parseInt(pokemonId));

        pokeApi.getPokemonDetail(selectedPokemon).then((pokemon) => {
            const modal = document.getElementById('pokemonModal');
            const modalContent = modal.querySelector('.modal-content');
            modalContent.innerHTML = modal.qauerySelector('.modal-content').innerHTML = convertPokemonToLi(pokemon);
        modal.style.display = 'block';
        });
    }
});


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})