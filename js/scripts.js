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

    //When pokemon button is clicked, details are shown as a modal
    button.addEventListener("click", function (event) {
      showDetails(pokemon); // show details should be show modal IDIOTS!!!
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function (title, text) {
      //added modal creation here inside here
      let modalContainer = document.querySelector("#modal-container");

      // Clear all existing modal content,create new element and add new class
      modalContainer.innerHTML = "";
      let modal = document.createElement("div");
      modal.classList.add("modal");

      // Add the new modal content
      //button
      let closeDiv = document.createElement("div");
      let closeButtonElement = document.createElement("button");
      closeButtonElement.classList.add("modal-close");
      closeButtonElement.innerText = "X";
      closeButtonElement.addEventListener("click", hideModal);

      //Creates content
      console.log(item);
      console.log(item.name);
      console.log(item.sprite);
      console.log(item.type1);
      console.log(item.height);
      // Shows name of pokemon
      let pokemonTitle = document.createElement("h1");
      pokemonTitle.innerText = item.name;
      //Adds pokemon sprite to DOM element
      let pokemonSprite = document.createElement("img");
      pokemonSprite.src = item.sprite;
      //Adds pokemon type to DOM element
      let pokemonType1 = document.createElement("p");
      pokemonType1.innerText = `Type: ${item.type1}`;
      //Adds pokemon height to DOM element
      let pokemonHeight = document.createElement("p");
      console.log(pokemonHeight.innerText);
      pokemonHeight.innerText = `Height: ${item.height / 10}m`;

      // adds text to the modelContainer element
      modalContainer.appendChild(modal);
      modal.appendChild(closeDiv);
      closeDiv.appendChild(closeButtonElement);
      modal.appendChild(pokemonTitle);
      modal.appendChild(pokemonSprite);
      modal.appendChild(pokemonType1);
      modal.appendChild(pokemonHeight);
      modalContainer.classList.add("is-visible");

      //calls hide modal
      modalContainer.addEventListener("click", (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
    });
  }

  //function
  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
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
