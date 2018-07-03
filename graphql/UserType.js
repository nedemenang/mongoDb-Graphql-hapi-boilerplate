import graphql from 'graphql';

import  { GraphQLObjectType, GraphQLString }from 'graphql';

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        userName: {type: GraphQLString},

    })
});

module.exports = UserType;