interface ExecutePythonResult {
  stdout: string;
  stderr: string;
  output: string;
  code: number;
}

export async function executePython(
  code: string
): Promise<ExecutePythonResult> {
  const body = {
    language: "python",
    version: "3",
    files: [
      {
        name: "main.py",
        content: code,
      },
    ],
  };

  const resp = await fetch("https://code.conax.dev/api/v2/execute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await resp.json();

  return {
    stdout: data.run.stdout,
    stderr: data.run.stderr,
    output: data.run.output,
    code: data.run.code,
  };
}
