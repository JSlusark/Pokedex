let pokemonRepository = (function () {
  let pokemonList = [
    { name: `Bulbasaur`, type: [`grass`, `poison`], height: 0.7 },
    { name: `Charizard`, type: [`fire`, `flying`], height: 5.7 },
    { name: `Squirtle`, type: [`water`], height: 0.5 },
  ];

  //
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonNames = document.querySelector(".right-container-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.classList.add("listed-pokemon");
    listItem.appendChild(button);
    pokemonNames.appendChild(listItem);
    button.innerText = pokemon.name;
    button.addEventListener("click", showDetails);
  }

  function showDetails(pokemon) {
    console.log(pokemon.target.innerText);
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    getAll,
    add,
    addListItem,
  };
})();

pokemonRepository.add({
  name: `Jigglypuff`,
  type: [`normal`, `fairy`],
  height: 1.8,
});

pokemonRepository.getAll().forEach(pokemonRepository.addListItem);
