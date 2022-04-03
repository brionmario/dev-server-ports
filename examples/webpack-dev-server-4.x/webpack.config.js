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

const path = require("path");
const { findPort } = require("dev-server-ports");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const DEFAULT_PORT = 3000;
const HOST = "localhost";

module.exports = async (env) => {

  const IS_PRODUCTION = env.production;
  const PORT = await findPort(DEFAULT_PORT, HOST, false, {
    extensions: {
      BEFORE_getProcessTerminationMessage: () => {
        return `Read through the README.md (https://github.com/brionmario/dev-server-ports/blob/main/README.md)
file for more information.`;
      }
    }
  });

  return {
    devServer: {
      host: HOST,
      https: true,
      port: PORT,
      static: {
        directory: path.join(__dirname, "dist")
      }
    },
    devtool: IS_PRODUCTION ? "source-map" : "eval",
    entry: "./src/index.js",
    mode: IS_PRODUCTION ? "production" : "development",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist")
    },
    plugins: [
      new HtmlWebpackPlugin()
    ]
  };
};
