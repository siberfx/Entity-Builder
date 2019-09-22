export function make(project) {
    const list = [];
    list.push('#fill: #FEFEFE');
    list.push('#fontSize: 16');
    project.EntityManager.list.forEach(entity => {
        const ttt = makeEntity(entity);
        list.push(ttt);

        const rrr = makeRelation(entity, project);
        list.push(rrr);
    });
    return list.join('\n\n');
}

function makeEntity(entity) {
    const list = [];
    entity.FieldManager.list.forEach(field => {
        list.push(`${field.name}: ${field.type}`);
    });
    const field = list.join(';');
    return `[${entity.name}|${field}]`;
}

function makeRelation(entity, project) {
    const list = [];
    entity.RelationManager.list.forEach(relation => {
        const other = project.EntityManager.find(relation.model);
        list.push(link(entity, other, relation));
    });
    return list.join('\n');
}

function link(entity, other, relation) {
    const from = entity.name;
    const to = other.name;
    const ttt = type(relation.type);
    return `[${from}]${ttt}[${to}]`;
}

function type(type) {
    if (type === 'hasOne') {
        return '1 -> 1';
    }
    if (type === 'hasMany') {
        return '1 -> *';
    }
    if (type === 'belongsTo') {
        return '* -> 1';
    }
    return '* -> *';
}
