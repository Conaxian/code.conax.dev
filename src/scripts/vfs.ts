/**
 *
 * Virtual File System
 *
 */

type VirtualFileType = "python";

interface VFSElementIdMap {
  topBar: string;
  newButton: string;
}

export interface VirtualFile {
  name: string;
  type: VirtualFileType;
  content: string;
  tab: HTMLAnchorElement;
}

class VirtualFileSystem {
  private readonly topBarElem: HTMLDivElement;
  private readonly newButtonElem: HTMLButtonElement;
  readonly files: VirtualFile[];

  constructor(elementIds: VFSElementIdMap) {
    this.topBarElem = document.getElementById(
      elementIds.topBar
    ) as HTMLDivElement;
    this.newButtonElem = document.getElementById(
      elementIds.newButton
    ) as HTMLButtonElement;

    this.files = [];
    this.addFile({ name: "main.py" });

    this.newButtonElem.addEventListener("click", () => {
      const name = prompt("Enter file name:")?.trim();

      if (name && !this.getFile(name)) {
        this.addFile({ name });
      }
    });
  }

  createTab(title: string) {
    const tabElem = document.createElement("a");
    tabElem.textContent = title;
    return tabElem;
  }

  addFile(fileData: { name: string }) {
    const fileTab = this.createTab(fileData.name);

    fileTab.classList.add("tab");
    fileTab.href = "#" + fileData.name;

    const file: VirtualFile = {
      name: fileData.name,
      type: "python",
      content: "",
      tab: fileTab,
    };

    fileTab.addEventListener("contextmenu", (event) => {
      event.preventDefault();

      const name = prompt(
        "Enter new name (keep blank to delete file):",
        file.name
      )?.trim();

      if (name && !this.getFile(name)) {
        this.renameFile(file, name);
      } else if (name === "" && this.files.length <= 1) {
        alert("Cannot delete last file!");
      } else if (name === "") {
        this.removeFile(file);
      }
    });

    this.files.push(file);

    this.topBarElem.replaceChild(fileTab, this.newButtonElem);
    this.topBarElem.append(this.newButtonElem);
  }

  getFile(name: string) {
    return this.files.find((file) => file.name === name);
  }

  renameFile(file: VirtualFile, newName: string) {
    file.name = newName;
    file.tab.textContent = newName;
  }

  removeFile(file: VirtualFile) {
    const index = this.files.indexOf(file);
    if (index !== -1) {
      this.files.splice(index, 1);
    }
    this.topBarElem.removeChild(file.tab);
  }
}

export default VirtualFileSystem;
