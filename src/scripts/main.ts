import Editor from "./editor.js";
import VirtualFileSystem from "./vfs.js";

const vfs = new VirtualFileSystem({ topBar: "topbar", newButton: "new" });

const editor = new Editor(vfs, {
  editor: "editor",
  execute: "execute",
  output: "output",
});
