# Dev Server Ports

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) version `>=12.0.0` is required. ([Inquirer.js](https://github.com/SBoudrias/Inquirer.js) version used in the isn't compatible with lower node versions.)

## API Reference

### `findPort`

```js
import { findPort } from "dev-server-ports";

findPort(hostname: string, prefferedPort: string);
```

#### Returns

A `Promise` of type `number`.
