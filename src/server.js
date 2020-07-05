import { GraphQLServer } from "graphql-yoga";
import "./env";
import schema from "./schema";

const server = new GraphQLServer({ schema });

server.start(() => console.log('Server is running on localhost:8000'));