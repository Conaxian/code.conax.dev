type ExecuteElem = HTMLButtonElement;

interface ControlsOptions {
  executeElemId: string;
}

type ButtonAction = (event: MouseEvent) => void;

class Controls {
  readonly executeElem: ExecuteElem;

  private readonly executeActions: ButtonAction[];

  constructor(options: ControlsOptions) {
    this.executeElem = document.getElementById(
      options.executeElemId
    ) as ExecuteElem;

    this.executeActions = [];

    const doExecuteActions = this.doExecuteActions.bind(this);
    this.executeElem.addEventListener("click", doExecuteActions);
  }

  addExecuteAction(action: ButtonAction) {
    this.executeActions.push(action);
  }

  removeExecuteAction(action: ButtonAction) {
    const index = this.executeActions.findIndex(
      (executeAction) => executeAction === action
    );
    if (index !== -1) {
      this.executeActions.splice(index, 0);
    }
  }

  private doExecuteActions(event: MouseEvent) {
    for (const action of this.executeActions) {
      action(event);
    }
  }
}

export default Controls;
