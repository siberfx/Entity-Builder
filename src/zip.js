import FileSaver from 'file-saver'
import JSZip from 'jszip'
import { packEntity } from './pack.js'

export function download(name, text) {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    FileSaver.saveAs(blob, name)
}

export function zipAll(project) {
    const data = {}
    project.EntityManager.list.forEach(entity => {
        packEntity(project, entity, data)
    })
    zipList(project.name, data)
}

export function zipEntity(entity, project) {
    const data = {}
    packEntity(project, entity, data)
    zipList(project.name, data)
}

function zipList(name, data) {
    const zip = new JSZip()
    Object.keys(data).forEach(key => {
        const namexx = key.split('/').filter(name => name.length)
        const fileName = namexx.pop()
        let folder = zip
        namexx.forEach(name => {
            folder = folder.folder(name)
        })
        folder.file(fileName, data[key])
    })
    zip.generateAsync({ type: 'blob' }).then(blob => {
        FileSaver.saveAs(blob, name + '.zip')
    })
}
