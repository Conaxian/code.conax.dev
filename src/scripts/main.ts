import Kernel from "./kernel.js";
import Editor from "./components/editor.js";
import Terminal from "./components/terminal.js";
import VirtualFileSystem from "./components/vfs.js";
import FileBar from "./components/filebar.js";
import Executor from "./components/executor.js";
import Controls from "./components/controls.js";

const INITIAL_FILE_NAME = "main.py";

const vfs = new VirtualFileSystem();

const executor = new Executor();

const editor = new Editor({
  editorElemId: "editor",
  currentFile: vfs.files[0],
});

const terminal = new Terminal({ terminalElemId: "terminal" });

const fileBar = new FileBar({
  fileBarElemId: "filebar",
  newButtonElemId: "new",
});

const controls = new Controls({ executeElemId: "execute" });

const kernel = new Kernel({
  editor,
  terminal,
  vfs,
  fileBar,
  executor,
  controls,
});

const file = kernel.createFile({ name: INITIAL_FILE_NAME });
editor.setCurrentFile(file);
