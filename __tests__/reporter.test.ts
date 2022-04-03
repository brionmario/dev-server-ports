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

import { WELL_KNOWN_PORT_RANGE } from "../src/constants";
import { Reporter } from "../src/reporter";

describe("Test the reporter class functions works fine.", () => {

  it("Get correct messages for no arg constructor.", async () => {
 
    const reporter = new Reporter();

    const message: string = reporter.getMissingRootPermissionMessage(WELL_KNOWN_PORT_RANGE);

    expect(message)
      .toMatch("Admin permissions are required to run a server on a port below 1024.");
  });

  it("Get correct messages for constructor with overrides.", async () => {
 
    const reporter = new Reporter(undefined, {
      getMissingRootPermissionMessage() {
        return "Custom Root Permission Override Message.";
      }
    });

    const message: string = reporter.getMissingRootPermissionMessage(WELL_KNOWN_PORT_RANGE);

    expect(message)
      .toMatch("Custom Root Permission Override Message.");
  });

  // TODO: Mock chalk.
  it.skip("Get correct messages for constructor with extensions.", async () => {
 
    const reporter = new Reporter({
      BEFORE_getMissingRootPermissionMessage: () => {
        return "Custom Root Permission Message BEFORE extension.";
      }
    } as any, undefined);

    const message: string = reporter.getMissingRootPermissionMessage(WELL_KNOWN_PORT_RANGE);

    expect(message)
      .toMatch(`Custom Root Permission Message BEFORE extension.

Admin permissions are required to run a server on a port below 1024.`);
  });
});
