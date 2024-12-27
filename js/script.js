import { AdicionarCarrinho } from "./carrinho.js"
import { removerCarrinho } from "./carrinho.js"

async function AllProducts(){
    const response =  await fetch('https://fakestoreapi.com/products')
    const products =  await response.json()

    products.map((product)=>{
        availableProducts(product)
    })
}

AllProducts()

const sectionProduct_eletronic = document.querySelector("#eletronicos")
const sectionProduct_roupasfemi = document.querySelector("#roupasfemininas")
const sectionProduct_roupasMasc = document.querySelector("#roupasmasculinas")
const sectionProduct_joias = document.querySelector("#joias")

const availableProducts=(product)=>{
    let loadingPage_msg = document.querySelectorAll(".siteCarregando")
    loadingPage_msg = [...loadingPage_msg]

    loadingPage_msg.map((msg)=>{
        msg.classList.add("msgOcultar")
    })

    const productCategory= product.category

    if(productCategory == "electronics"){
        setProductSection(product, sectionProduct_eletronic)

    } else if(productCategory == "women's clothing"){
        setProductSection(product, sectionProduct_roupasfemi)

    } else if(productCategory == "men's clothing"){
        setProductSection(product, sectionProduct_roupasMasc)

    } else{
        setProductSection(product,sectionProduct_joias)
    }

}

const setProductSection=(product, section)=>{
    const destinoSection = section

    const div = document.createElement("div")
    div.setAttribute("class","produto")
    div.setAttribute("id",product.id)
    destinoSection.appendChild(div)

    const img_produto = document.createElement("img")
    img_produto.setAttribute("src",product.image)
    div.appendChild(img_produto) 

    const p_nomeProduct = document.createElement("p")
    p_nomeProduct.innerHTML = product.title
    div.appendChild(p_nomeProduct)

    const p_precoProduct = document.createElement("p")
    p_precoProduct.setAttribute("class","p-preco")
    p_precoProduct.innerHTML = `R$ ${product.price}`
    div.appendChild(p_precoProduct)

    const btn_cart = document.createElement("button")
    btn_cart.setAttribute("class","btn_carrinho")
    btn_cart.innerHTML = "Adic. Carrinho"
    div.appendChild(btn_cart)

    btn_cart.addEventListener("click",(evt)=>{
        const idProduto = div.getAttribute("id")
        AdicionarCarrinho.addCart(idProduto)
    })

}

let categoryTypeSpecify = document.querySelectorAll(".categoryTypeSpecify")
categoryTypeSpecify = [...categoryTypeSpecify]

categoryTypeSpecify.forEach((type)=>{
    type.addEventListener("click",(evt)=>{
        let nameCategory = evt.target.getAttribute('data-identificador')
        specifyCategory(nameCategory)
    })
})

let section = null

async function specifyCategory(category){

    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`)

    const products = await response.json()

    let articles = document.querySelectorAll(".articles_desativar")
    articles = [...articles]

    articles.map((eachArticle)=>{
        eachArticle.style.display = "none"
    })

    const destino = document.querySelector("#main")
    destino.innerHTML = " "

    const article = await document.createElement("article")
    article.setAttribute("class","articleCategory")
    destino.appendChild(article)

    const nomeCategoria = document.createElement("h2")
    const nomeTraduzido = await traduzirNome(products[1].category)
    nomeCategoria.innerHTML = nomeTraduzido
    article.appendChild(nomeCategoria)

    section = document.createElement("section")
    section.setAttribute("class","secao-produtos")
    article.appendChild(section)

    products.map((product)=>{
        showCategory(product)
    })
}

const showCategory=(product)=>{

    const div = document.createElement("div")
    div.setAttribute("class","produto")
    div.setAttribute("id",product.id)
    section.appendChild(div)

    const img_produto = document.createElement("img")
    img_produto.setAttribute("src",product.image)
    div.appendChild(img_produto) 

    const p_nomeProduct = document.createElement("p")
    p_nomeProduct.innerHTML = product.title
    div.appendChild(p_nomeProduct)

    const p_precoProduct = document.createElement("p")
    p_precoProduct.setAttribute("class","p-preco")
    p_precoProduct.innerHTML = `R$ ${product.price}`
    div.appendChild(p_precoProduct)

    const btn_cart = document.createElement("button")
    btn_cart.setAttribute("class","btn_carrinho")
    btn_cart.innerHTML = "Adic. Carrinho"
    div.appendChild(btn_cart)

    btn_cart.addEventListener("click",(evt)=>{
        console.log(div.getAttribute("id"))
    })

}

const traduzirNome=(nomeCategoria)=>{
    if(nomeCategoria == "electronics"){
        nomeCategoria = "Eletrônicos"
        return nomeCategoria

    } else if(nomeCategoria == "women's clothing"){
        nomeCategoria = "Roupas Femininas"
        return nomeCategoria

    } else if(nomeCategoria == "men's clothing"){
        nomeCategoria = "Roupas Masculinas"
        return nomeCategoria

    } else{
        nomeCategoria = "Jóias"
        return nomeCategoria
    }
}

const btn_carrinho = document.querySelector("#carrinhoImg")

btn_carrinho.addEventListener("click",()=>{
    async function paginaCarrinho(){
        try{
            const response = await fetch('https://fakestoreapi.com/carts')
            
            if(!response.ok){
                throw new Error(`Erro ao abrir a página de carrinho: ${error}`)
            }

            const data = await response.json()

            mostrarProdutosCarrinho(data)

        } catch(error){
            console.log(error)
        }
        
    }
    paginaCarrinho()
})

let mainCarrinho = null
let articleCarrinho = null

const mostrarProdutosCarrinho=(dadosCarrinho)=>{
    const dados = dadosCarrinho.map((pedido)=>{
        const produto = pedido.products
        produto.forEach((prodId)=>{
            const idProduto = prodId.productId
            async function adicionarProduto(id){
                const response = await fetch(`https://fakestoreapi.com/products/${id}`)

                const data = await response.json()
                console.log(data)
                setProdutoPagina(data)
            }
            mainCarrinho = document.querySelector("#main")
            mainCarrinho.innerHTML = " "
        
            articleCarrinho = document.createElement("article")
            mainCarrinho.appendChild(articleCarrinho)   
            adicionarProduto(idProduto)
        })
    })
}

const setProdutoPagina=(produtoDados)=>{

    const div = document.createElement("div")
    div.setAttribute("class","produto produtoCarrinho")
    div.setAttribute("id",produtoDados.id)
    articleCarrinho.appendChild(div)

    const img_produto = document.createElement("img")
    img_produto.setAttribute("src",produtoDados.image)
    div.appendChild(img_produto) 

    const p_nomeProduct = document.createElement("p")
    p_nomeProduct.innerHTML = produtoDados.title
    div.appendChild(p_nomeProduct)

    const p_precoProduct = document.createElement("p")
    p_precoProduct.setAttribute("class","p-preco")
    p_precoProduct.innerHTML = `R$ ${produtoDados.price}`
    div.appendChild(p_precoProduct)

    const btn_RemoveCart = document.createElement("button")
    btn_RemoveCart.setAttribute("class","btn_removeCarrinho")
    btn_RemoveCart.innerHTML = "Remover do Carrinho"
    btn_RemoveCart.addEventListener("click",()=>{
        location.reload()
    })
    div.appendChild(btn_RemoveCart)

}