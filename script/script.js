let pokemonList = [
  { name: `Bulbasaur`, type: [`grass`, `poison`], height: 0.7 },
  { name: `Charizard`, type: [`fire`, `flying`], height: 1.7 },
  { name: `Squirtle`, type: [`water`], height: 0.5 },
];

function writePokemon(pokemon) {
  if (pokemon.height > 1) {
    document.write(`<li> ${pokemon.name} ${pokemon.height} `);
    document.write(`<span class="exclamation">- Wow! That's big!</span></li>`);
  } else {
    document.write(`<li> ${pokemon.name} ${pokemon.height}`);
  }
}
pokemonList.forEach(writePokemon);
