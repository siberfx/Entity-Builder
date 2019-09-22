import nunjucks from 'nunjucks';
import Template from './template';

export default function render(project, entity, file) {
    const data = {
        project,
        entity,
        file,
        model: entity.FileManager.findByType('Model'),
        request: entity.FileManager.findByType('Request')
    };
    const template = Template[file.FileType.templateName];
    const result = nunjucks.renderString(template, data);
    // console.log(result)
    return result;
}
