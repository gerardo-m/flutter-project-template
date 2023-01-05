import * as changeCase from "change-case";

export function getEmptyScreen(name: string): string{
  const pascalCaseName = changeCase.pascalCase(name);
  return `import 'package:flutter/material.dart';

class ${pascalCaseName}Screen extends StatelessWidget{
  const ${pascalCaseName}Screen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('${pascalCaseName}'),
      ),
      body: ListView(

      ),
    );
  }
}
  `;
}