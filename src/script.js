const numMaxPokemon = 1017; // Não tem 1292 pokemons
let numCurrentPokemon = 1;

//função de mudar imagem pelo id e pela url
function changeImage(id, url) {
  document.getElementById(id).src = url;
}
//função de mudar texto pelo id e pelo texto
function changeText(id, text) {
  text = text.charAt(0).toUpperCase() + text.slice(1);
  document.getElementById(id).innerText = text;
}

// Daqui para baixo voce ira escrever
// o código para resolver o desafio

function previousPokemon() {
  alert("Pokemon Anterior");
  //abra o terminal em inspecionar no chrome para visualizar
  console.log("Pokemon Anterior");
  numCurrentPokemon--;
  if(numCurrentPokemon==0)
    numCurrentPokemon=numMaxPokemon;
  render();
}

function nextPokemon() {
  alert("Pokemon Seguinte");
  //abra o terminal em inspecionar no chrome para visualizar
  console.log("Pokemon Seguinte");
  numCurrentPokemon = (numCurrentPokemon%numMaxPokemon)+1;
  render();
}

const urlPokemon=()=>`https://pokeapi.co/api/v2/pokemon/${numCurrentPokemon}`;

const getPokemon = async () => {
  const pokemon = await fetch(urlPokemon(), {
    method: "GET"
  })
    .then(data=>data.json())
    .then(data=>data);
  return pokemon;
}

const render = async () => {
  const pokemon = await getPokemon();
  changeImage("img_sprite_front_default", pokemon?.sprites.front_default);
  changeText("name", pokemon?.name);
}

render();