import Editor from "./components/editor.js";
import Terminal from "./components/terminal.js";
import VirtualFileSystem from "./components/vfs.js";
import FileBar from "./components/filebar.js";
import Executor from "./components/executor.js";
import Controls from "./components/controls.js";

import type { VirtualFile, CreateFileOptions } from "./components/vfs.js";
import type { FileTab } from "./components/filebar";

interface KernelComponents {
  editor: Editor;
  terminal: Terminal;
  vfs: VirtualFileSystem;
  fileBar: FileBar;
  executor: Executor;
  controls: Controls;
}

class Kernel {
  readonly editor: Editor;
  readonly terminal: Terminal;
  readonly vfs: VirtualFileSystem;
  readonly fileBar: FileBar;
  readonly executor: Executor;
  readonly controls: Controls;

  constructor(components: KernelComponents) {
    this.editor = components.editor;
    this.terminal = components.terminal;
    this.vfs = components.vfs;
    this.fileBar = components.fileBar;
    this.executor = components.executor;
    this.controls = components.controls;

    const executeHandler = this.executeHandler.bind(this);
    this.controls.addExecuteAction(executeHandler);

    const newFileHandler = this.newFileHandler.bind(this);
    this.fileBar.addNewButtonAction(newFileHandler);

    const switchFileHandler = this.switchFileHandler.bind(this);
    window.addEventListener("hashchange", switchFileHandler);

    this.switchFileHandler();
  }

  private async executeHandler() {
    const result = await this.executor.execute(this.vfs.files);

    this.terminal.write(result.output);
    this.terminal.setStatus(result.code === 0 ? "normal" : "error");
  }

  private newFileHandler() {
    const name = prompt("Enter file name:")?.trim();

    if (name && !this.vfs.getFile(name)) {
      this.createFile({ name });
    } else if (name) {
      alert("File already exists!");
    }
  }

  createFile(options: CreateFileOptions) {
    const file = this.vfs.createFile(options);
    const tab = this.fileBar.createTab(options.name);

    const tabRenameHandler = this.tabRenameHandler.bind(this);
    tab.tabElem.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      tabRenameHandler(file, tab);
    });

    return file;
  }

  private tabRenameHandler(file: VirtualFile, tab: FileTab) {
    const name = prompt(
      "Enter new name (leave blank to delete file):",
      file.name
    )?.trim();

    if (name && !this.vfs.getFile(name)) {
      file.name = name;
      tab.title = name;
    } else if (name === "" && this.vfs.files.length <= 1) {
      alert("Cannot delete the last file!");
    } else if (name === "") {
      this.vfs.deleteFile(file.name);
      this.fileBar.deleteTab(tab.title);
    }
  }

  private switchFileHandler() {
    const name = window.location.hash.slice(1);
    const file = this.vfs.getFile(name);
    if (file) {
      this.editor.setCurrentFile(file);
    }
  }
}

export default Kernel;
