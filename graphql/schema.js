import graphql from 'graphql';
import UserType from './UserType.js';
import User from '../models/User.js';

import  {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} from 'graphql';

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                return User.findById(args.id)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});