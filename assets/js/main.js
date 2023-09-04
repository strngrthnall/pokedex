const scrollTopButton = document.getElementById('returnToTopButton');
const pokemonList = document.getElementById('pokemonList')
// const loadMoreButton = document.getElementById('loadMoreButton')
const generationSelector = document.getElementById('generation')
let limit = 151
let offset = 0

// function convertPokemonTypesToLi(pokemonTypes) {
//   return pokemonTypes.map(typeSlot => `<li class="type">${typeSlot.type.name}</li>`)
// }

function loadPokemonItems(offset, limit) {

  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.classList.remove("loading")
    pokemonList.classList.add("pokemons")
    pokemonList.innerHTML = ''
    pokemonList.innerHTML += pokemons.map(pokemon => {
      var pokemonName

      if(pokemon.name === 'nidoran-m') {
        pokemonName = 'nidoran ♂'
      } else if(pokemon.name === 'nidoran-f') {
        pokemonName = 'nidoran ♀'
      } else if(pokemon.name === 'farfetchd') {
        pokemonName = `farfetch'd`
      } else if(pokemon.name === 'deoxys-normal') {
        pokemonName = `deoxys`
      } else if(pokemon.name === 'giratina-altered') {
        pokemonName = `giratina`
      } else if(pokemon.name === 'shaymin-land') {
        pokemonName = `shaymin`
      } else if(pokemon.name === 'wormadam-plant') {
        pokemonName = `wormadam`
      } else {
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

pokemonList.classList.remove("pokemons")
pokemonList.classList.add("loading")

pokemonList.innerHTML = '<img class="loading__img" src="https://icon-library.com/images/pokeball-icon-png/pokeball-icon-png-19.jpg" alt="">'
loadPokemonItems(offset, limit)

// loadMoreButton.addEventListener('click', () => {
//   offset += limit
//   loadPokemonItems(offset, limit)
// })

generationSelector.addEventListener('change', () => {
  pokemonList.classList.remove("pokemons")
  pokemonList.classList.add("loading")
  pokemonList.innerHTML = '<img class="loading__img" src="https://icon-library.com/images/pokeball-icon-png/pokeball-icon-png-19.jpg" alt="">'
  
  const generationSelected = parseInt(generationSelector.value)

  console.log(generationSelected)

  loadPokemonItems(offset, generationSelected)

})


scrollTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
});