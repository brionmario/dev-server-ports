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

import chalk from "chalk";

export class Reporter {

  /**
   * Private constructor to prevent instantiation.
   */
  private constructor() { }

  /**
   * Prints the root permission required message.
   *
   * @returns Returns a formatted root permission required message as a string.
   */
  public static reportRequireRootPermission(): string {
    return chalk.redBright("Admin permissions are required to run a server on a port below 1024.");
  }

  /**
   * Prints the process information.
   *
   * @param command - Command which started the process.
   * @param pid - Process id.
   * @param directory - Directory which initiated the process.
   * @returns Returns a formatted process info as a string.
   */
  public static reportProcessInfo(command: string, pid: string, directory: string): string {
    return `
    process       : ${ chalk.cyan(command) }
    pid           : ${ chalk.grey(pid)}
    invoked from  : ${ chalk.blue(directory) }`;
  }

  /**
   * Prints the port in use disclaimer message.
   *
   * @param port - Port which the server is running on.
   * @returns Returns a formatted port in use message as a string.
   */
  public static reportPortInUseDisclaimer(port: number): string {

    return `${ chalk.bgRedBright(chalk.whiteBright("PORT IN USE")) } ${
      chalk.white("-" )
    } Someone is already using the port ${ port }.`;
  }

  /**
   * Prints the port fallback confirmarion message.
   *
   * @returns Returns a formatted port fallback prompt message as a string.
   */
  public static reportPortFallbackConfirmation(): string {

    return "Would you like to run the app on another port instead?";
  }

  /**
   * Prints the port fallback confirmarion message.
   *
   * @returns Returns a formatted port fallback prompt message as a string.
   */
  public static reportPortInUse(disclaimer: string, processInfo: string | null, question: string): string {

    return `${ disclaimer }
    ${ processInfo }
    
    ${ question }`;
  }

  /**
   * Prints the port fallback confirmarion message.
   *
   * @returns Returns a formatted port fallback prompt message as a string.
   */
  public static reportUninteractiveTerminalError(): string {

    return chalk.red("Prompt couldn't be rendered in the current environment.");
  }

  /**
   * Prints the port fallback confirmarion message.
   *
   * @returns Returns a formatted port fallback prompt message as a string.
   */
  public static reportGenericPromptError(): string {

    return chalk.red("Something wen wrong when trying to render the prompt.");
  }

  public static reportOpenPortUnAvailablityOnHost(hostname: string | undefined, error: Error): string {
    return `${ chalk.red(`Could not find an open port at ${ chalk.bold(hostname) }.`) }

              (Network error message: ${ error.message || error })
    }`;
  }
}
