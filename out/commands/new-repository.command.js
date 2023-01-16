"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newFirestoreRepository = exports.newRepository = void 0;
const vscode_1 = require("vscode");
const changeCase = require("change-case");
const fs_1 = require("fs");
const fileUtils = require("../utils/file-utils");
const repositoryTemplates = require("../templates/repositories.template");
const pluralize = require('pluralize');
const newRepository = async () => {
    if (vscode_1.workspace.workspaceFolders === undefined) {
        return;
    }
    const projectName = vscode_1.workspace.workspaceFolders[0].name;
    var newRepositoryName = await getRepositoryName();
    if (newRepositoryName === undefined) {
        return;
    }
    await createRepositoryFile(newRepositoryName, "", repositoryTemplates.getBaseRepositoryContent(projectName, newRepositoryName));
};
exports.newRepository = newRepository;
const newFirestoreRepository = async () => {
    if (vscode_1.workspace.workspaceFolders === undefined) {
        return;
    }
    const projectName = vscode_1.workspace.workspaceFolders[0].name;
    var newRepositoryName = await getRepositoryName();
    if (newRepositoryName === undefined) {
        return;
    }
    await createRepositoryFile(newRepositoryName, "_firestore", repositoryTemplates.getFirestoreRepositoryContent(projectName, newRepositoryName));
};
exports.newFirestoreRepository = newFirestoreRepository;
function getRepositoryName() {
    const newRepositoryNamePromptOptions = {
        prompt: "Repository Name",
        placeHolder: "User",
    };
    return vscode_1.window.showInputBox(newRepositoryNamePromptOptions);
}
async function createRepositoryFile(repositoryName, repositorySuffix, content) {
    const newRepositoryName = pluralize(changeCase.snakeCase(repositoryName));
    const newRepositoryDirectory = `${vscode_1.workspace.workspaceFolders[0].uri.fsPath}/lib/repositories${repositorySuffix}`;
    if (!(0, fs_1.existsSync)(newRepositoryDirectory)) {
        await fileUtils.createDirectory(newRepositoryDirectory);
    }
    const newRepositoryFilePath = `${newRepositoryDirectory}/${newRepositoryName}_repository${repositorySuffix}.dart`;
    return fileUtils.createFile(newRepositoryFilePath, content);
}
//# sourceMappingURL=new-repository.command.js.map