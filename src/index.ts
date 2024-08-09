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

const UNITS_TABLE = {
  /** bits: true */
  true: {
    /** binary: true */
    true: {
      true: {
        true: makeLargeK(BIBIT_SPEED_UNITS),
        false: BIBIT_SPEED_UNITS
      },
      false: {
        true: makeLargeK(BIBIT_UNITS),
        false: BIBIT_UNITS
      }
    },
    /** binary: false */
    false: {
      true: {
        true: makeLargeK(BIT_SPEED_UNITS),
        false: BIT_SPEED_UNITS
      },
      false: {
        true: makeLargeK(BIT_UNITS),
        false: BIT_UNITS
      }
    }
  },
  /** bits: false */
  false: {
    /** binary: true */
    true: {
      true: {
        true: BIBYTE_SPEED_UNITS, // ignore large K here
        false: BIBYTE_SPEED_UNITS
      },
      false: {
        true: BIBYTE_UNITS, // ignore large K here
        false: BIBYTE_UNITS
      }
    },
    /** binary: false */
    false: {
      true: {
        true: makeLargeK(BYTE_SPEED_UNITS),
        false: BYTE_SPEED_UNITS
      },
      false: {
        true: makeLargeK(BYTE_UNITS),
        false: BYTE_UNITS
      }
    }
  }

} as const;

const toLocaleString = (number: number, locale?: Intl.LocalesArgument | boolean, options?: Intl.NumberFormatOptions) => {
  if (locale === false || locale === undefined) {
    return number.toString();
  }
  if (locale === true) {
    return number.toLocaleString(undefined, options);
  }
  return number.toLocaleString(undefined, options);
};

interface PrettyBytesPreset {
  /**
    Format the number as [bits](https://en.wikipedia.org/wiki/Bit) instead of [bytes](https://en.wikipedia.org/wiki/Byte). This can be useful when, for example, referring to [bit rate](https://en.wikipedia.org/wiki/Bit_rate).

    @default false

    @example
    ```
    import prettyBytes from 'pretty-bytes';

    prettyBytes(1337, {bits: true});
    //=> '1.34 kbit'
    ```
    */
  readonly bits?: boolean,

  /**
    Format the number using the [Binary Prefix](https://en.wikipedia.org/wiki/Binary_prefix) instead of the [SI Prefix](https://en.wikipedia.org/wiki/SI_prefix). This can be useful for presenting memory amounts. However, this should not be used for presenting file sizes.

    @default false

    @example
    ```
    import prettyBytes from 'pretty-bytes';

    prettyBytes(1000, {binary: true});
    //=> '1000 bit'

    prettyBytes(1024, {binary: true});
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

interface PrettyBytesOptions {
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
    import prettyBytes from 'pretty-bytes';

    // Show the number with at least 3 fractional digits
    prettyBytes(1900, {minimumFractionDigits: 3});
    //=> '1.900 kB'

    prettyBytes(1900);
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
    import prettyBytes from 'pretty-bytes';

    // Show the number with at most 1 fractional digit
    prettyBytes(1920, {maximumFractionDigits: 1});
    //=> '1.9 kB'

    prettyBytes(1920);
    //=> '1.92 kB'
    ```
    */
  readonly maximumFractionDigits?: number,

  /**
    Put a space between the number and unit.

    @default true

    @example
    ```
    import prettyBytes from 'pretty-bytes';

    prettyBytes(1920, {space: false});
    //=> '1.9kB'

    prettyBytes(1920);
    //=> '1.92 kB'
    ```
    */
  readonly space?: boolean
};

export const prettyBytesPresets = {
  bandwidth: { bits: true, binary: false, speed: true, largeK: true } satisfies PrettyBytesPreset,
  traffic: { bits: false, binary: true, speed: false, largeK: true } satisfies PrettyBytesPreset,
  darwin_storage: { bits: false, binary: false, speed: false, largeK: true } satisfies PrettyBytesPreset
} as const;

const bool = (value: boolean) => (value ? 'true' : 'false');

export function createPrettyBytes({
  bits = false,
  binary = false,
  speed = false,
  largeK = true
}: PrettyBytesPreset) {
  const UNITS = UNITS_TABLE[bool(bits)][bool(binary)][bool(speed)][bool(largeK)];

  return function prettyBytes(
    number: number,
    {
      space = true,
      signed = false,
      minimumFractionDigits,
      maximumFractionDigits,
      locale
    }: PrettyBytesOptions = {}
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

    let localeOptions: Intl.NumberFormatOptions | undefined;
    if (minimumFractionDigits !== undefined || maximumFractionDigits !== undefined) {
      localeOptions = {
        ...(minimumFractionDigits !== undefined && { minimumFractionDigits }),
        ...(maximumFractionDigits !== undefined && { maximumFractionDigits })
      };
    }

    if (number < 1) {
      const numberString = toLocaleString(number, locale, localeOptions);
      return prefix + numberString + separator + UNITS[0];
    }

    const exponent = Math.min(Math.floor(binary ? Math.log(number) / Math.log(1024) : Math.log10(number) / 3), UNITS.length - 1);
    number /= (binary ? 1024 : 1000) ** exponent;

    if (!localeOptions) {
      number = Number(number.toPrecision(3));
    }

    const numberString = toLocaleString(number, locale, localeOptions);

    const unit = UNITS[exponent];

    return prefix + numberString + separator + unit;
  };
}

export const prettyBandwidth = createPrettyBytes(prettyBytesPresets.bandwidth);
export const prettyTraffic = createPrettyBytes(prettyBytesPresets.traffic);
