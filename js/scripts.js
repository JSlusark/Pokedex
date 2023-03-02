let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        console.log(json.results[0]);
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.sprite = details.sprites.front_default;
        item.height = details.height;
        item.type1 = details.types[0].type.name;
        // item.type2 = details.types[1].type.name;
        //  👆 some pkmn have 1 to 3 types, find a way to add those without errors (if/else?)
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

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
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
      console.log(item.name);
      console.log(item.sprite);
      console.log(item.type1);
      console.log(item.height);
      //Adds pokemon name to DOM element
      let pokemonDescriptionName = document.querySelector(
        ".pokemonDescriptionName"
      );
      pokemonDescriptionName.innerText = item.name;
      //Adds pokemon sprite to DOM element
      let pokemonSprite = document.querySelector(".pokemon-portrait");
      pokemonSprite.src = item.sprite;
      //Adds pokemon type to DOM element
      let pokemonType1 = document.querySelector(".pokemon-type1");
      pokemonType1.innerText = `Type:${item.type1}`;
      //Adds pokemon height to DOM element
      let pokemonHeight = document.querySelector(".pokemon-height");
      console.log(pokemonHeight.innerText);
      pokemonHeight.innerText = `Height:${item.height / 10}m`;
    });
  }

  return {
    getAll,
    add,
    addListItem,
    loadList,
    loadDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
