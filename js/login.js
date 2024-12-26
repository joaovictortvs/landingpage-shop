const btn_login = document.querySelector("#btn_entrar")

btn_login.addEventListener("click",()=>{
    const username = document.querySelector("#f_username").value 
    const password = document.querySelector("#f_password").value

    login(username,password)
})

async function login(username_login,senha){
    try{
        const response = await fetch('https://fakestoreapi.com/auth/login', { // endpoint fora do ar
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username_login,
                password: senha
            })
        })

        if(!response.ok){
            throw new Error(`HTTP error! status ${response.status}`)
        }

        const data = await response.json()
        console.log(data)
    } catch(error){
        console.log(`Não foi possível fazer o login, usuário ou senha incorretos. ${error}`)
    }    
}

const btn_registrar = document.querySelector("#btn_registrar")

btn_registrar.addEventListener("click",()=>{
    const usernameReg = document.querySelector("#f_usernameRegistrar").value
    const nomeReg = document.querySelector("#f_nome").value
    const sobrenomeReg = document.querySelector("#f_sobrenome").value
    const telefoneReg = document.querySelector("#f_telefone").value
    const addressReg = document.querySelector("#f_endereco").value
    const cepReg = document.querySelector("#f_cep").value
    const emailReg = document.querySelector("#f_registroEmail").value
    const senhaReg = document.querySelector("#f_registroPassword").value

    let lat_long = []

    function geoLocation(){
        if(navigator.geolocation){
        
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                lat_long.push(position.coords.latitude)
                lat_long.push(position.coords.longitude)
            },
            (error)=>{
                lat_long.sort("Geolocalização não obtida.")
                lat_long.sort("Geolocalização não obtida.")
            }
        )
        }
    }  

    geoLocation()

    let [cityReg, streetReg, numberReg]= addressReg.split(", ")

    const dadosRegistro = {
        usuario: usernameReg,
        nome: nomeReg,
        sobrenome: sobrenomeReg,
        telefone: telefoneReg,
        cidade: cityReg,
        rua: streetReg,
        numero: numberReg,
        cep: cepReg,
        lat: lat_long[0],
        long: lat_long[1],
        email: emailReg,
        senha: senhaReg,
    }
    registrar(dadosRegistro)
})

const registrar=(dados)=>{
    Registro.registrarUser(dados)
}

class Registro{
    static registrarUser=(dados)=>{
        async function registrando(dados){
            try{
                const response = await fetch('https://fakestoreapi.com/users',{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: dados.email,
                        username: dados.usuario,
                        password: dados.senha,
                        name: {
                            firstname: dados.nome,
                            lastname: dados.sobrenome
                        },
                        address: {
                            city: dados.cidade,
                            street: dados.rua,
                            number: dados.numero,
                            zipcode: dados.cep,
                            geolocation: {
                                lat: dados.lat,
                                long: dados.long
                            }
                        },
                        phone: dados.telefone
                    })
                })

                if(!response.ok){
                    throw new Error(`Problemas com o registro: ${response.status} - ${response.statusText}`)
                }
                
                const data = await response.json()
                console.log(data)
            }catch(error){
                 console.log(error)
            }    
        }
        registrando(dados)
    }
}