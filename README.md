<p align="center">
<img src="https://i.ibb.co/SwL7g9r/logo.png" width="128px" height="128px" alt="logo" border="0" />
</p>

<div align="center">
  <h1>MexMan</h1>
</div>
<p align="center">The Unofficial BitMEX Desktop Client</p>

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

![Animated Preview](https://raw.githubusercontent.com/sayedhfatimi/MexMan/master/src/renderer/public/images/preview.gif)

## Progress

### Done

- [x] Build UI
- [x] Build Store
- [x] Add Websocket logic
- [x] Add Websocket message parser
- [x] Add Orderbook
- [x] Add Recent Trades
- [x] Add Ticker Strip
- [x] Add electron event handlers for auth request
- [x] Add Ability to add/remove API Keys
- [x] Add function to validate API Key
- [x] Add Ticker List
- [x] Add ability to customize terminal
- [x] Add Wallet
- [x] Build UI to view balance information across all API Keys
- [x] Build UI to view positions across all API Keys

### TODO

- [ ] Implement Leverage selection logic
- [ ] Implement Order setting logic
- [ ] Add Notifications
- [ ] Build Depth Chart
- [ ] Apply for and implement TradingView for chart
- [ ] Implement Position closing logic
- [ ] Auto Build binaries in release for Windows/Mac/Linux
- [ ] Improve performance in react render process when dragging/resizing components

## Development Setup

### Install

```bash
$ pnpm install
```

### Development

```bash
$ pnpm dev
```

### Production Build

```bash
$ pnpm build

$ pnpm start
```

### Build Executable

```bash
$ pnpm make
```

## License

```
MIT License

Copyright (c) 2024 Sayed Hamid Fatimi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
