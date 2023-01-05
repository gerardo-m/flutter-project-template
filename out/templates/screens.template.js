"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmptyScreen = void 0;
const changeCase = require("change-case");
function getEmptyScreen(name) {
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
exports.getEmptyScreen = getEmptyScreen;
//# sourceMappingURL=screens.template.js.map