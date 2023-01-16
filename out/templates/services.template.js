"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseServiceContent = void 0;
const changeCase = require("change-case");
const pluralize = require('pluralize');
function getBaseServiceContent(projectName, name) {
    const pluralizedName = pluralize(name);
    const snakeName = changeCase.snakeCase(name);
    const pluralizedPascalName = changeCase.pascalCase(pluralizedName);
    return `import 'package:${projectName}/models/${snakeName}.dart';

class ${pluralizedPascalName}Service{

  ${pluralizedPascalName}Service._();

  factory ${pluralizedPascalName}Service() {
    return ${pluralizedPascalName}Service._();
  }
}`;
}
exports.getBaseServiceContent = getBaseServiceContent;
//# sourceMappingURL=services.template.js.map