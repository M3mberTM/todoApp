import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/items'
import utilService from './utils.js'

const getAll = async () => {
    const config = {
        headers: { Authorization: utilService.getToken() },
    }
    const response = await axios.get(baseUrl, config)
    return response.data
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization: utilService.getToken() },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (newObject) => {
    const config = {
        headers: { Authorization: utilService.getToken() },
    }
    const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
    return response.data
}

const remove = async (id) => {
    const config = {
        headers: { Authorization: utilService.getToken() },
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

export default { getAll, create, update, remove }