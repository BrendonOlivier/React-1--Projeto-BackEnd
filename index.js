const cors = require ('cors');
const  express = require ('express');
const uuid = require (`uuid`);


const port = 3001;
const app = express();
app.use(express.json());
app.use(cors())
/*
    - Query params => meusite.com/users?name=rodrigo&age=44 // FILTROS
    - Route params => /users/2 // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECIFICO
    - Request Body => { "name":"Rodolfo", "age":}

    -GET            => Buscar informacao no back-end
    -POST           => Criar informacao no back-end
    -PUT / PATCH    => Alterar/Atualizaro informacao no back-end
    -DELETE         => Deletar informacao no back-end 
    
    -Middleware     => INTERCEPTADOR => Tem o poder de parar ou aterar dados da requisicao
*/

const users = []


const checkUserID = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}


app.get('/users', (request, response) => {

    return response.json(users)
})


app.post('/users', (request, response) => {
    const { name, age } = request.body
    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserID, (request, response) => {

    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updatedUser = { id, name, age }

    users[index] = updatedUser

    return response.json(updatedUser)
})

app.delete('/users/:id', checkUserID, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})


app.listen(3001, () => {
    console.log(`😎😎😎Server started on port ${port}`)
})

