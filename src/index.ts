const BIBYTE_UNITS = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
const BIBYTE_SPEED_UNITS = ['B/s', 'KiB/s', 'MiB/s', 'GiB/s', 'TiB/s', 'PiB/s', 'EiB/s', 'ZiB/s', 'YiB/s'];

const BIBIT_UNITS = ['b', 'kibit', 'Mibit', 'Gibit', 'Tibit', 'Pibit', 'Eibit', 'Zibit', 'Yibit'];
const BIBIT_SPEED_UNITS = ['b/s', 'kib/s', 'Mib/s', 'Gib/s', 'Tib/s', 'Pib/s', 'Eib/s', 'Zib/s', 'Yib/s'];

const BIT_UNITS = ['b', 'kbit', 'Mbit', 'Gbit', 'Tbit', 'Pbit', 'Ebit', 'Zbit', 'Ybit'];
const BIT_SPEED_UNITS = ['bps', 'kbps', 'Mbps', 'Gbps', 'Tbps', 'Pbps', 'Ebps', 'Zbps', 'Ybps'];

const BYTE_UNITS = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const BYTE_SPEED_UNITS = ['B/s', 'kB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s'];

const makeLargeK = (units: string[]) => {
  const results = units.slice();
  results[1] = 'K' + results[1].slice(1);
  return results;
};

const makeLargeKTuple = (units: string[]): { y: string[], n: string[] } => ({
  y: makeLargeK(units),
  n: units
});

const UNITS_TABLE = {
  /** bits: true */
  y: {
    /** binary: true */
    y: {
      y: makeLargeKTuple(BIBIT_SPEED_UNITS),
      n: makeLargeKTuple(BIBIT_UNITS)
    },
    /** binary: false */
    n: {
      y: makeLargeKTuple(BIT_SPEED_UNITS),
      n: makeLargeKTuple(BIT_UNITS)
    }
  },
  /** bits: false */
  n: {
    /** binary: true */
    y: {
      y: makeLargeKTuple(BIBYTE_SPEED_UNITS),
      n: makeLargeKTuple(BIBYTE_UNITS)
    },
    /** binary: false */
    n: {
      y: makeLargeKTuple(BYTE_SPEED_UNITS),
      n: makeLargeKTuple(BYTE_UNITS)
    }
  }

} as const;

const toLocaleString = (number: number, locale?: Intl.LocalesArgument | boolean, options?: Intl.NumberFormatOptions) => {
  if (locale === true || options !== undefined) {
    return number.toLocaleString(undefined, options);
  }
  if (typeof locale === 'string' || Array.isArray(locale)) {
    return number.toLocaleString(locale, options);
  }
  return number.toString();
};

interface PrettyBitsPreset {
  /**
    Format the number as [bits](https://en.wikipedia.org/wiki/Bit) instead of [bytes](https://en.wikipedia.org/wiki/Byte). This can be useful when, for example, referring to [bit rate](https://en.wikipedia.org/wiki/Bit_rate).

    @default false

    @example
    ```
    import prettyBits from 'pretty-bits';

    prettyBits(1337, {bits: true});
    //=> '1.34 kbit'
    ```
    */
  readonly bits?: boolean,

  /**
    Format the number using the [Binary Prefix](https://en.wikipedia.org/wiki/Binary_prefix) instead of the [SI Prefix](https://en.wikipedia.org/wiki/SI_prefix). This can be useful for presenting memory amounts. However, this should not be used for presenting file sizes.

    @default false

    @example
    ```
    import prettyBits from 'pretty-bits';

    prettyBits(1000, {binary: true});
    //=> '1000 bit'

    prettyBits(1024, {binary: true});
    //=> '1 kiB'
    ```
    */
  readonly binary?: boolean,

  /**
   Format the number as a speed per second (bytes/s, bits/s).

   @default false
   */
  readonly speed?: boolean,

  /**
     Whether to use kB/s, kbps or KiB/s, Kibps.

     @default false
     */
  readonly largeK?: boolean
}

interface PrettyBitsOptions {
  /**
    Include plus sign for positive numbers. If the difference is exactly zero a space character will be prepended instead for better alignment.

    @default false
    */
  readonly signed?: boolean,

  /**
    - If `false`: Output won't be localized.
    - If `true`: Localize the output using the system/browser locale.
    - If `string`: Expects a [BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) (For example: `en`, `de`, …)
    - If `string[]`: Expects a list of [BCP 47 language tags](https://en.wikipedia.org/wiki/IETF_language_tag) (For example: `en`, `de`, …)

    @default false
    */
  readonly locale?: boolean | Intl.LocalesArgument,

  /**
    The minimum number of fraction digits to display.

    If neither `minimumFractionDigits` or `maximumFractionDigits` are set, the default behavior is to round to 3 significant digits.

    @default undefined

    @example
    ```
    import prettyBits from 'pretty-bits';

    // Show the number with at least 3 fractional digits
    prettyBits(1900, {minimumFractionDigits: 3});
    //=> '1.900 kB'

    prettyBits(1900);
    //=> '1.9 kB'
    ```
    */
  readonly minimumFractionDigits?: number,

  /**
    The maximum number of fraction digits to display.

    If neither `minimumFractionDigits` or `maximumFractionDigits` are set, the default behavior is to round to 3 significant digits.

    @default undefined

    @example
    ```
    import prettyBits from 'pretty-bits';

    // Show the number with at most 1 fractional digit
    prettyBits(1920, {maximumFractionDigits: 1});
    //=> '1.9 kB'

    prettyBits(1920);
    //=> '1.92 kB'
    ```
    */
  readonly maximumFractionDigits?: number,

  /**
    Put a space between the number and unit.

    @default true

    @example
    ```
    import prettyBits from 'pretty-bits';

    prettyBits(1920, {space: false});
    //=> '1.9kB'

    prettyBits(1920);
    //=> '1.92 kB'
    ```
    */
  readonly space?: boolean
};

export const prettyBitsPresets = {
  bandwidth: { bits: true, binary: false, speed: true, largeK: true } satisfies PrettyBitsPreset,
  traffic: { bits: false, binary: true, speed: false, largeK: true } satisfies PrettyBitsPreset,
  darwin_storage: { bits: false, binary: false, speed: false, largeK: true } satisfies PrettyBitsPreset
} as const;

const bool = (value: boolean) => (value ? 'y' : 'n');

export function createPrettyBits({
  bits = false,
  binary = false,
  speed = false,
  largeK = true
}: PrettyBitsPreset = {}) {
  const UNITS = UNITS_TABLE[bool(bits)][bool(binary)][bool(speed)][bool(largeK)];

  return function prettyBits(
    number: number,
    {
      space = true,
      signed = false,
      minimumFractionDigits,
      maximumFractionDigits,
      locale
    }: PrettyBitsOptions = {}
  ) {
    if (!Number.isFinite(number)) {
      throw new TypeError(`Expected a finite number, got ${typeof number}: ${number}`);
    }

    const separator = space ? ' ' : '';

    if (signed && number === 0) {
      return ` 0${separator}${UNITS[0]}`;
    }

    const isNegative = number < 0;
    const prefix = isNegative ? '-' : (signed ? '+' : '');

    if (isNegative) {
      number = -number;
    }

    let localeOptions;

    if (minimumFractionDigits !== undefined) {
      localeOptions = { minimumFractionDigits };
    }

    if (maximumFractionDigits !== undefined) {
      localeOptions = { maximumFractionDigits, ...localeOptions };
    }

    if (number < 1) {
      const numberString = toLocaleString(number, locale, localeOptions);
      return prefix + numberString + separator + UNITS[0];
    }

    const exponent = Math.min(Math.floor(binary ? Math.log(number) / Math.log(1024) : Math.log10(number) / 3), UNITS.length - 1);
    number /= (binary ? 1024 : 1000) ** exponent;

    let numberOrString: number | string = number;
    if (!localeOptions) {
      numberOrString = number.toPrecision(3);
    }

    numberOrString = toLocaleString(Number(numberOrString), locale, localeOptions);

    const unit = UNITS[exponent];

    return prefix + numberOrString + separator + unit;
  };
}

export const prettyBits = (number: number, options: PrettyBitsOptions & PrettyBitsPreset = {}) => {
  const {
    bits, binary, speed, largeK,
    space, signed, minimumFractionDigits, maximumFractionDigits, locale
  } = options;

  return createPrettyBits({
    bits,
    binary,
    speed,
    largeK
  })(number, {
    signed,
    space,
    minimumFractionDigits,
    maximumFractionDigits,
    locale
  });
};
export const prettyBandwidth = createPrettyBits(prettyBitsPresets.bandwidth);
export const prettyTraffic = createPrettyBits(prettyBitsPresets.traffic);
