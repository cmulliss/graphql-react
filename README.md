# GraphQL

- REST-ful, routing, may need lots of diff http requests, expensive, may over fetch data

- a graph is a data structure that contains notes which are symbolised by all the rectangles and nodes, referred to as edges.

- once we have organised our data into a graph, we can query it with graphql.

## Getting started

- datastore, Express/GraphQL server, GraphiQL (pre built app)
- express is responsible for handling incoming http requests and making responses to be sent back

## root queries

need to give it a start by giving graphql some data to start. Say user with id of 23, pass that instruction to the root query thing, will have some logic in it so knows to jump to appropriate part of the graph.

## Resolve fn

want to return a user with a particular id

### lodash

- lodash to help walk through the list of users and find a particular id, a helper library.

- remove when using json server db

### middleware

- going to take the 2 types we made, our user type and our root query. We are going to merge them together into a graphql schema object, then we are going to hand that back to the graphql middleware inside our server.

- import GraphQLSchema helper, takes in a root query and returns a graphql instance.

#### first query

{
user(id: "23") {
id,
firstName,
age
}
}

returns

{
"data": {
"user": {
"id": "23",
"firstName": "Bill",
"age": 20
}
}
}

NB: lodash is returning a raw js object, graphql takes care of everthing behind the scenes. We just return raw js or json.

### Json Server

building up small fake apis

1. create db.json file
2. add data
3. start json server

- npm i --save json-server
- then create db.json
- npm run json:server

can go to:
http://localhost:3000/users/23

## Promises

- nearly all data fetching inside a node app is asynchronous in nature, so we nearly always end up having to return a promise from this to resolve a fn.

- need to make an http request inside the resolve fn, and return the promise that it generates.

### axios

- npm i --save axios
- remove lodash, as not using static list anymore
- import axios instead to schema

### nodemon

- watches over project and automatically restarts node server when any changes
- npm i --save nodemon
- separate script in package.json
- "dev": "nodemon server.js"
- then run with: npm run dev

## json server anb data relationships

- relationship between users and companies, json server has set this up behind the scenes.
- can go to:
- http://localhost:3000/companies/1/users
- to see all users working at company with id 1
- http://localhost:3000/companies/2/users
  to see everyone workind at company with id 2.

  ## Servers

  - for node
  - npm run dev

- for json server
- npm run json:server
