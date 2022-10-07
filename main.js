const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
const card = document.querySelector(".card-container");
const btn = document.querySelector("#btn")
const input = document.querySelector(".input");

const renderPokemon = (pokemon) => { // creamos la función para renderizar los pokemones
    const { id, name, sprites, height, weight, types } = pokemon;
  
    return ` 
      <div class="poke">
          <img  src="${sprites.other.home.front_default}"/>
          <p class="id-poke">#${id}</p>
          <h2>${name.toUpperCase()}</h2>
          <span class="exp">EXP: ${pokemon.base_experience}</span>
          <div class="tipo-poke">
                <span>Type:</span>
              ${types.map((tipo) => {
                  return `<span class="${tipo.type.name} poke__type">${tipo.type.name}</span>`;}).join("-")
                }
          </div>
          <p class="height">Height: ${height / 10}m</p>
          <p class="weight">Weight: ${weight / 10}Kg</p>
      </div>
    `;
  };
  
  const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove ("success");
    formField.classList.add ("error");
    const error = formField.querySelector("small");
    error.textContent = message;
}
const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove ("error");
    formField.classList.add ("success");
    const error = formField.querySelector("small");
    error.textContent = "";
}

const buscarPokemon = async () =>{
    const input = document.querySelector(".input");
    const pokemon = input.value.toLowerCase();
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const data = await res.json();
        console.log(data);
        showSuccess(input, "");
        card.innerHTML = renderPokemon(data)
    } catch (error) {
        showError(input, "Ingrese un número o un pokemón válido");
    }
}

btn.addEventListener('click', buscarPokemon)