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

### TODO

- [ ] Implement Leverage selection logic
- [ ] Implement Order setting logic
- [ ] Add Notifications
- [ ] Build Depth Chart
- [ ] Build UI to view balance information across all API Keys
- [ ] Apply for and implement TradingView for chart
- [ ] Implement Position closing logic
- [ ] Build UI to view positions across all API Keys
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
