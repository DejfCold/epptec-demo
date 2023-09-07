import {User} from "./dtos";
import axios from "axios";

const ENDPOINT = "https://jsonplaceholder.typicode.com/users"

export async function findUsers() {
    const response = await axios.get(ENDPOINT)

    if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText)
    }

    const responseData = response.data as User[]

    if (!Array.isArray(responseData) || !responseData.every(it => (
        it.hasOwnProperty("id") &&
        it.hasOwnProperty("name") &&
        it.hasOwnProperty("username") &&
        it.hasOwnProperty("email") &&
        it.hasOwnProperty("address") &&
        it.hasOwnProperty("phone") &&
        it.hasOwnProperty("website") &&
        it.hasOwnProperty("company") &&
        it.company.hasOwnProperty("name") &&
        it.company.hasOwnProperty("catchPhrase") &&
        it.company.hasOwnProperty("bs") &&
        it.address.hasOwnProperty("street") &&
        it.address.hasOwnProperty("suite") &&
        it.address.hasOwnProperty("city") &&
        it.address.hasOwnProperty("zipcode") &&
        it.address.hasOwnProperty("geo") &&
        it.address.geo.hasOwnProperty("lat") &&
        it.address.geo.hasOwnProperty("lng")
    ))) {
        throw new Error("Invalid User data shape")
    }

    return responseData
}

export async function findUserById(id: number) {
    const response = await findUsers()
    const found = response.find(user => user.id === id)
    if (!found) {
        throw Error(`User ${id} not found!`)
    }
    return found!
}