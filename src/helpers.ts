/**
 * MIT License
 *
 * Copyright (c) 2022 Brion Mario
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import child_process, { ExecSyncOptionsWithStringEncoding } from "child_process";
import path from "path";

const execOptions: ExecSyncOptionsWithStringEncoding = {
  encoding: "utf8",
  // eslint-disable-next-line @typescript-eslint/no-array-constructor
  stdio: [
    "pipe", // stdin (default)
    "pipe", // stdout (default)
    "ignore" //stderr
  ]
};

/**
 * Clears the terminal screen.
 *
 * @example
 * Usage:
 * ```
 * // Clears the terminal.
 * clearTerminal();
 * ```
 *
 * @returns Returns a void.
 */
export const clearTerminal = (): void => {

  process.stdout.write(process.platform === "win32" ? "\x1B[2J\x1B[0f" : "\x1B[2J\x1B[3J\x1B[H");
};

/**
 * Get the process id (pid) on the given port.
 *
 * @example
 * Usage:
 * ```
 * // Returns a numeric value as a string like "55543".
 * getProcessIdOnPort(3000);
 * ```
 *
 * @param port - Port number.
 * @returns 
 */
export const getProcessIdOnPort = (port: number): string => {

  return child_process
    .execFileSync("lsof", [ "-i:" + port, "-P", "-t", "-sTCP:LISTEN" ], execOptions)
    .split("\n")[0]
    .trim();
};

/**
 * Get the directory of the process with the given id (pid).
 *
 * @param processId - Process id.
 * @returns Returns the directory of the process.
 */
export const getDirectoryOfProcessById = (processId: string): string => {

  return child_process
    .execSync("lsof -p " + processId + " | awk '$4==\"cwd\" {for (i=9; i<=NF; i++) printf \"%s \", $i}'", execOptions)
    .trim();
};

/**
 * Checks if the process is a known Node.js process.
 *
 * @param processCommand - Command ran for the process.
 * @returns Returns true if the process is a React app.
 */
const isKnownNodeProcess = (processCommand: string): boolean => {

  return /^node .*react-scripts\/scripts\/start\.js\s?$/.test(processCommand);
};

/**
 * Get the package name in the given directory.
 *
 * @param directory - Directory to search for package.json.
 * @returns Returns the package name.
 */
export const getPackageNameInDirectory = (directory: string): string | null => {

  const packagePath: string = path.join(directory.trim(), "package.json");

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(packagePath).name;
  } catch (e) {
    return null;
  }
};
