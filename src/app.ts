import Fastify from "fastify";
import bookRoute from "./modules/book/book.route";
import {bookSchemas} from "./modules/book/book.schema";
import cors from "@fastify/cors";

export const server = Fastify();

/**
 * Used to check if the server is running
 */
server.get("/healthcheck", async function () {
    return {status: "OK"};
});

/**
 * Main function to start the server
 */
async function main() {
    [bookSchemas].flat().forEach((schema) => {
        server.addSchema(schema);
    });

    await server.register(cors, {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    });

    server.register(bookRoute, {prefix: "/api/books"});

    try {
        await server.listen({port: 8080, host: "0.0.0.0"});
    } catch (err) {
        process.exit(1);
    }
}

main();
