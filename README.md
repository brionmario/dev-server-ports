# Dev Server Ports

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## API Reference

### `findPort`

```js
import { findPort } from "dev-server-ports";

findPort(hostname: string, prefferedPort: string);
```

#### Returns

A `Promise` of type `number`.
