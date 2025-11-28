var peticionEnCurso;

function maquetarPelis(peliculas)
{
    for(let peli of peliculas){
      
      var contenedor = document.getElementById("contenedor");
      miDiv = document.createElement("div");
      miDiv.addEventListener("click",(e)=>LanzaPeticionDetalle(peli.imdbID))       
      texto = document.createElement("h2");
      img = document.createElement("img");
      
      img.src = peli.Poster; 
      texto.textContent = peli.Title;

      miDiv.appendChild(img);
      miDiv.appendChild(texto);
      contenedor.appendChild(miDiv);

    }
}

function maquetarDetalles(id)
{
      miPeli = document.createElement("div");
      //miPeli.addEventListener("click",(e)=>LanzaPeticionDetalle(peli.imdbID))       
      texto = document.createElement("h3");
      img = document.createElement("img");
      img.src = id.Poster; 
      texto.textContent = id.Title;
      miPeli.id="detalles";
      div = document.createElement("derecha");
      ano = document.createElement
      miPeli.appendChild(img);
      miPeli.appendChild(texto);
      contenedor.appendChild(miPeli);
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

function LanzaPeticionDetalle(id){
   console.log(id);
    fetch("https://www.omdbapi.com/?i="+id+"&apikey=8cadea28").then(response => response.json()).then(data => {
        maquetarDetalles(data);
        //contador++;
    })
}


window.onload = () => {
    peticionEnCurso = false;
    contenedor = document.getElementById("contenedor");
    boton = document.getElementById("btnCargar");
    pelicula = document.getElementById("busqueda");
    buscar = document.getElementById("btnBuscar");
    boton.style.visibility = "hidden";

    buscar.addEventListener("click", ()  => {
        peticionEnCurso=false;
        contenedor.innerHTML = " ";
        contador = 2;
         LanzaPeticion("https://www.omdbapi.com/?s=" + pelicula.value +"&apikey=8cadea28&page=1");
            boton.style.visibility = "visible";
           
    })

    busqueda.addEventListener("keyup", ()  => {
      peticionEnCurso=false;  
      if(busqueda.value.length>=3)
      {
        console.log(busqueda.value);
        contenedor.innerHTML = " ";
        //contador = 2;
        LanzaPeticion("https://www.omdbapi.com/?s=" + pelicula.value +"&apikey=8cadea28&page=1");  
      }
    })
    
    /*
    
    boton cargar mas
    boton.addEventListener("click",() => {
        LanzaPeticion("https://www.omdbapi.com/?s=" + pelicula.value +"&apikey=8cadea28&page="+contador);
        contador++;
    })

    */

   


}

var contador = 2;

window.onscroll = () =>{
    let diferencia = (window.innerHeight + scrollY >= document.body.offsetHeight - 500);
    console.log(diferencia);
    if(diferencia)
        {
            LanzaPeticion("https://www.omdbapi.com/?s=" + pelicula.value +"&apikey=8cadea28&page="+contador);
            //contador++;
        }
}