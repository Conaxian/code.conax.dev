type FileBarElem = HTMLDivElement;
type NewButtonElem = HTMLButtonElement;
type FileTabElem = HTMLAnchorElement;

interface FileTabOptions {
  title: string;
}

interface FileBarOptions {
  fileBarElemId: string;
  newButtonElemId: string;
}

type ButtonAction = (event: MouseEvent) => void;

export class FileTab {
  readonly tabElem: FileTabElem;

  constructor(options: FileTabOptions) {
    this.tabElem = document.createElement("a");
    this.tabElem.textContent = options.title;
    this.tabElem.href = "#" + options.title;
    this.tabElem.classList.add("tab");
  }

  get title(): string {
    return this.tabElem.textContent ?? "";
  }

  set title(newTitle: string) {
    this.tabElem.textContent = newTitle;
    this.tabElem.href = "#" + newTitle;
  }
}

class FileBar {
  readonly fileBarElem: FileBarElem;
  readonly newButtonElem: NewButtonElem;
  readonly fileTabs: FileTab[];

  private readonly newButtonActions: ButtonAction[];

  constructor(options: FileBarOptions) {
    this.fileBarElem = document.getElementById(
      options.fileBarElemId
    ) as FileBarElem;

    this.newButtonElem = document.getElementById(
      options.newButtonElemId
    ) as NewButtonElem;

    this.fileTabs = [];
    this.newButtonActions = [];

    const doNewButtonActions = this.doNewButtonActions.bind(this);
    this.newButtonElem.addEventListener("click", doNewButtonActions);
  }

  createTab(title: string) {
    const tab = new FileTab({ title });
    this.fileTabs.push(tab);

    this.newButtonElem.replaceWith(tab.tabElem);
    this.fileBarElem.append(this.newButtonElem);

    return tab;
  }

  getTab(title: string) {
    return this.fileTabs.find((tab) => tab.title === title);
  }

  deleteTab(title: string) {
    const index = this.fileTabs.findIndex((tab) => tab.title === title);
    if (index !== -1) {
      this.fileTabs[index].tabElem.remove();
      this.fileTabs.splice(index, 1);
    }
  }

  addNewButtonAction(action: ButtonAction) {
    this.newButtonActions.push(action);
  }

  removeNewButtonAction(action: ButtonAction) {
    const index = this.newButtonActions.findIndex(
      (newButtonAction) => newButtonAction === action
    );
    if (index !== -1) {
      this.newButtonActions.splice(index, 0);
    }
  }

  private doNewButtonActions(event: MouseEvent) {
    for (const action of this.newButtonActions) {
      action(event);
    }
  }
}

export default FileBar;
