const graphql = require('graphql')
const axios = require('axios')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList } = graphql

// needs to be before UserType
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
    users: { 
        type: new GraphQLList(UserType),
        resolve(parentValue, args) {
            return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
            .then(res => res.data)
        }
     }
  }
})

// tells it what properties, and associating company with user. Then need to find a resolve fn on this property, so graphql knows how to find the company associated with a given user.
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve (parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then((res) => res.data)
      }
    }
  }
})

// entry point, if give a user id, will return a user back to you. because resolver can handle a promise, can fetch data from just about anywhere.
// initially, can only go to user, needs to be able to query directly to company too.
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve (parentValue, args) {
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then((resp) => resp.data)
      }
    },
    // sibling to user. The args object tells our schema that whenever someone tries to access the company field we expect them to be providing the id arg as a string.
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve (parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${args.id}`)
          .then((resp) => resp.data)
      }
    }
  }
})

// and want to export this
module.exports = new GraphQLSchema({
  query: RootQuery
})

/*
purpose of schema file to instruct graphql about what type of data we have in our application.

fields property most important, and is object, tells graphql about all the different properties that graphql has.

using built in types

The resolve fn, is where we go into the db, or data store, and find the actual data that we are looking for.

The previous content, tells us what our data looks like, the resolve fn's purpose is to go and reach out and grab the real data.

parentValue notorious for never being used, we really care about the second argument, args, for example id will be present on args object.

because resolver can handle a promise, can fetch data from just about anywhere.

.then((resp) => resp.data)
to provide compatibility between axios and graphql, to make sure we only return the data that comes back from the request, not the entire response object

*/
