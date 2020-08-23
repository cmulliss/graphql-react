const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const app = express()

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
  })
)

app.listen(4000, () => {
  console.log('Server started at:')
  console.log('http://localhost:4000')
  console.log('Listening')
})

// express is an http server
