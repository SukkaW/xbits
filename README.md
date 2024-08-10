# xbits

> Convert bytes to a human readable string: `1337` → `1.34 KiB`

Useful for displaying file sizes / traffic / bandwidth / network speed for humans.

## Install

```sh
# npm
npm install xbits
# yarn
yarn add xbits
# pnpm
pnpm add xbits
```

## Usage

**createPrettyBits**

```js
import { createPrettyBits, prettyBitsPresets } from 'xbits';

const prettyTraffic = createPrettyBits(prettyBitsPresets.traffic);
// You can also import `prettyTraffic` directly from `xbits`:
// import { prettyTraffic } from 'xbits';

const prettyBandwidth = createPrettyBits(prettyBitsPresets.bandwidth);
// You can also import `prettyBandwidth` directly from `xbits`:
// import { prettyBandwidth } from 'xbits';

// You can also create your own formatter function using custom presets:
const pretty = createPrettyBits({
  bits: false,
  binary: false,
  speed: false,
  largeK: true
});

pretty(42);

pretty(0xd000721, {
  space: true,
  signed: false,
  minimumFractionDigits: undefined,
  maximumFractionDigits: undefined,
});
```

**prettyBits**

```js
import { prettyBits } from 'xbits';

prettyBits(42);

prettyBits(0721, {
  bits: false,
  binary: false,
  speed: false,
  largeK: true,
  space: true,
  signed: false,
  minimumFractionDigits: undefined,
  maximumFractionDigits: undefined,
  locale: undefined
});
```

## Differences with `pretty-bytes`

- `xbits` prefers uppercase `K` instead of `k` in units (still configurable via `largeK` option).
- `xbits` supports `speed` option (`KB/s`, `GiB/s`, `Mbps`, etc.).
- `xbits` has first-party supports for network traffic and bandwidth.

---

**xbits** © [Sukka](https://github.com/SukkaW), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by Sukka with help from contributors ([list](https://github.com/SukkaW/xbits/graphs/contributors)).

> [Personal Website](https://skk.moe) · [Blog](https://blog.skk.moe) · GitHub [@SukkaW](https://github.com/SukkaW) · Telegram Channel [@SukkaChannel](https://t.me/SukkaChannel) · Mastodon [@sukka@acg.mn](https://acg.mn/@sukka) · Twitter [@isukkaw](https://twitter.com/isukkaw) · Keybase [@sukka](https://keybase.io/sukka)

<p align="center">
  <a href="https://github.com/sponsors/SukkaW/">
    <img src="https://sponsor.cdn.skk.moe/sponsors.svg"/>
  </a>
</p>
