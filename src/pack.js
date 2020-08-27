import render from './render.js'

function exe(template, params) {
    const names = Object.keys(params);
    const vals = Object.values(params);
    return new Function(...names, `return \`${template}\`;`)(...vals);
}

export function packFile(project, entity, file, data) {
    const ppp = {
        project,
        entity,
        file
    }
    const name = exe(file.layer.path, ppp) + '/' + file.fileName
    data[name] = render(project, entity, file)
}

export function packEntity(project, entity, data) {
    entity.FileManager.list.forEach(file => {
        packFile(project, entity, file, data)
    })
}
