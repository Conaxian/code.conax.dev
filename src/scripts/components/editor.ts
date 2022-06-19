import type { VirtualFile } from "./vfs.js";

type EditorElem = HTMLTextAreaElement;

interface EditorOptions {
  editorElemId: string;
  currentFile: VirtualFile;
}

class Editor {
  readonly editorElem: EditorElem;

  currentFile: VirtualFile;

  constructor(options: EditorOptions) {
    this.editorElem = document.getElementById(
      options.editorElemId
    ) as EditorElem;
    this.editorElem.value = "";

    this.currentFile = options.currentFile;

    const inputHandler = this.inputHandler.bind(this);
    this.editorElem.addEventListener("input", inputHandler);

    const preventCtrlS = this.preventCtrlS.bind(this);
    this.editorElem.addEventListener("keydown", preventCtrlS);
  }

  private inputHandler() {
    this.currentFile.content = this.editorElem.value;
  }

  private preventCtrlS(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === "s") {
      event.preventDefault();
    }
  }

  setCurrentFile(file: VirtualFile) {
    this.currentFile = file;
    this.editorElem.value = file.content;
  }
}

export default Editor;
