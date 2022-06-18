/**
 *
 * Code Editor
 *
 */

import { executePython } from "./api.js";
import type VirtualFileSystem from "./vfs.js";
import type { VirtualFile } from "./vfs.js";

interface EditorElementIdMap {
  editor: string;
  execute: string;
  output: string;
}

class Editor {
  private readonly vfs: VirtualFileSystem;
  private currentFile: VirtualFile;

  private readonly editorElem: HTMLTextAreaElement;
  private readonly executeElem: HTMLButtonElement;
  private readonly outputElem: HTMLTextAreaElement;

  private text: string;

  constructor(vfs: VirtualFileSystem, elementIds: EditorElementIdMap) {
    this.vfs = vfs;
    this.currentFile = vfs.files[0];

    this.editorElem = document.getElementById(
      elementIds.editor
    ) as HTMLTextAreaElement;
    this.executeElem = document.getElementById(
      elementIds.execute
    ) as HTMLButtonElement;
    this.outputElem = document.getElementById(
      elementIds.output
    ) as HTMLTextAreaElement;

    this.editorElem.value = "";
    this.outputElem.value = "";
    this.text = "";

    this.fileSwitchHandler();

    const editorInputHandler = this.editorInputHandler.bind(this);
    this.editorElem.addEventListener("input", editorInputHandler);

    const executeClickHandler = this.executeClickHandler.bind(this);
    this.executeElem.addEventListener("click", executeClickHandler);

    const fileSwitchHandler = this.fileSwitchHandler.bind(this);
    window.addEventListener("hashchange", fileSwitchHandler);

    const ignoreCtrlS = this.ignoreCtrlS.bind(this);
    window.addEventListener("keydown", ignoreCtrlS);
  }

  private editorInputHandler() {
    this.currentFile.content = this.editorElem.value;
  }

  private async executeClickHandler() {
    const result = await executePython(this.vfs);

    this.outputElem.value = result.output;

    if (result.code === 0) {
      this.outputElem.classList.remove("error");
    } else {
      this.outputElem.classList.add("error");
    }
  }

  private fileSwitchHandler() {
    const name = window.location.hash.slice(1);
    const file = this.vfs.getFile(name);

    if (file) {
      this.currentFile = file;
      this.editorElem.value = file.content;
    }
  }

  private ignoreCtrlS(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === "s") {
      event.preventDefault();
    }
  }
}

export default Editor;
