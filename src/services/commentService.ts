import {Comment} from "./dtos";
import axios from "axios";

const ENDPOINT = "https://jsonplaceholder.typicode.com/comments"

export async function findComments() {
    const response = await axios.get(ENDPOINT)

    if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText)
    }

    const responseData = response.data as Comment[]
    if (!Array.isArray(responseData) || !responseData.every(it => (
        it.hasOwnProperty('id') &&
        it.hasOwnProperty('body') &&
        it.hasOwnProperty('email') &&
        it.hasOwnProperty('postId') &&
        it.hasOwnProperty('name')
    ))) {
        throw new Error("Invalid Comment data shape")
    }

    return responseData
}

export async function findCommentsByArticleId(articleId: number) {
    const responseData = await findComments()
    return responseData.filter(it => it.postId === articleId)
}