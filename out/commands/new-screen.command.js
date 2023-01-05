"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newScreen = void 0;
const vscode_1 = require("vscode");
const changeCase = require("change-case");
const screenTemplates = require("../templates/screens.template");
const fileUtils = require("../utils/file-utils");
const fs_1 = require("fs");
const newScreen = async () => {
    var newScreenName = await getScreenName();
    if (newScreenName === undefined) {
        return;
    }
    await createScreenFile(newScreenName);
    await addScreenToBarrelFile(newScreenName);
};
exports.newScreen = newScreen;
function getScreenName() {
    const newScreenNamePromptOptions = {
        prompt: "Screen Name",
        placeHolder: "Home",
    };
    return vscode_1.window.showInputBox(newScreenNamePromptOptions);
}
async function createScreenFile(screenName) {
    const newScreenName = changeCase.snakeCase(screenName);
    const newScreenDirectory = `${vscode_1.workspace.workspaceFolders[0].uri.fsPath}/lib/views/${newScreenName}`;
    if (!(0, fs_1.existsSync)(newScreenDirectory)) {
        await fileUtils.createDirectory(newScreenDirectory);
    }
    const newScreenFilePath = `${newScreenDirectory}/${newScreenName}_screen.dart`;
    return fileUtils.createFile(newScreenFilePath, screenTemplates.getEmptyScreen(screenName));
}
async function addScreenToBarrelFile(screenName) {
    const snakeScreenName = changeCase.snakeCase(screenName);
    const viewsBarrelFilePath = `${vscode_1.workspace.workspaceFolders[0].uri.fsPath}/lib/views/views.dart`;
    const newScreenExportLine = `
export '${snakeScreenName}/${snakeScreenName}_screen.dart';`;
    return fileUtils.addToFile(viewsBarrelFilePath, newScreenExportLine);
}
//# sourceMappingURL=new-screen.command.js.map