function convertPokemonTypesToLi(pokemonTypes) {
  return pokemonTypes.map(typeSlot => `<li class="type">${typeSlot.type.name}</li>`)
}

function convertPokemonToLi(pokemon) {
  var pokemonName
  if(pokemon.name === 'nidoran-m') {
    pokemonName = 'nidoran ♂'
  } else if(pokemon.name === 'nidoran-f') {
    pokemonName = 'nidoran ♀'
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
}

const pokemonList = document.getElementById('pokemonList')


pokeApi.getPokemons().then((pokemons = []) => {
  pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
})
