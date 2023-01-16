import * as changeCase from "change-case";
const pluralize = require('pluralize');

export function getBaseRepositoryContent(projectName: string, name: string): string{
  const pascalName = changeCase.pascalCase(name);
  const snakeName = changeCase.snakeCase(name);
  const camelName = changeCase.camelCase(name);
  const pluralizedName = pluralize(name);
  const pluralizedPascalName = changeCase.pascalCase(pluralizedName);
  return `import 'package:${projectName}/models/${snakeName}.dart';
  
abstract class ${pluralizedPascalName}Repository{

  Future<${pascalName}?> get${pascalName}(String id);
  Future<${pascalName}?> create${pascalName}(${pascalName} ${camelName}, {bool generateId = true});
  Future<${pascalName}?> update${pascalName}(${pascalName} ${camelName});
  Future<void> delete${pascalName}(String ${camelName}Id);
  Future<List<${pascalName}>> get${pluralizedPascalName}By(String fieldName, dynamic fieldValue);
}`;
}

export function getFirestoreRepositoryContent(projectName: string, name: string): string{
  const pascalName = changeCase.pascalCase(name);
  const snakeName = changeCase.snakeCase(name);
  const camelName = changeCase.camelCase(name);
  const pluralizedName = pluralize(name);
  const pluralizedPascalName = changeCase.pascalCase(pluralizedName);
  const pluralizedSnakeName = changeCase.snakeCase(pluralizedName);
  const pluralizedCamelName = changeCase.camelCase(pluralizedName);
  return `import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:${projectName}/models/${snakeName}.dart';
import 'package:${projectName}/repositories/${pluralizedSnakeName}_repository.dart';

class ${pluralizedPascalName}RepositoryFirestore extends ${pluralizedPascalName}Repository{

  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  static const _collectionName = '${pluralizedSnakeName}';

  @override
  Future<${pascalName}?> get${pascalName}(String id) async{
    DocumentSnapshot<Map<String, dynamic>> snapshot = await _${pluralizedCamelName}Collection.doc(id).get();
    Map<String, dynamic>? ${camelName}Data = snapshot.data();
    if (${camelName}Data != null){
      return ${pascalName}.fromMap(${camelName}Data);
    }
    return null;
  }
  
  @override
  Future<${pascalName}?> create${pascalName}(${pascalName} ${camelName}, {bool generateId = true}) async{
    Map<String, dynamic> ${camelName}Data = ${camelName}.toMap();
    if (generateId){
      DocumentReference docRef = await _${pluralizedCamelName}Collection.add(${camelName}Data);
      ${camelName}.id = docRef.id;
    }else{
      await _${pluralizedCamelName}Collection.doc(${camelName}.id).set(${camelName}Data);
    }
    return ${camelName};
  }
  
  @override
  Future<void> delete${pascalName}(String ${camelName}Id) async{
    return await _${pluralizedCamelName}Collection.doc(${camelName}Id).delete();
  }
  
  @override
  Future<List<${pascalName}>> get${pluralizedPascalName}By(String fieldName, fieldValue) async{
    List<${pascalName}> result = [];
    QuerySnapshot<Map<String, dynamic>> snapshot = await _${pluralizedCamelName}Collection.where(fieldName, isEqualTo: fieldValue).get();
    for(QueryDocumentSnapshot<Map<String, dynamic>> doc in snapshot.docs){
      ${pascalName} ${camelName} = ${pascalName}.fromMap(doc.data());
      result.add(${camelName});
    }
    return result;
  }
  
  @override
  Future<${pascalName}?> update${pascalName}(${pascalName} ${camelName}) async{
    Map<String, dynamic> ${camelName}Data = ${camelName}.toMap();
    await _${pluralizedCamelName}Collection.doc(${camelName}.id).set(${camelName}Data);
    return ${camelName};
  }

  CollectionReference<Map<String, dynamic>> get _${pluralizedCamelName}Collection => _firestore.collection(_collectionName);
  
}`;
}