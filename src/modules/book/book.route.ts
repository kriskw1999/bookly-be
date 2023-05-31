import {FastifyInstance} from "fastify";
import {deleteBookHandler, getBookHandler, patchBookHandler, postBookHandler,} from "./book.controller";
import {$ref} from "./book.schema";

async function bookRoutes(server: FastifyInstance) {
    server.post(
        "/",
        {
            schema: {
                body: $ref("postBookRequestSchema"),
                response: {201: $ref("postBookResponseSchema")},
            },
        },
        postBookHandler
    );

    server.get("/", getBookHandler);

    server.patch(
        "/:id",
        {
            schema: {
                body: $ref("patchBookRequestSchema"),
                response: {200: $ref("patchBookResponseSchema")},
            },
        },
        patchBookHandler
    );

    server.delete("/:id", deleteBookHandler);
}

export default bookRoutes;
