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

const numMaxPokemon = 1292;
const pokeapi = "https://pokeapi.co/api/v2/pokemon/"
const all = "?offset=0&limit="+numMaxPokemon;
const pokemons = [];
let numCurrentPokemon = 0;

const previousPokemon = async () => {
  alert("Pokemon Anterior");
  //abra o terminal em inspecionar no chrome para visualizar
  console.log("Pokemon Anterior");
  --numCurrentPokemon;
  if(numCurrentPokemon==-1)
    numCurrentPokemon=numMaxPokemon-1;
  render(await fetchGET(pokemons[numCurrentPokemon]?.url));
}

const nextPokemon = async () => {
  alert("Pokemon Seguinte");
  //abra o terminal em inspecionar no chrome para visualizar
  console.log("Pokemon Seguinte");
  ++numCurrentPokemon;
  numCurrentPokemon %= numMaxPokemon;
  render(await fetchGET(pokemons[numCurrentPokemon]?.url));
}

const fetchGET = async url => {
  return await fetch(url, { method: "GET" })
    .then(data=>data.json())
    .then(data=>data);
};

const render = pokemon => {
  changeImage("img_sprite_front_default", pokemon?.sprites.front_default);
  changeText("name", pokemon?.name);

  console.log(pokemon);

  let types = "Types:";
  pokemon.types.forEach(t => {
    types += " " + t.type.name;
  });
  changeText("types", types);

  let abilities = "Abilities:";
  pokemon.abilities.forEach(a => {
    abilities += " " + a.ability.name;
  });
  changeText("abilities", abilities);
}

const searchEnter = event => {
  if(event.key === "Enter") {
    event.preventDefault();
    document.getElementById("btnsearch").click();
  }
}

const search = async () => {
  const s = document.getElementById("search").value.toLowerCase();
  let pokemon;
  alert("Pokemon Pesquisado");
  //abra o terminal em inspecionar no chrome para visualizar
  console.log("Pokemon Pesquisado");
  try {
    pokemon = await fetchGET(pokeapi+s);
  } catch (error) {
    pokemon = pokemons[0];
  }
  numCurrentPokemon = pokemons.findIndex(p => pokemon.name === p.name);
  render(pokemon);
}

(async () => {
  const data = await fetchGET(pokeapi+all);
  pokemons.push(...data?.results);
  const pokemon = await fetchGET(pokemons[0]?.url);
  render(pokemon);
}) ();