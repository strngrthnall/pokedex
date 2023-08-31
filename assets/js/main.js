// Capitalizer
Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

function convertPokemonToLi(pokemon, loopIndex) {
  return `
    <li class="pokemon">
      <span class="number">#001</span>
      <span class="name">${pokemon.name.capitalize()}</span>

      <div class="detail">
        <ol class="types">
          <li class="type">Grass</li>
          <li class="type">Poison</li>
        </ol>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${loopIndex+1}.png" alt=${pokemon.name.capitalize()}>
      </div>
    </li>
  `
}

const pokemonList = document.getElementById('pokemonList')


pokeApi.getPokemons()
  .then(pokemons => {
    for (let index = 0; index < pokemons.length; index++) {
      const pokemon = pokemons[index];
      pokemonList.innerHTML += convertPokemonToLi(pokemon, index) 
    }
  })
