/**
 *
 * https://code.conax.dev/api/v2/execute
 *
 */

import type VirtualFileSystem from "./vfs.js";

const API_URL = "https://code.conax.dev/api/v2/execute";

interface ExecutePythonResult {
  stdout: string;
  stderr: string;
  output: string;
  code: number;
}

export async function executePython(
  vfs: VirtualFileSystem
): Promise<ExecutePythonResult> {
  const files = vfs.files.map((file) => ({
    name: file.name,
    content: file.content,
    encoding: "utf8",
  }));

  const body = {
    language: "python",
    version: "3",
    files,
  };

  const resp = await fetch(API_URL, {
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
