"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
const fileUtils = require("../utils/file-utils");
const template = require("../templates/setup.template");
const fs_1 = require("fs");
const vscode_1 = require("vscode");
const setup = async () => {
    if (vscode_1.workspace.workspaceFolders === undefined) {
        return;
    }
    const projectName = vscode_1.workspace.workspaceFolders[0].name;
    await createHomeScreen(projectName);
    await createViewsBarrelFile();
    await createUtilsDirectory();
    await createRoutesFile(projectName);
    await createRouteHandlingFile(projectName);
    await createThemeFile(projectName);
    await createDiFile();
    await modifyMainFile(projectName);
    await modifyPubspecFile(projectName);
};
exports.setup = setup;
async function createHomeScreen(projectName) {
    const homeScreenDirectory = `${vscode_1.workspace.workspaceFolders[0].uri.fsPath}/lib/views/home`;
    //console.log(viewsDirectory);
    if (!(0, fs_1.existsSync)(homeScreenDirectory)) {
        await fileUtils.createDirectory(homeScreenDirectory);
    }
    const homePagePath = `${homeScreenDirectory}/home_screen.dart`;
    return fileUtils.createFile(homePagePath, template.getHomeScreenContent(projectName));
}
async function createViewsBarrelFile() {
    const viewsBarrelFilePath = `${vscode_1.workspace.workspaceFolders[0].uri.fsPath}/lib/views/views.dart`;
    return fileUtils.createFile(viewsBarrelFilePath, template.getViewsBarrelFileContent());
}
async function createUtilsDirectory() {
    const utilsDirectory = `${vscode_1.workspace.workspaceFolders[0].uri.fsPath}/lib/utils`;
    if (!(0, fs_1.existsSync)(utilsDirectory)) {
        return fileUtils.createDirectory(utilsDirectory);
    }
}
async function createRoutesFile(projectName) {
    const routesFilePath = `${vscode_1.workspace.workspaceFolders[0].uri.fsPath}/lib/utils/routes.dart`;
    return fileUtils.createFile(routesFilePath, template.getRoutesFileContent(projectName));
}
async function createRouteHandlingFile(projectName) {
    const routeHandlingFilePath = `${vscode_1.workspace.workspaceFolders[0].uri.fsPath}/lib/utils/route_handling.dart`;
    return fileUtils.createFile(routeHandlingFilePath, template.getRouteHandlingFileContent(projectName));
}
async function createThemeFile(projectName) {
    const themeFilePath = `${vscode_1.workspace.workspaceFolders[0].uri.fsPath}/lib/utils/theme.dart`;
    return fileUtils.createFile(themeFilePath, template.getThemeFileContent(projectName));
}
async function createDiFile() {
    const diFilePath = `${vscode_1.workspace.workspaceFolders[0].uri.fsPath}/lib/dependency_injection.dart`;
    return fileUtils.createFile(diFilePath, template.getDiFileContent());
}
async function modifyMainFile(projectName) {
    const mainFilePath = `${vscode_1.workspace.workspaceFolders[0].uri.fsPath}/lib/main.dart`;
    return fileUtils.createFile(mainFilePath, template.getMainFileContent(projectName));
}
async function modifyPubspecFile(projectName) {
    const pubspecFilePath = `${vscode_1.workspace.workspaceFolders[0].uri.fsPath}/pubspec.yaml`;
    return fileUtils.createFile(pubspecFilePath, template.getPubspecFileContent(projectName));
}
//# sourceMappingURL=setup.command.js.map