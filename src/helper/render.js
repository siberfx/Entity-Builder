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
    let template = Template[file.FileType.templateName];
    if (file.FileType.template) {
        template = file.FileType.template;
    }
    const result = nunjucks.renderString(template, data);
    // console.log(result)
    return result;
}
