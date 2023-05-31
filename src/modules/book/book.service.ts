import {PostBookPayload} from "./book.schema";
import prisma from "../../utils/prisma";

export function postBook(input: PostBookPayload) {
    const {title, description, favorite, author, rating} = input;

    return prisma.book.create({
        data: {
            title,
            description,
            favorite,
            author,
            rating
        },
    });
}

export async function findBook() {
    return prisma.book.findMany();
}

export async function patchBook(input: { id: string; title: string }) {
    const {id, title} = input;

    return prisma.book.update({
        where: {
            id: Number(id),
        },
        data: {
            title,
        },
    });
}

export async function deleteBook(id: string) {
    await prisma.book.delete({
        where: {
            id: Number(id),
        },
    });
}
