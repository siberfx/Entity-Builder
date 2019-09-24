import Entity from './entity';

export const FieldTypeList = Entity.FieldTypeList;

export const CommonTypeList = ['integer', 'char', 'string', 'text', 'dateTime', 'timestamp', 'decimal', 'float'];

export const IntegerFieldList = [
    new Entity.Field('id', 'increments'),
    new Entity.Field('age', 'integer'),
    new Entity.Field('sex', 'integer', 0),
    new Entity.Field('sort', 'integer'),
    new Entity.Field('status', 'integer', 0),
    new Entity.Field('type', 'integer'),
    new Entity.Field('category_id', 'integer'),
    new Entity.Field('parent_id', 'integer', 0),
    new Entity.Field('post_id', 'integer', 0),
    new Entity.Field('tag_id', 'integer', 0),
    new Entity.Field('user_id', 'integer')
];

export const CommonFieldList = [
    new Entity.Field('address', 'string'),
    new Entity.Field('content', 'string'),
    new Entity.Field('email', 'string', '', false, 33),
    new Entity.Field('full_name', 'string', '', false, 33),
    new Entity.Field('image', 'string'),
    new Entity.Field('link', 'string'),
    new Entity.Field('name', 'string', '', false, 22),
    new Entity.Field('phone', 'char', '', false, 11),
    new Entity.Field('text', 'string'),
    new Entity.Field('title', 'string')
];

function exclude(field) {
    field.fillable = false;
    field.included = false;
}

const ExcludeIntegerList = ['id', 'user_id'];
ExcludeIntegerList.forEach(name => {
    const found = IntegerFieldList.find(field => field.name == name);
    if (found) {
        exclude(found);
    }
});

const password = new Entity.Field('password', 'char', '', false, 60);
CommonFieldList.push(password);
password.fillable = false;
password.hidden = true;

const remember = new Entity.Field('remember_token', 'string', '', true, 60);
CommonFieldList.push(remember);
exclude(remember);
remember.allowNull = true;
remember.hidden = true;

const created = new Entity.Field('created_at', 'timestamp', '', true);
CommonFieldList.push(created);
exclude(created);
created.allowNull = true;

const updated = new Entity.Field('updated_at', 'timestamp', '', true);
CommonFieldList.push(updated);
exclude(updated);
updated.allowNull = true;

const deleted = new Entity.Field('deleted_at', 'timestamp', '', true);
CommonFieldList.push(deleted);
exclude(deleted);
deleted.allowNull = true;
