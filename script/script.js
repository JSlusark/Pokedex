let pokemonRepository = (function () {
  let pokemonList = [
    { name: `Bulbasaur`, type: [`grass`, `poison`], height: 0.7 },
    { name: `Charizard`, type: [`fire`, `flying`], height: 5.7 },
    { name: `Squirtle`, type: [`water`], height: 0.5 },
  ];

  return {
    getAll: function () {
      return pokemonList;
    },
    add: function (pokemonData) {
      pokemonList.push(pokemonData);
    },
  };
})();

pokemonRepository.add({
  name: `Jigglypuff`,
  type: [`normal`, `fairy`],
  height: 1.8,
});

function writePokemon(pokemon) {
  if (pokemon.height > 5) {
    document.write(`<li> ${pokemon.name} ${pokemon.height} `);
    document.write(`<span class="exclamation">- Wow! That's big!</span></li>`);
  } else {
    //else
    document.write(`<li> ${pokemon.name} ${pokemon.height}`);
  }
}
pokemonRepository.getAll().forEach(writePokemon);
