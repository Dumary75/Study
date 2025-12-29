

const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    
    type getUser {
     name: String!
     password: String!
    }


    type Query {
     getUser(name: String!, password: String!): User


    }

    `);