import { InputBoxOptions, window, workspace } from "vscode";
import * as changeCase from "change-case";
import { existsSync } from "fs";
import * as fileUtils from "../utils/file-utils";
import * as repositoryTemplates from "../templates/repositories.template";

const pluralize = require('pluralize');

export const newRepository = async () => {
  if (workspace.workspaceFolders === undefined) {
    return;
  }
  const projectName = workspace.workspaceFolders[0].name;
  var newRepositoryName = await getRepositoryName();
  if (newRepositoryName === undefined) { return; }
  await createRepositoryFile(newRepositoryName, "", repositoryTemplates.getBaseRepositoryContent(projectName, newRepositoryName));
};

export const newFirestoreRepository = async () => {
  if (workspace.workspaceFolders === undefined) {
    return;
  }
  const projectName = workspace.workspaceFolders[0].name;
  var newRepositoryName = await getRepositoryName();
  if (newRepositoryName === undefined) { return; }
  await createRepositoryFile(newRepositoryName, "_firestore", repositoryTemplates.getFirestoreRepositoryContent(projectName, newRepositoryName));
};

function getRepositoryName(): Thenable<string | undefined> {
  const newRepositoryNamePromptOptions: InputBoxOptions = {
    prompt: "Repository Name",
    placeHolder: "User",
  };
  return window.showInputBox(newRepositoryNamePromptOptions);
}

async function createRepositoryFile(repositoryName: string, repositorySuffix: string, content: string): Promise<void> {
  const newRepositoryName = pluralize(changeCase.snakeCase(repositoryName));
  const newRepositoryDirectory = `${workspace.workspaceFolders![0].uri.fsPath}/lib/repositories${repositorySuffix}`;
  if (!existsSync(newRepositoryDirectory)) {
    await fileUtils.createDirectory(newRepositoryDirectory);
  }
  const newRepositoryFilePath = `${newRepositoryDirectory}/${newRepositoryName}_repository${repositorySuffix}.dart`;
  return fileUtils.createFile(newRepositoryFilePath, content);
}