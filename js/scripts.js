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
    //This is the UL
    let pokemonContainer = document.querySelector(
      ".right-container-child1-list"
    );
    //creates li elements inside the UL so that style can work as organised
    let button = document.createElement("li");
    button.classList.add("listed-pokemon");
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#exampleModal");
    let buttonPart1 = document.createElement("span");
    buttonPart1.classList.add("arrow-blank");
    let buttonPart2 = document.createElement("span");
    buttonPart2.classList.add("pokemon-name");
    button.appendChild(buttonPart1);
    button.appendChild(buttonPart2);
    pokemonContainer.appendChild(button);
    buttonPart1.innerHTML = `► `;
    buttonPart2.innerText = pokemon.name;

    //When pokemon li element is clicked, details are shown as a modal
    button.addEventListener("click", function (event) {
      console.log(button);

      // let highlightedPokemon = document.querySelector(
      //   ".listed-pokemon-selected"
      // );
      // console.log(highlightedPokemon);
      button.classList.add("listed-pokemon-selected");
      showDetails(pokemon); // show details of pkmn
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function (title, text) {
      let modalDescription = document.querySelector(".modal-body");
      let modalTitle = document.querySelector("#exampleModalLabel");
      modalTitle.innerHTML = item.name;
      let pokemonSprite = document.querySelector(".pokemon-pic");
      pokemonSprite.src = item.sprite;
      let pokemonType1 = document.querySelector(".type1");
      pokemonType1.innerText = `Type: ${item.type1}`;
      let pokemonHeight = document.querySelector(".height");
      pokemonHeight.innerText = `Height: ${item.height / 10}m`;

      //IF YOU CLICK BACKDROP HIGHLIGHT GOES AWAY
      let backdrop = document.querySelector(".modal-backdrop");
      // backdrop.remove();

      backdrop.addEventListener("click", () => {
        let button = document.querySelector(".listed-pokemon-selected");
        button.classList.remove("listed-pokemon-selected");
        let modalEl = document.getElementById("exampleModal");
        let modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
      });
    });
  }

  window.addEventListener("keydown", (e) => {
    let modalContent = document.querySelector(".modal-content");

    if (e.key === "Escape") {
      let button = document.querySelector(".listed-pokemon-selected");
      button.classList.remove("listed-pokemon-selected");
      console.log(button);
      console.log(modalContent);
    }
  });

  let button = document.querySelector(".btn-close"); // assuming there is a <button> element on the page

  button.addEventListener("click", function () {
    let button = document.querySelector(".listed-pokemon-selected");
    button.classList.remove("listed-pokemon-selected");
  });

  return {
    getAll,
    add,
    addListItem,
    loadList,
    loadDetails,
  };
})();

//loads list to the pokedex list
pokemonRepository.loadList().then(function () {
  // Now the data is loaded
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
