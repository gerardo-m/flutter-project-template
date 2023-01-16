"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newService = void 0;
const vscode_1 = require("vscode");
const changeCase = require("change-case");
const fs_1 = require("fs");
const fileUtils = require("../utils/file-utils");
const serviceTemplates = require("../templates/services.template");
const pluralize = require('pluralize');
const newService = async () => {
    if (vscode_1.workspace.workspaceFolders === undefined) {
        return;
    }
    const projectName = vscode_1.workspace.workspaceFolders[0].name;
    var newServiceName = await getServiceName();
    if (newServiceName === undefined) {
        return;
    }
    await createServiceFile(newServiceName, serviceTemplates.getBaseServiceContent(projectName, newServiceName));
};
exports.newService = newService;
function getServiceName() {
    const newServiceNamePromptOptions = {
        prompt: "Service Name",
        placeHolder: "User",
    };
    return vscode_1.window.showInputBox(newServiceNamePromptOptions);
}
async function createServiceFile(serviceName, content) {
    const newServiceName = pluralize(changeCase.snakeCase(serviceName));
    const newServiceDirectory = `${vscode_1.workspace.workspaceFolders[0].uri.fsPath}/lib/services`;
    if (!(0, fs_1.existsSync)(newServiceDirectory)) {
        await fileUtils.createDirectory(newServiceDirectory);
    }
    const newServiceFilePath = `${newServiceDirectory}/${newServiceName}_service.dart`;
    return fileUtils.createFile(newServiceFilePath, content);
}
//# sourceMappingURL=new-service.commands.js.map