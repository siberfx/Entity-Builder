import axios from 'axios';
import render from './render';

let request = null;

export function connect(domain) {
    request = axios.create({
        baseURL: domain,
        timeout: 11000
    });
    return load();
}

export function load() {
    return request.get('/entity');
}

export function save(project) {
    return request.post('/entity', {
        project: JSON.stringify(project)
    });
}

function deploy(data) {
    return request.post('/entity/code', {
        files: data
    });
}

function pack(project, entity, file, data) {
    const name = file.FileType.path + '/' + file.fileName;
    data[name] = render(project, entity, file);
}

function packGroup(project, entity, data) {
    entity.FileManager.list.forEach(file => {
        pack(project, entity, file, data);
    });
}

export function deployFile(project, entity, file) {
    const data = {};
    pack(project, entity, file, data);
    return deploy(data);
}

export function deployGroup(project, entity) {
    const data = {};
    packGroup(project, entity, data);
    return deploy(data);
}

export function deployAll(project) {
    const data = {};
    project.EntityManager.list.forEach(entity => {
        packGroup(project, entity, data);
    });
    return deploy(data);
}
