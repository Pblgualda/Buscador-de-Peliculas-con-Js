var peticionEnCurso;
var pelisFav = [];

function maquetarPelis(peliculas)
{
    for(let peli of peliculas){    
      var contenedor = document.getElementById("contenedor");
      miDiv = document.createElement("div");

      texto = document.createElement("h2");
      img = document.createElement("img");
      img.className = "poster";
      img.onerror = (e) => e.target.src = "/img/error.jpg";
      var estrella = document.createElement("img");
      estrella.src = "/img/favorito.png";
      
      estrella.className ="fav";
      img.src = peli.Poster; 
      texto.textContent = peli.Title;
      
      //Al hacer click en la imagen o en el texto
      img.addEventListener("click",(e)=>{
            LanzaPeticionDetalle(peli.imdbID);
        })  
      //al hacer click en la estrella    
        estrella.addEventListener("click",(e)=>
        {
            if(pelisFav.includes(peli.imdbID))
            {
                pelisFav.splice(pelisFav.indexOf(peli.imdbID), 1);
                e.target.src = "./img/normal.png";
                localStorage.setItem("Favoritas",JSON.stringify(pelisFav));
                //console.log(estrella.src);
            }
            else
            {

                pelisFav.push(peli.imdbID);
                e.target.src = "./img/favorito.png";
                localStorage.setItem("Favoritas",JSON.stringify(pelisFav));
                //console.log(estrella.src);
                
            }
        })
        
        if(pelisFav.includes(peli.imdbID))
            {
                estrella.src = "/img/favorito.png";
            }
        else
            {
                estrella.src = "/img/normal.png";
            }
        
      miDiv.appendChild(img);
      miDiv.appendChild(texto);
      miDiv.appendChild(estrella);
      miDiv.className = "peli";
      contenedor.appendChild(miDiv);
      

    }
}

function maquetarDetalles(id)
{
    humo = document.createElement("section"); 
    humo.id = "humo";

    miPeli = document.createElement("div");
    miPeli.id = "detalles";

    titulo = document.createElement("h3");
    titulo.textContent = id.Title;

    img = document.createElement("img");
    img.onerror = (e) => e.target.src = "/img/error.jpg";
    img.src = id.Poster; 

    derecha = document.createElement("div");
    derecha.id = "divDerecha";

    // Año
    ano = document.createElement("p");
    ano.textContent = "Año: " + id.Year;

    // Fecha de estreno
    released = document.createElement("p");
    released.textContent = "Estreno: " + id.Released;

    // Duración
    duracion = document.createElement("p");
    duracion.textContent = "Duración: " + id.Runtime;

    // Género
    genero = document.createElement("p");
    genero.textContent = "Género: " + id.Genre;

    // Director
    director = document.createElement("p");
    director.textContent = "Director: " + id.Director;

    // Montaje
    miPeli.appendChild(img);
    
    derecha.appendChild(titulo);
    derecha.appendChild(ano);
    derecha.appendChild(released);
    derecha.appendChild(duracion);
    derecha.appendChild(genero);
    derecha.appendChild(director);

    miPeli.appendChild(derecha);

    contenedor.appendChild(miPeli);
    contenedor.appendChild(humo);
}


function LanzaPeticion(url){

    if(!peticionEnCurso)
    {
        peticionEnCurso=true;
        fetch(url).then(response => response.json()).then(data => {
        maquetarPelis(data.Search);
        contador++;
        peticionEnCurso=false;
        
    })
}
}

function maquetarFavoritos(id){
    for(peli of id){
    fetch("https://www.omdbapi.com/?i=" + peli + "&apikey=5ddaee62").then(response => response.json()).then(data => {
            maquetarPelis([data]); 
            peticionEnCurso = false;
        })
    }
}

function LanzaPeticionDetalle(id){
   console.log(id);
    fetch("https://www.omdbapi.com/?i="+id+"&apikey=8cadea28").then(response => response.json()).then(data => {
        maquetarDetalles(data);
        //contador++;
    })
}


window.onload = () => 
{
    if(!localStorage.getItem("Favoritas"))
        {
            localStorage.setItem("Favoritas",JSON.stringify([]));
        }
    else
        {
            pelisFav = JSON.parse(localStorage.getItem("Favoritas"));
        }
    favo = document.getElementById("fav");
    cat = document.getElementById("categoria");
    botonInicio = document.getElementById("BotonInicio");
    vistaB = document.getElementById("vistaBuscador");
    vistaI = document.getElementById("PaginaInicio");
    peticionEnCurso = false;
    contenedor = document.getElementById("contenedor");
    pelicula = document.getElementById("busqueda");
    buscar = document.getElementById("btnBuscar");

    botonInicio.addEventListener("click", () => {
        vistaI.style.visibility = "hidden";
        vistaB.style.visibility = "visible";
    })


    document.addEventListener("click", (e) =>{
        if(e.target != miPeli)
            {
                miPeli.remove();
                humo.remove();
            }
    })
    buscar.addEventListener("click", ()  => {
        peticionEnCurso=false;
        contenedor.innerHTML = " ";
        //contador = 2;
        if(cat.value=="cualquiera"){
            categoria = "";
        }else if(cat.value == "pelicula"){
            categoria = "&type=movie";
        }else if(cat.value == "serie"){
            categoria = "&type=series";
        }
        LanzaPeticion("https://www.omdbapi.com/?s="+pelicula.value+categoria+"&apikey=ea005db6&page=1");

                   
    })

      favo.addEventListener("click", ()  => {
        peticionEnCurso=false;
        contenedor.innerHTML = " ";
        //contador = 2;
                maquetarFavoritos(pelisFav);
        
                   
    })

    busqueda.addEventListener("keyup", ()  => {
      peticionEnCurso=false;  
      if(busqueda.value.length>=3 || check.checked==true)
      {
        contenedor.innerHTML = " ";
        contador = 2;
        if(cat.value=="cualquiera"){
            categoria = "";
        }else if(cat.value == "pelicula"){
            categoria = "&type=movie";
        }else if(cat.value == "serie"){
            categoria = "&type=series";
        }
        LanzaPeticion("https://www.omdbapi.com/?s="+pelicula.value+categoria+"&apikey=ea005db6&page=1");
             
      }
      else
        {
            contenedor.innerHTML=" ";
        }
    })
    

}

var contador = 2;

window.onscroll = () =>{
    let diferencia = (window.innerHeight + scrollY >= document.body.offsetHeight - 180);
    console.log(diferencia);
    if(diferencia)
        {
            LanzaPeticion("https://www.omdbapi.com/?s=" + pelicula.value +"&apikey=8cadea28&page="+contador);
            //contador++;
        }
}