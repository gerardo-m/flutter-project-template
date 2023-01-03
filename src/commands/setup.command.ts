import * as fileUtils from "../utils/file-utils";
import * as template from "../templates/setup.template";
import { existsSync, lstatSync, writeFile } from "fs";
import {
  // InputBoxOptions,
  // OpenDialogOptions,
  // Uri,
  // window,
  workspace,
  // env,
} from "vscode";

export const setup = async () => {
  if (workspace.workspaceFolders === undefined){
    return;
  }
  const projectName = workspace.workspaceFolders[0].name;
  await createHomeScreen(projectName);

  await createUtilsDirectory();
  await createRoutesFile(projectName);
  await createRouteHandlingFile(projectName);
  await createThemeFile(projectName);
  await createDiFile();

  await modifyMainFile(projectName);
  await modifyPubspecFile(projectName);
};

async function createHomeScreen(projectName: string) : Promise<void>{
  const homeScreenDirectory = `${workspace.workspaceFolders![0].uri.fsPath}/lib/views/home`;
  //console.log(viewsDirectory);
  if (!existsSync(homeScreenDirectory)){
    await fileUtils.createDirectory(homeScreenDirectory);
  }

  const homePagePath = `${homeScreenDirectory}/home_screen.dart`;
  return fileUtils.createFile(homePagePath, template.getHomeScreenContent(projectName));
}

async function createUtilsDirectory(): Promise<void> {
  const utilsDirectory = `${workspace.workspaceFolders![0].uri.fsPath}/lib/utils`;
  if (!existsSync(utilsDirectory)){
    return fileUtils.createDirectory(utilsDirectory);
  }
}

async function createRoutesFile(projectName: string): Promise<void>{
  const routesFilePath = `${workspace.workspaceFolders![0].uri.fsPath}/lib/utils/routes.dart`;
  return fileUtils.createFile(routesFilePath, template.getRoutesFileContent(projectName));
}

async function createRouteHandlingFile(projectName: string): Promise<void> {
  const routeHandlingFilePath = `${workspace.workspaceFolders![0].uri.fsPath}/lib/utils/route_handling.dart`;
  return fileUtils.createFile(routeHandlingFilePath, template.getRouteHandlingFileContent(projectName));
}

async function createThemeFile(projectName: string): Promise<void> {
  const themeFilePath = `${workspace.workspaceFolders![0].uri.fsPath}/lib/utils/theme.dart`;
  return fileUtils.createFile(themeFilePath, template.getThemeFileContent(projectName));
}

async function createDiFile(): Promise<void> {
  const diFilePath = `${workspace.workspaceFolders![0].uri.fsPath}/lib/dependency_injection.dart`;
  return fileUtils.createFile(diFilePath, template.getDiFileContent());
}

async function modifyMainFile(projectName: string) : Promise<void> {
  const mainFilePath = `${workspace.workspaceFolders![0].uri.fsPath}/lib/main.dart`;
  return fileUtils.createFile(mainFilePath, template.getMainFileContent(projectName));
}

async function modifyPubspecFile(projectName: string): Promise<void> {
  const pubspecFilePath = `${workspace.workspaceFolders![0].uri.fsPath}/pubspec.yaml`;
  return fileUtils.createFile(pubspecFilePath, template.getPubspecFileContent(projectName));
}

