const background = document.getElementById('background')
const pokemonHeader = document.getElementById('header')
const pokemonSprite = document.getElementById('sprite')
const pokemonDetails = document.getElementById('details')

const urlParams = new URLSearchParams(window.location.search)
const pokemonName = urlParams.get("name")

function loadPokemonInfos(pokemonName = 'bulbasaur') {
  aboutApi.getDetails(pokemonName).then(pokemon => {
    background.classList.add(`${pokemon.types[0]}`)

    const newHeader = `
      <div class="title">
        <h1 class="name">${pokemon.name}</h1>
        <div class="types">
          <li class="type ${pokemon.types[0]}">${pokemon.types[0]}</li>
          <li class="type ${pokemon.types[1]}">${pokemon.types[1]}</li>
        </div>
      </div>
      <span class="number">#${("000" + pokemon.id).slice(-3)}</span>`
    pokemonHeader.innerHTML = newHeader

    const newSprite = `
      <img class="pokemon-img" src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png' alt=''>
      `
    pokemonSprite.innerHTML = newSprite

    const newDetails = `
      <ol class="details">
        <div class="detail">
          <li class="title">Specie</li>
          <li class="specifications">${pokemon.species}</li>
        </div>
        <div class="detail">
          <li class="title">Height</li>
          <li class="specifications">${pokemon.height}</li>
        </div>
        <div class="detail">
          <li class="title">Weight</li>
          <li class="specifications">${pokemon.weight}</li>
        </div>
        <div class="detail">
          <li class="title">Abilities</li>
          <li class="specifications abilities">${pokemon.abilities[0]}, ${pokemon.abilities[1]}</li>
        </div>
      </ol>
      <h3 class="about-breeding">Breeding</h3>
      <ol class="breeding-details details">
        <div class="detail">
          <li class="title">Gender</li>
          <div class="detail">
            <li class="specifications">
              <span class="masc">♂</span> ${pokemon.masGenderRatio}%
            </li>
            <li class="specifications">
              <span class="fem">♀</span> ${pokemon.femGenderRatio}%
            </li>
          </div>
        </div>
        <div class="detail">
          <li class="title">Egg Groups</li>
          <li class="specification egg">${pokemon.eggGroup}</li>
        </div>
      </ol>
      `
      pokemonDetails.innerHTML = newDetails
  })

}

loadPokemonInfos(pokemonName)