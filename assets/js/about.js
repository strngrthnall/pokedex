const aboutApi = {}

function convertToData(pokemonJson, speciesJson, genderJson) {
  const pokemon = new Pokemon()
  pokemon.id = pokemonJson.id

  if(pokemonJson.name === 'nidoran-m') {
    pokemon.name = 'nidoran ♂'
  } else if(pokemonJson.name === 'nidoran-f') {
    pokemon.name = 'nidoran ♀'
  } else if(pokemonJson.name === 'farfetchd') {
    pokemon.name = `farfetch'd`
  } else if(pokemonJson.name === 'deoxys-normal') {
    pokemon.name = `deoxys`
  } else if(pokemonJson.name === 'giratina-altered') {
    pokemon.name = `giratina`
  } else if(pokemonJson.name === 'shaymin-land') {
    pokemon.name = `shaymin`
  } else if(pokemonJson.name === 'wormadam-plant') {
    pokemon.name = `wormadam`
  } else {
    pokemon.name = pokemonJson.name
  }

  const pokemonWeight = pokemonJson.weight / 10
  const pokemonHeight = pokemonJson.height * 10

  pokemon.height = `${pokemonHeight.toFixed(1)} cm`
  pokemon.weight = `${pokemonWeight.toFixed(1)} kg`

  const types = pokemonJson.types.map(typeSlot => typeSlot.type.name)
  const [type1] = types

  pokemon.types = types
  pokemon.type = type1
  pokemon.photo = pokemonJson.sprites.other['official-artwork'].front_default

  const abilities = pokemonJson.abilities.map(abilitiesSlot => abilitiesSlot.ability.name)
  pokemon.abilities = abilities

  const genera = speciesJson.genera[7].genus
  pokemon.species = genera.slice(0, -8)

  const speciesGender = speciesJson.gender_rate
  const femRatio = (speciesGender / 8) * 100
  const mascRatio = (femRatio - 100)*-1
      
  pokemon.femGenderRatio = femRatio
  pokemon.masGenderRatio = mascRatio

  pokemon.eggGroup = speciesJson.egg_groups[0].name
  
  return pokemon
}

aboutApi.getDetails = async (pokemonName = 'bulbasaur') => {
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
  const genderUrl = 'https://pokeapi.co/api/v2/gender/1'

  const pokemonResponse = await fetch(pokemonUrl)
  const pokemonJson = await pokemonResponse.json()

  const speciesResponse = await fetch(speciesUrl)
  const speciesJson = await speciesResponse.json()

  const genderResponse = await fetch(genderUrl)
  const genderJson = await genderResponse.json()
  

  return convertToData(pokemonJson, speciesJson, genderJson)
}

