type TerminalElem = HTMLTextAreaElement;

interface TerminalOptions {
  terminalElemId: string;
}

type TerminalStatus = "normal" | "error";

class Terminal {
  readonly terminalElem: TerminalElem;

  constructor(options: TerminalOptions) {
    this.terminalElem = document.getElementById(
      options.terminalElemId
    ) as TerminalElem;
    this.terminalElem.value = "";
  }

  write(text: string) {
    this.terminalElem.value = text;
  }

  setStatus(status: TerminalStatus) {
    if (status === "error") {
      this.terminalElem.classList.add("error");
    } else {
      this.terminalElem.classList.remove("error");
    }
  }
}

export default Terminal;
