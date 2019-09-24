import Entity from 'entity-builder';

export default Entity;

export function loadProject(json) {
    const project = new Entity.Project(json.name);
    project.load(json);
    return project;
}

export function makeProject(name) {
    const project = new Entity.Project(name);
    addUser(project);
    return project;
}

function addUser(project) {
    const entity = project.EntityManager.make('user');
    project.EntityManager.add(entity);
}
