import { executePython } from "./api.js";

interface EditorElementIdMap {
  editor: string;
  execute: string;
  output: string;
}

class Editor {
  private readonly editorElem: HTMLTextAreaElement;
  private readonly executeElem: HTMLButtonElement;
  private readonly outputElem: HTMLTextAreaElement;

  private text: string;

  constructor(elementIds: EditorElementIdMap) {
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

    const editorInputHandler = this.editorInputHandler.bind(this);
    this.editorElem.addEventListener("input", editorInputHandler);

    const executeClickHandler = this.executeClickHandler.bind(this);
    this.executeElem.addEventListener("click", executeClickHandler);
  }

  private editorInputHandler() {
    this.text = this.editorElem.value;
  }

  private async executeClickHandler() {
    const result = await executePython(this.text);

    this.outputElem.value = result.output;

    if (result.code === 0) {
      this.outputElem.classList.remove("error");
    } else {
      this.outputElem.classList.add("error");
    }
  }
}

export default Editor;
