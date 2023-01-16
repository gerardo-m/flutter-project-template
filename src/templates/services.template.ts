import * as changeCase from "change-case";
const pluralize = require('pluralize');

export function getBaseServiceContent(projectName: string, name: string): string{
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