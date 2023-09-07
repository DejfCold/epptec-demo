import {Article} from "./dtos";
import axios from "axios";

const ENDPOINT = "https://jsonplaceholder.typicode.com/posts"

export async function findArticles(): Promise<Article[]> {
    const response = await axios.get(ENDPOINT)

    if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText)
    }

    const responseData = response.data as Article[]
    if (!Array.isArray(responseData) || !responseData.every(it => (
        it.hasOwnProperty('userId') &&
        it.hasOwnProperty('id') &&
        it.hasOwnProperty('title') &&
        it.hasOwnProperty('body')
    ))) {
        return Promise.reject(new Error("Invalid Article data shape"))
    }

    return responseData
}

export async function findArticleById(id: number) {
    const responseData = await findArticles()
    const found = responseData.find(article => article.id === id)
    if (!found) {
        console.log("Not found!")
        throw new Error(`Article ${id} not found`)
        // return Promise.reject()
    }
    return found!
}
