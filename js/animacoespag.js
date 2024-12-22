const menuBurguer = document.querySelector("#menuBurguer")
const opcoesNav = document.querySelector("#opcoes")
const divlinkCategorias = document.querySelector("#linkCategorias")
const opsCategorias = document.querySelector("#categorias")

window.addEventListener("resize",()=>{
    if(window.innerWidth >= 601){
        opcoesNav.style.display = "flex"
    } else{
        opcoesNav.style.display = "none"
        
    
            // opsCategorias.addEventListener("mouseleave",()=>{
            //     opsCategorias.style.display = "none"
            // })
            // divlinkCategorias.addEventListener("mouseleave",()=>{
            //     opsCategorias.style.display= "none"
            // })   
    }
})

menuBurguer.addEventListener("click",()=>{
    if(opcoesNav.style.display == "none"){
        opcoesNav.style.display="block"
    } else{
        opcoesNav.style.display="none"
    }
})

divlinkCategorias.addEventListener("click",()=>{
    if(opsCategorias.style.display == "none"){
        opsCategorias.style.display = "block"
    } else{
        opsCategorias.style.display = "none"
    }
})            