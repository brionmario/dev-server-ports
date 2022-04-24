import child_process from 'child_process';
import path from 'path';
import readline from 'readline';
import detect from 'detect-port';
import inquirer from 'inquirer';
import isRoot from 'is-root';
import { __decorate } from 'tslib';
import chalk from 'chalk';

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
// Reserved well-known ports that require sudo permissions.
var WELL_KNOWN_PORT_RANGE = [0, 1024];

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
var Reporter = /*#__PURE__*/function () {
  /**
   * Constructor.
   * @param extensions - Extensions.
   * @param overrides - Overrides.
   */
  function Reporter(extensions, overrides) {
    Reporter.extensions = extensions;
    Reporter.overrides = overrides;
  }
  /**
   * Get the root permission required message
   *
   * @param wellknownPortRange - Range of reserved wellknown ports.
   * @returns Returns a formatted root permission required message as a string.
   */


  var _proto = Reporter.prototype;

  _proto.getMissingRootPermissionMessage = function getMissingRootPermissionMessage(wellknownPortRange) {
    return chalk.redBright("Admin permissions are required to run a server on a port below " + wellknownPortRange[1] + ".");
  }
  /**
   * Get the process information report.
   *
   * @param process - Process info.
   * @returns Returns a formatted process info report as a string.
   */
  ;

  _proto.getProcessInfoReport = function getProcessInfoReport(process) {
    return "\n    process       : " + chalk.cyan(process.command) + "\n    pid           : " + chalk.grey(process.pid) + "\n    invoked from  : " + chalk.blue(process.directory);
  }
  /**
   * Get the port in use disclaimer message.
   *
   * @param port - Port which the server is running on.
   * @returns Returns a formatted port in use disclaimer message as a string.
   */
  ;

  _proto.getPortInUseDisclaimerMessage = function getPortInUseDisclaimerMessage(port) {
    return chalk.bgRedBright(chalk.whiteBright("PORT IN USE")) + " " + chalk.white("-") + " Someone is already using the port " + chalk.bold(chalk.yellowBright(port)) + ".";
  }
  /**
   * Get the port fallback confirmarion message.
   *
   * @param availablePorts - Available ports.
   * @returns Returns a formatted port fallback prompt message as a string.
   */
  ;

  _proto.getNonePortFallbackMessage = function getNonePortFallbackMessage(availablePorts) {
    return "\n" + chalk.yellowBright("If possible, free up the port or choose an avaiable one.") + "\n\nThe following " + (availablePorts.length > 1 ? "ports are" : "port is") + " available:\n\n        " + chalk.green(availablePorts.join("\n")) + "\n\n" + this.getProcessTerminationMessage();
  }
  /**
   * Get the port fallback confirmation message.
   *
   * @returns Returns a formatted port fallback confirmation message as a string.
   */
  ;

  _proto.getPortFallbackConfirmation = function getPortFallbackConfirmation() {
    return "Would you like to run the app on another port instead?";
  }
  /**
   * Build and print the port fallback confirmarion message.
   *
   * @param port - Requested Port.
   * @param availablePort - Aavailable port.
   * @param isInteractive - Should show port fallback confirmation on the prompt.
   * @returns Returns a formatted port in use prompt as a string.
   */
  ;

  _proto.buildPortInUsePromptMessage = function buildPortInUsePromptMessage(port, availablePort, isInteractive) {
    var _getProcessForPort = getProcessForPort(port),
        command = _getProcessForPort.command,
        directory = _getProcessForPort.directory,
        pid = _getProcessForPort.pid;

    var confirmation = isInteractive ? this.getPortFallbackConfirmation() : this.getNonePortFallbackMessage([availablePort]);
    return this.getPortInUseDisclaimerMessage(port) + "\n    " + this.getProcessInfoReport({
      command: command,
      directory: directory,
      pid: pid
    }) + "\n    \n" + confirmation;
  }
  /**
   * Get the un-interative terminal error message.
   *
   * @returns Returns un-interative terminal error message as a string.
   */
  ;

  _proto.getUnInteractiveTerminalError = function getUnInteractiveTerminalError() {
    return chalk.red("Prompt couldn't be rendered in the current environment.");
  }
  /**
   * Get the generic prompt error message.
   *
   * @returns Returns a generic prompt error message as a string.
   */
  ;

  _proto.getGenericPromptError = function getGenericPromptError() {
    return chalk.red("Something wen wrong when trying to render the prompt.");
  }
  /**
   * Get no open port on host error message.
   *
   * @param hostname - Host.
   * @param error - Error object.
   * @returns Returns no open port on host error message as string.
   */
  ;

  _proto.getOpenPortUnAvailablityOnHost = function getOpenPortUnAvailablityOnHost(hostname, error) {
    return chalk.red("Could not find an open port at " + chalk.bold(hostname) + ".") + "\n\n              (Network error message: " + (error.message || error) + ")\n    }";
  }
  /**
   * Get process termination message.
   *
   * @returns Returns a message containing process termination info.
   */
  ;

  _proto.getProcessTerminationMessage = function getProcessTerminationMessage() {
    return "" + chalk.white("Press ctrl/cmd + c to exit.");
  };

  return Reporter;
}();

__decorate([override(), extend()], Reporter.prototype, "getMissingRootPermissionMessage", null);

__decorate([override(), extend()], Reporter.prototype, "getProcessInfoReport", null);

__decorate([override(), extend()], Reporter.prototype, "getPortInUseDisclaimerMessage", null);

__decorate([override(), extend()], Reporter.prototype, "getNonePortFallbackMessage", null);

__decorate([override(), extend()], Reporter.prototype, "getPortFallbackConfirmation", null);

__decorate([override(), extend()], Reporter.prototype, "buildPortInUsePromptMessage", null);

__decorate([override(), extend()], Reporter.prototype, "getUnInteractiveTerminalError", null);

__decorate([override(), extend()], Reporter.prototype, "getGenericPromptError", null);

__decorate([override(), extend()], Reporter.prototype, "getOpenPortUnAvailablityOnHost", null);

__decorate([override(), extend()], Reporter.prototype, "getProcessTerminationMessage", null);
/**
 * Override decorator.
 *
 * @returns Returns the result of the execution.
 */


function override() {
  return function (_target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;

    descriptor.value = function () {
      var _this$constructor;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = originalMethod.apply(this, args);

      if ((_this$constructor = this.constructor) != null && _this$constructor.overrides && Object.prototype.hasOwnProperty.call(this.constructor.overrides, propertyKey)) {
        result = this.constructor.overrides[propertyKey].apply(this, args);
      }

      return result;
    };
  };
}
/**
 * Extension decorator.
 *
 * @returns Returns the result of the execution.
 */


function extend() {
  return function (_target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;

    descriptor.value = function () {
      var _this$constructor2;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var result = originalMethod.apply(this, args);

      if ((_this$constructor2 = this.constructor) != null && _this$constructor2.extensions) {
        if (Object.prototype.hasOwnProperty.call(this.constructor.extensions, "BEFORE_" + propertyKey)) {
          result = this.constructor.extensions["BEFORE_" + propertyKey].apply(this, args) + "\n\n" + result;
        }

        if (Object.prototype.hasOwnProperty.call(this.constructor.extensions, "AFTER_" + propertyKey)) {
          result = result + "\n\n" + this.constructor.extensions["AFTER_" + propertyKey].apply(this, args);
        }
      }

      return result;
    };
  };
}

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

/* eslint-disable no-console */
var logger = {
  debug: console.debug,
  error: console.error,
  info: console.log
};
/* eslint-disable no-console */

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

var IS_INTERACTIVE = process.stdout.isTTY;
var execOptions = {
  encoding: "utf8",
  // eslint-disable-next-line @typescript-eslint/no-array-constructor
  stdio: ["pipe", "pipe", "ignore" //stderr
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

var clearTerminal = function clearTerminal() {
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

var getProcessIdOnPort = function getProcessIdOnPort(port) {
  return child_process.execFileSync("lsof", ["-i:" + port, "-P", "-t", "-sTCP:LISTEN"], execOptions).split("\n")[0].trim();
};
/**
 * Get the directory of the process with the given id (pid).
 *
 * @param processId - Process id.
 * @returns Returns the directory of the process.
 */

var getDirectoryOfProcessById = function getDirectoryOfProcessById(processId) {
  return child_process.execSync("lsof -p " + processId + " | awk '$4==\"cwd\" {for (i=9; i<=NF; i++) printf \"%s \", $i}'", execOptions).trim();
};
/**
 * Checks if the process is a known Node.js process.
 *
 * @param processCommand - Command ran for the process.
 * @returns Returns true if the process is a React app.
 */

var isKnownNodeProcess = function isKnownNodeProcess(processCommand) {
  return /^node .*react-scripts\/scripts\/start\.js\s?$/.test(processCommand);
};
/**
 * Get the package name in the given directory.
 *
 * @param directory - Directory to search for package.json.
 * @returns Returns the package name.
 */


var getPackageNameInDirectory = function getPackageNameInDirectory(directory) {
  var packagePath = path.join(directory.trim(), "package.json");

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(packagePath).name;
  } catch (e) {
    return null;
  }
};
/**
 * Get the command ran for the process with the given id (pid).
 *
 * @param processId - Process id.
 * @param processDirectory - Directory of the process.
 * @returns Returns the command ran for the process.
 */

var getProcessCommand = function getProcessCommand(processId, processDirectory) {
  var command = child_process.execSync("ps -o command -p " + processId + " | sed -n 2p", execOptions);
  command = command.replace(/\n$/, ""); // If thr process is a known Node.js process, get the package name from `package.json`.

  if (isKnownNodeProcess(command)) {
    var packageName = getPackageNameInDirectory(processDirectory);
    return packageName ? packageName : command;
  } else {
    return command;
  }
};
/**
 * Get the process information for the given port.
 *
 * @param port - Port number.
 * @returns Returns the process information or null.
 */

var getProcessForPort = function getProcessForPort(port) {
  try {
    var pid = getProcessIdOnPort(port);
    var directory = getDirectoryOfProcessById(pid);
    var command = getProcessCommand(pid, directory);
    return {
      command: command,
      directory: directory,
      pid: pid
    };
  } catch (e) {
    return {
      command: undefined,
      directory: undefined,
      pid: undefined
    };
  }
};
/**
 * Shows a message without any interactions and exits the process on `ctrl+c`.
 * @param message - Message to show.
 */

var showNonInteractivePrompt = function showNonInteractivePrompt(message) {
  logger.info(message);
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on("keypress", function (str) {
    if (str === "\x03") {
      process.exit();
    }
  });
};
/**
 * Find a port that is available for use.
 *
 * @param port - Preffered port number. ex: 3000
 * @param hostname - Host name. ex: "0.0.0.0" | "localhost"
 * @param reporter - Reporter overrides and extensions.
 * @returns Returns a promise that resolves to the available port or null on error.
 */


var findPort = function findPort(port, hostname, shouldFallback, reporter) {
  var _port = typeof port === "number" ? port : parseInt(port, 10);

  var _reporter = new Reporter(reporter == null ? void 0 : reporter.extensions, reporter == null ? void 0 : reporter.overrides);

  return detect({
    hostname: hostname,
    port: _port
  }).then(function (availablePort) {
    return new Promise(function (resolve) {
      if (availablePort === _port) {
        return resolve(availablePort);
      }

      var needSudoPermissions = process.platform !== "win32" && (_port < WELL_KNOWN_PORT_RANGE[1] || availablePort < WELL_KNOWN_PORT_RANGE[1]) && !isRoot();
      var question = {
        "default": true,
        message: _reporter.buildPortInUsePromptMessage(_port, availablePort, shouldFallback),
        name: "shouldChangePort",
        type: "confirm"
      }; // If the port needs permission to run, show a message & terminate on ctrl + c.

      if (needSudoPermissions) {
        showNonInteractivePrompt(_reporter.getMissingRootPermissionMessage(WELL_KNOWN_PORT_RANGE));
        return;
      }

      if (IS_INTERACTIVE) {
        // First clear the terminal.
        clearTerminal();

        if (shouldFallback === false) {
          showNonInteractivePrompt(question.message);
        } else {
          inquirer.prompt([question]).then(function (answers) {
            if (answers.shouldChangePort) {
              resolve(availablePort);
            } else {
              process.exit();
            }
          })["catch"](function (error) {
            if (error.isTtyError) {
              _reporter.getUnInteractiveTerminalError();
            } else {
              _reporter.getGenericPromptError();
            }
          });
        }
      } else {
        showNonInteractivePrompt(question.message);
      }
    });
  }, function (err) {
    throw new Error(_reporter.getOpenPortUnAvailablityOnHost(hostname, err));
  });
};

export { clearTerminal, findPort, getDirectoryOfProcessById, getPackageNameInDirectory, getProcessCommand, getProcessForPort, getProcessIdOnPort };
//# sourceMappingURL=dev-server-ports.esm.js.map
