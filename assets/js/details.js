const background = document.getElementById('background')
const pokemonHeader = document.getElementById('header')
const pokemonSprite = document.getElementById('sprite')
const pokemonDetails = document.getElementById('details')
const likeButton = document.getElementById('heart')

const urlParams = new URLSearchParams(window.location.search)
const pokemonName = urlParams.get("name")

function loadPokemonInfos(pokemonName = 'bulbasaur') {
  aboutApi.getDetails(pokemonName).then(pokemon => {
    background.classList.add(`${pokemon.types[0]}`)

    const newHeader = `
      <div class="title">
        <h1 class="name">${pokemon.name}</h1>
        <div class="types">
          ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
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
          <li class="specifications abilities">${pokemon.abilities.map(abilitie => ` ${abilitie}`)}</li>
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

var isFilled = true

likeButton.addEventListener('click', () => {
  
    if(isFilled) {
      likeButton.src = './assets/icons/filled-heart.png'
      
    } else {
      likeButton.src = './assets/icons/heart.png'
    }

    isFilled = !isFilled
})

loadPokemonInfos(pokemonName)