const menuBurguer = document.querySelector("#menuBurguer")
const opcoesNav = document.querySelector("#opcoes")

window.addEventListener("resize",()=>{
    if(window.innerWidth >= 601){
        opcoesNav.style.display = "flex"
    } else{
        opcoesNav.style.display = "none"
    }
})

menuBurguer.addEventListener("click",()=>{
    if(opcoesNav.style.display == "none"){
        opcoesNav.style.display="block"
    } else{
        opcoesNav.style.display="none"
    }
})

fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(json => console.log(json));