import {FastifyReply, FastifyRequest} from "fastify";
import {PatchBookPayload, PostBookPayload,} from "./book.schema";
import {deleteBook, findBook, patchBook, postBook,} from "./book.service";

export async function postBookHandler(
    request: FastifyRequest<{
        Body: PostBookPayload;
    }>,
    reply: FastifyReply
) {
    const {title, author, favorite, description, rating} = request.body;


    const book = await postBook({title, author, favorite, description, rating});

    reply.status(201).send(book);
}

export async function getBookHandler(
    request: FastifyRequest,
    reply: FastifyReply
) {

    const book = await findBook();

    reply.status(200).send(book);
}

export async function patchBookHandler(
    request: FastifyRequest<{
        Params: { id: string };
        Body: PatchBookPayload;
    }>,
    reply: FastifyReply
) {
    const {id} = request.params;
    const {title} = request.body;

    const book = await patchBook({id, title});

    reply.status(200).send(book);
}

export async function deleteBookHandler(
    request: FastifyRequest<{
        Params: { id: string };
    }>,
    reply: FastifyReply
) {
    const {id} = request.params;

    await deleteBook(id);

    reply.status(200).send();
}
