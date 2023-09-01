const pokeApi = {}

function convertPokemonApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  pokemon.id = pokeDetail.id
  pokemon.name = pokeDetail.name

  const types = pokeDetail.types.map(typeSlot => typeSlot.type.name)
  const [type1] = types

  pokemon.types = types
  pokemon.type = type1
  pokemon.photo = pokeDetail.sprites.other['official-artwork'].front_default

  return pokemon

}

pokeApi.getPokemonsDetail = async (pokemon) => {
  const response = await fetch(pokemon.url)
  const pokeDetail = await response.json()
  return convertPokemonApiDetailToPokemon(pokeDetail)
}

pokeApi.getPokemons = async (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`

  const response = await fetch(url)
  const jsonBody = await response.json()
  const pokemons = jsonBody.results
  const detailRequests = pokemons.map(pokeApi.getPokemonsDetail)
  const pokemonsDetails = await Promise.all(detailRequests)
  return pokemonsDetails
}

