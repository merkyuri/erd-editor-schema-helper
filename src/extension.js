const vscode = require("vscode");
const DiagramEditorProvider = require("DiagramEditorProvider");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log("Congratulations, your extension is now active!");

  context.subscriptions.push(DiagramEditorProvider.register(context));
  context.subscriptions.push(
    vscode.commands.registerCommand("erd-editor-schema-helper.webview", () => {
      vscode.window.showInformationMessage(
        "Hello World from ERD Editor-Schema Helper!"
      );
      return;
    })
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
