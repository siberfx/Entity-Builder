import axios from 'axios'
import { packFile, packEntity } from './pack.js'

const Version = '2.1'

export let request = null
let connected = false

export function connect(domain) {
    request = axios.create({
        baseURL: domain,
        timeout: 33000,
    })

    request.interceptors.response.use(
        response => {
            const data = response.data
            checkVersion(data)
            connected = true
            return data
        },
        error => {
            if (connected) {
                // ok
            } else {
                request = null
            }
            return Promise.reject(error)
        },
    )

    return load()
}

export function getErrorMessage(error) {
    if ('string' === typeof error) {
        return error
    }

    if (error.response) {
        if (error.response.data.message) {
            return error.response.data.message
        }
    }

    if (error.message) {
        return error.message
    }

    return 'Error'
}

export function getPreset() {
    return axios.get('preset.json')
}

export function load() {
    return request.get('/entity')
}

export function getDB() {
    return request.get('/entity/table')
}

export function save(project) {
    return request.post('/entity', {
        project: JSON.stringify(project),
    })
}

function checkVersion(data) {
    if (data.version) {
        const php = data.version.split('.')
        const require = Version.split('.')
        if (php[0] === require[0]) {
            if (php[0] - require[0] >= 0) {
                return
            }
        }
    }

    throw new Error(`Version does not match!\nPHP package version: ${data.version}\nRequired version: ${Version}`)
}

function deploy(data) {
    return request.post('/entity/code', {
        files: data,
    })
}

export function deployFile(project, entity, file) {
    const data = {}
    packFile(project, entity, file, data)
    return deploy(data)
}

export function deployEntity(project, entity) {
    const data = {}
    packEntity(project, entity, data)
    return deploy(data)
}
