import hapi from 'hapi';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import indexRoute from './routes/index.js';
import { graphqlHapi, graphiqlHapi } from 'apollo-server-hapi';
import schema from './graphql/schema.js';


dotenv.load();

mongoose.connect(process.env.MONGO_URI)

mongoose.connection.once('open', () =>{
    console.log('connected to database');
})


const init = async () => {

    const server = hapi.server({
        port: 4000,
        host: 'localhost'
    });

    try {
        await server.start();
        console.log(`Server running at: ${server.info.uri}`);
    } catch(err) {
        console.log(err)
    }

    await server.register({
        plugin: graphiqlHapi,
        options:{
            path: '/graphiql',
            graphiqlOptions: {
                endpointURL: '/graphql'
            },
            route: {
                cors: true
            }
        }
    });
    
    await server.register({
        plugin: graphqlHapi,
        options: {
            path: '/graphql',
            graphqlOptions: {
                schema
            },
            route: {
                cors: true
            }
        }
    })
    
    indexRoute(server);
};

init()