const {ApolloServer, gql} = require('apollo-server');
const { default: axios, get } = require('axios');

const typeDefs = gql`
type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    address: Address!
}

type Address {
street: String!
suite: String!
city: String!
zipcode: String!
geo: Geo!
}
type Geo {
lat: String!
lng: String!
}
type Query {
    users: [User!]  
    getTodos: [Todo!]
    getUserTodos(userId: ID!): [Todo!]
}
type Todo {
    userId: ID!
    id: ID!
    title: String!
    completed: Boolean!
}
`;

const resolvers = {
    Query: {
        users: async () => (await axios.get('https://jsonplaceholder.typicode.com/users')).data,
        getTodos: async () => (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
        getUserTodos: async (_, {userId}) => (await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)).data
    }
};

const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
});
