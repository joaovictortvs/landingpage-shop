const btn_enviar = document.querySelector("#btn_enviar")

btn_enviar.addEventListener("click",()=>{
    const tituloNome = document.querySelector("#f_titulo").value 
    const id_produto = document.querySelector("#f_id").value
    const precoProduto = document.querySelector("#f_preco").value
    const descricaoProduto = document.querySelector("#f_descricao").value 
    const imagemProduto = document.querySelector("#f_imagem").value 
    const categoriaProduto = document.querySelector("#f_categoria").value

    const dadosNovoProduto = {
        nomeTitulo: tituloNome,
        id: id_produto,
        preco: precoProduto,
        categoria: categoriaProduto,
        descricao: descricaoProduto,
        imagem: imagemProduto
    }
    
    AdicionarProduto(dadosNovoProduto)
})

async function AdicionarProduto(dadosProduto){
    const response = await fetch(`https://fakestoreapi.com/products/${dadosProduto.id}`, {
        method: 'PUT',
        body:JSON.stringify(
            {
                title: dadosProduto.nomeTitulo,
                price: dadosProduto.preco,
                description: dadosProduto.descricao,
                image: dadosProduto.imagem,
                category: dadosProduto.categoria
            }
        )
    })
    const data = await response.json()
    console.log(data)
}
