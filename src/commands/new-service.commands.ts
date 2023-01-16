import { InputBoxOptions, window, workspace } from "vscode";
import * as changeCase from "change-case";
import { existsSync } from "fs";
import * as fileUtils from "../utils/file-utils";
import * as serviceTemplates from "../templates/services.template";

const pluralize = require('pluralize');

export const newService = async () => {
  if (workspace.workspaceFolders === undefined) {
    return;
  }
  const projectName = workspace.workspaceFolders[0].name;
  var newServiceName = await getServiceName();
  if (newServiceName === undefined) { return; }
  await createServiceFile(newServiceName, serviceTemplates.getBaseServiceContent(projectName, newServiceName));
};

function getServiceName(): Thenable<string | undefined> {
  const newServiceNamePromptOptions: InputBoxOptions = {
    prompt: "Service Name",
    placeHolder: "User",
  };
  return window.showInputBox(newServiceNamePromptOptions);
}

async function createServiceFile(serviceName: string, content: string): Promise<void>{
  const newServiceName = pluralize(changeCase.snakeCase(serviceName));
  const newServiceDirectory = `${workspace.workspaceFolders![0].uri.fsPath}/lib/services`;
  if (!existsSync(newServiceDirectory)) {
    await fileUtils.createDirectory(newServiceDirectory);
  }
  const newServiceFilePath = `${newServiceDirectory}/${newServiceName}_service.dart`;
  return fileUtils.createFile(newServiceFilePath, content);
}