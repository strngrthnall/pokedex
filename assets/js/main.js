const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 5
let offset = 0

function convertPokemonTypesToLi(pokemonTypes) {
  return pokemonTypes.map(typeSlot => `<li class="type">${typeSlot.type.name}</li>`)
}

function loadPokemonItems(offset, limit) {
  

  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(pokemon => {
      var pokemonName
      if(pokemon.name === 'nidoran-m') {
        pokemonName = 'nidoran ♂'
      } else if(pokemon.name === 'nidoran-f') {
        pokemonName = 'nidoran ♀'
      } else if(pokemon.name === 'farfetchd') {
        pokemonName = `farfetch'd`
      }else {
        pokemonName = pokemon.name
      }
      
      return `
        <li class="pokemon ${pokemon.type}">
          <span class="number">#${("000" + pokemon.id).slice(-3)}</span>
          <span class="name">${pokemonName}</span>
          <div class="detail">
            <ol class="types">
              ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src=${pokemon.photo} alt=${pokemonName}>
          </div>
        </li>
      `
    }).join('')
  })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit
  loadPokemonItems(offset, limit)
})