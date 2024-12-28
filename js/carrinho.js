class AdicionarCarrinho{ // aqui é só a adição no banco de dados do carrinho do usuário
    static addCart=(id)=>{
        this.id = id
        async function AddInCart(id){
            try{
                const response = await fetch(`https://fakestoreapi.com/products/${id}`)

                if(!response.ok){
                    throw new Error(`Erro ao adicionar: ${error}`)
                }

                const data = await response.json()

                AddBanco(data)
                async function AddBanco(data){
                    const response = await fetch(`https://fakestoreapi.com/carts/${data.id}`,{
                        method:"PUT",
                        body:JSON.stringify(
                            {
                                userId: null,
                                date: null,
                                products:[{productId: data.id,quantity: 1}]
                            }
                        )
                    })

                    const responseJson = response.json()
                    console.log(responseJson)

                    const attBanco = await fetch(`https://fakestoreapi.com/carts/${data.id}`,{
                        method:"PATCH",
                        body:JSON.stringify(
                            {
                                userId: null,
                                date: null,
                                products:[{productId: data.id,quantity:1}]
                            }
                        )
                    })

                    const attBanco_Json = attBanco.json()
                    console.log(attBanco_Json)
                }
                
            } catch(error){
                console.log(error)
            }
        }  
        AddInCart
    }
}

export { AdicionarCarrinho };

class removerCarrinho{ 
    static removeCart=(id)=>{
        this.id = id
        async function removeIntoCart(id){
            try{
                const response = await fetch(`https://fakestoreapi.com/products/${id}`,{
                    method: 'DELETE'
                })

                if(!response.ok){
                    throw new Error(`Erro ao remover: ${error}`)
                }

                const data = await response.json()
                console.log(data)

            } catch(error){
                console.log(error)
            }
        }  
        removeIntoCart(this.id)
    }
}

export { removerCarrinho };