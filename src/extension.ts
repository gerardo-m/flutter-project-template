// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, ExtensionContext, window, languages, workspace } from "vscode";
import { setup, newScreen } from "./commands";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "flutter-project-template" is now active!');

	context.subscriptions.push(
    commands.registerCommand('flutter-project-template.setup', setup),
    commands.registerCommand('flutter-project-template.new-screen', newScreen),
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
