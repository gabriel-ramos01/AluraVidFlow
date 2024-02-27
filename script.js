const containerVideos = document.querySelector(".videos__container");

//Para que eu não esqueça, o que está acontecendo aqui é que está sendo feita a integração com uma API fake
//Na sequência fazend um foreach das informações da API referentes ao item vídeos, para que toda vez que dentro de vídeos
//Se acessar a propriedade video, seja interido com um inner HMTL a LI com os valores em template sgtring com todos os dados daquele video
//Para isso ele usa o Iframe e ai adiciona o valor de dentro do banco de dados com o item vídeo e a URL correspondente para que carregue tudo
//Usando uma interação bastante parecida com o React

async function BuscarEMostrarVideos() {
  try {
    const busca = await fetch("http://localhost:3000/videos");
    const videos = await busca.json();

    videos.forEach((video) => {
      if (video.categoria == ""){
        throw new Error('Vídeo não tem categoria')
      }
      containerVideos.innerHTML += `
          <li class=videos__item>
              <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
              <div class="descricao-video">
                  <img class="img-canal" src="${video.imagem}" alt="logo do canal">
                  <h3 class="titulo-video">${video.titulo}</h3>
                  <p class="titulo-canal">${video.descricao}</p>
                  <p class="categoria" hidden>${video.categoria}</p>
              </div>
          </li>
      `;
    });
  } catch(error){
    containerVideos.innerHTML =`<p>Houve um erro ao carregar os vídeos ${error} </p>`
  } 
}
BuscarEMostrarVideos();

const barraDePesquisa = document.querySelector('.pesquisar__input')

barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa(){
  const videos  = document.querySelectorAll(".videos__item")

  if (barraDePesquisa.value != ""){
    for(let video of videos){
      let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
      let valorFiltro = barraDePesquisa.value.toLowerCase();

      if (!titulo.includes(valorFiltro)){
        video.style.display = "none";
      }else{
        video.style.display = "block";
      }
    }
  }else{
    video.style.display = "block";
  }
}
const botaoCategoria = document.querySelectorAll('.superior__item')

botaoCategoria.forEach((botao) => {
  let nomeCategoria = botao.getAttribute('name')
  botao.addEventListener('click', () => filtrarPorCategoria(nomeCategoria))
})

function filtrarPorCategoria(filtro) {
  const videos = document.querySelectorAll('.videos__item')
  for (let video of videos) {
    let categoria = video.querySelector(".categoria").textContent.toLowerCase()
    let valorFiltro = filtro.toLowerCase()

    if (!categoria.includes(valorFiltro) && valorFiltro !== 'tudo') {
      video.style.display = "none"
    } else {
      video.style.display = "block"
    }
  }
}





//Interessante colocar isso aqui para verificar se o código executa bem até o final
//finally{
 // alert('Isso sempre acontece')
//}
