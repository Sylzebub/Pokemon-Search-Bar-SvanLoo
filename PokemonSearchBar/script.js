const userCardTemplate = document.querySelector("[data-pokemon-template]");
const userCardContainer = document.querySelector(
  "[data-pokemon-cards-container]"
);
const searchInput = document.querySelector("[data-search]");

let users = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  users.forEach((user) => {
    const isVisible =
      user.name.toLowerCase().includes(value) ||
      user.num.toLowerCase().includes(value);
    user.element.classList.toggle("hide", !isVisible);
  });
});

fetch(
  "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
)
  .then((res) => res.json())
  .then((data) => {
    users = data.pokemon.map((user) => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      header.textContent = user.name;
      body.textContent = user.num;
      userCardContainer.append(card);
      return { name: user.name, num: user.num, element: card };
    });
  });
