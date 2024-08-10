# pretty-bits

> Convert bytes to a human readable string: `1337` → `1.34 KiB`

Useful for displaying file sizes / traffic / bandwidth / network speed for humans.

## Install

```sh
# npm
npm install pretty-bits
# yarn
yarn add pretty-bits
# pnpm
pnpm add pretty-bits
```

## Usage

**createPrettyBits**

```js
import { createPrettyBits, prettyBitsPresets } from 'pretty-bits';

const prettyTraffic = createPrettyBits(prettyBitsPresets.traffic);
// You can also import `prettyTraffic` directly from `pretty-bits`:
// import { prettyTraffic } from 'pretty-bits';

const prettyBandwidth = createPrettyBits(prettyBitsPresets.bandwidth);
// You can also import `prettyBandwidth` directly from `pretty-bits`:
// import { prettyBandwidth } from 'pretty-bits';

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
import { prettyBits } from 'pretty-bits';

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

- `pretty-bits` prefers uppercase `K` instead of `k` in units (still configurable via `largeK` option).
- `pretty-bits` supports `speed` option (`KB/s`, `GiB/s`, `Mbps`, etc.).
- `pretty-bits` has first-party supports for network traffic and bandwidth.

---

**pretty-bits** © [Sukka](https://github.com/SukkaW), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by Sukka with help from contributors ([list](https://github.com/SukkaW/pretty-bits/graphs/contributors)).

> [Personal Website](https://skk.moe) · [Blog](https://blog.skk.moe) · GitHub [@SukkaW](https://github.com/SukkaW) · Telegram Channel [@SukkaChannel](https://t.me/SukkaChannel) · Mastodon [@sukka@acg.mn](https://acg.mn/@sukka) · Twitter [@isukkaw](https://twitter.com/isukkaw) · Keybase [@sukka](https://keybase.io/sukka)

<p align="center">
  <a href="https://github.com/sponsors/SukkaW/">
    <img src="https://sponsor.cdn.skk.moe/sponsors.svg"/>
  </a>
</p>
