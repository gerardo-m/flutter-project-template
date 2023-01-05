import { InputBoxOptions, window, workspace } from "vscode";
import * as changeCase from "change-case";
import * as screenTemplates from "../templates/screens.template";
import * as fileUtils from "../utils/file-utils";
import { existsSync } from "fs";

export const newScreen = async () => {
  var newScreenName = await getScreenName();
  if (newScreenName === undefined) {return;}
  await createScreenFile(newScreenName);
  await addScreenToBarrelFile(newScreenName);
};

function getScreenName(): Thenable<string | undefined>{
  const newScreenNamePromptOptions: InputBoxOptions = {
    prompt: "Screen Name",
    placeHolder: "Home",
  };
  return window.showInputBox(newScreenNamePromptOptions);
}

async function createScreenFile(screenName: string): Promise<void>{
  const newScreenName = changeCase.snakeCase(screenName);
  const newScreenDirectory = `${workspace.workspaceFolders![0].uri.fsPath}/lib/views/${newScreenName}`;
  if (!existsSync(newScreenDirectory)){
    await fileUtils.createDirectory(newScreenDirectory);
  }
  const newScreenFilePath = `${newScreenDirectory}/${newScreenName}_screen.dart`;
  return fileUtils.createFile(newScreenFilePath, screenTemplates.getEmptyScreen(screenName));
}

async function addScreenToBarrelFile(screenName: string): Promise<void>{
  const snakeScreenName = changeCase.snakeCase(screenName);
  const viewsBarrelFilePath = `${workspace.workspaceFolders![0].uri.fsPath}/lib/views/views.dart`;
  const newScreenExportLine = `
export '${snakeScreenName}/${snakeScreenName}_screen.dart';`;
  return fileUtils.addToFile(viewsBarrelFilePath, newScreenExportLine);
}