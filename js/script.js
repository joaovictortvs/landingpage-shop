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

}
