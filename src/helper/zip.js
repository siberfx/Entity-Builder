import FileSaver from 'file-saver';
import JSZip from 'jszip';
import nunjucks from 'nunjucks';
import render from './render';

nunjucks.configure({
    autoescape: false
});

export function save(project) {
    const name = project.fileName;
    const result = JSON.stringify(project);
    // console.log(result)
    const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, name);
}

export function zipAll(project) {
    const zip = new JSZip();
    project.EntityManager.list.forEach(entity => {
        renderEntity(entity, project, zip);
    });
    zip.generateAsync({ type: 'blob' }).then(blob => {
        const name = project.name + '.zip';
        FileSaver.saveAs(blob, name);
    });
}

export function zipEntity(entity, project) {
    const zip = new JSZip();
    renderEntity(entity, project, zip);
    zip.generateAsync({ type: 'blob' }).then(blob => {
        const name = project.name + '.zip';
        FileSaver.saveAs(blob, name);
    });
}

function renderEntity(entity, project, zip) {
    entity.FileManager.list.forEach(file => {
        renderFile(file, entity, project, zip);
    });
}

function renderFile(file, entity, project, zip) {
    const list = file.FileType.path.split('/');
    const nameList = list.filter(name => name.length);
    let folder = zip;
    nameList.forEach(item => {
        folder = folder.folder(item);
    });
    const text = render(project, entity, file);
    folder.file(file.fileName, text);
}
