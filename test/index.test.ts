import { describe, it } from 'mocha';
import { expect } from 'earl';
import {
  prettyBandwidth, prettyBits, prettyTraffic,
  bits, bytes, ibits,
  ibytes,
  bps
} from '../src';

describe('xbits', () => {
  it('converts bytes to human readable strings', () => {
    expect(prettyBits(0)).toEqual('0 B');
    expect(prettyBits(0.4)).toEqual('0.4 B');
    expect(prettyBits(0.7)).toEqual('0.7 B');
    expect(prettyBits(10)).toEqual('10 B');
    expect(prettyBits(10.1)).toEqual('10.1 B');
    expect(prettyBits(999)).toEqual('999 B');
    expect(prettyBits(1001)).toEqual('1 KB');
    expect(prettyBits(1e16)).toEqual('10 PB');
    expect(prettyBits(1e30)).toEqual('1000000 YB');
  });

  it('supports negative number', () => {
    expect(prettyBits(-0.4)).toEqual('-0.4 B');
    expect(prettyBits(-0.7)).toEqual('-0.7 B');
    expect(prettyBits(-10.1)).toEqual('-10.1 B');
    expect(prettyBits(-999)).toEqual('-999 B');
    expect(prettyBits(-1001)).toEqual('-1 KB');
  });

  it('locale option', () => {
    expect(prettyBits(-0.4, { locale: 'de' })).toEqual('-0,4 B');
    expect(prettyBits(0.4, { locale: 'de' })).toEqual('0,4 B');
    expect(prettyBits(1001, { locale: 'de' })).toEqual('1 KB');
    expect(prettyBits(10.1, { locale: 'de' })).toEqual('10,1 B');
    expect(prettyBits(1e30, { locale: 'de' })).toEqual('1.000.000 YB');

    expect(prettyBits(-0.4, { locale: 'en' })).toEqual('-0.4 B');
    expect(prettyBits(0.4, { locale: 'en' })).toEqual('0.4 B');
    expect(prettyBits(1001, { locale: 'en' })).toEqual('1 KB');
    expect(prettyBits(10.1, { locale: 'en' })).toEqual('10.1 B');
    expect(prettyBits(1e30, { locale: 'en' })).toEqual('1,000,000 YB');

    expect(prettyBits(-0.4, { locale: ['unknown', 'de', 'en'] })).toEqual('-0,4 B');
    expect(prettyBits(0.4, { locale: ['unknown', 'de', 'en'] })).toEqual('0,4 B');
    expect(prettyBits(1001, { locale: ['unknown', 'de', 'en'] })).toEqual('1 KB');
    expect(prettyBits(10.1, { locale: ['unknown', 'de', 'en'] })).toEqual('10,1 B');
    expect(prettyBits(1e30, { locale: ['unknown', 'de', 'en'] })).toEqual('1.000.000 YB');

    expect(prettyBits(-0.4, { locale: true })).toEqual('-0.4 B');
    expect(prettyBits(0.4, { locale: true })).toEqual('0.4 B');
    expect(prettyBits(1001, { locale: true })).toEqual('1 KB');
    expect(prettyBits(10.1, { locale: true })).toEqual('10.1 B');
    expect(prettyBits(1e30, { locale: true })).toEqual('1,000,000 YB');

    expect(prettyBits(-0.4, { locale: false })).toEqual('-0.4 B');
    expect(prettyBits(0.4, { locale: false })).toEqual('0.4 B');
    expect(prettyBits(1001, { locale: false })).toEqual('1 KB');
    expect(prettyBits(10.1, { locale: false })).toEqual('10.1 B');
    expect(prettyBits(1e30, { locale: false })).toEqual('1000000 YB');

    expect(prettyBits(-0.4, { locale: undefined })).toEqual('-0.4 B');
    expect(prettyBits(0.4, { locale: undefined })).toEqual('0.4 B');
    expect(prettyBits(1001, { locale: undefined })).toEqual('1 KB');
    expect(prettyBits(10.1, { locale: undefined })).toEqual('10.1 B');
    expect(prettyBits(1e30, { locale: undefined })).toEqual('1000000 YB');
  });

  it('signed option', () => {
    expect(prettyBits(42, { signed: true })).toEqual('+42 B');
    expect(prettyBits(-13, { signed: true })).toEqual('-13 B');
    expect(prettyBits(0, { signed: true })).toEqual(' 0 B');
  });

  it('bits option', () => {
    expect(prettyBits(0, { bits: true })).toEqual('0 b');
    expect(prettyBits(0.4, { bits: true })).toEqual('0.4 b');
    expect(prettyBits(0.7, { bits: true })).toEqual('0.7 b');
    expect(prettyBits(10, { bits: true })).toEqual('10 b');
    expect(prettyBits(10.1, { bits: true })).toEqual('10.1 b');
    expect(prettyBits(999, { bits: true })).toEqual('999 b');
    expect(prettyBits(1001, { bits: true })).toEqual('1 Kbit');
    expect(prettyBits(1e16, { bits: true })).toEqual('10 Pbit');
    expect(prettyBits(1e30, { bits: true })).toEqual('1000000 Ybit');
  });

  it('binary option', () => {
    expect(prettyBits(0, { binary: true })).toEqual('0 B');
    expect(prettyBits(4, { binary: true })).toEqual('4 B');
    expect(prettyBits(10, { binary: true })).toEqual('10 B');
    expect(prettyBits(10.1, { binary: true })).toEqual('10.1 B');
    expect(prettyBits(999, { binary: true })).toEqual('999 B');
    expect(prettyBits(1025, { binary: true })).toEqual('1 KiB');
    expect(prettyBits(1001, { binary: true })).toEqual('1000 B');
    expect(prettyBits(1e16, { binary: true })).toEqual('8.88 PiB');
    expect(prettyBits(1e30, { binary: true })).toEqual('827000 YiB');
  });

  it('bits and binary option', () => {
    expect(prettyBits(0, { bits: true, binary: true })).toEqual('0 b');
    expect(prettyBits(4, { bits: true, binary: true })).toEqual('4 b');
    expect(prettyBits(10, { bits: true, binary: true })).toEqual('10 b');
    expect(prettyBits(999, { bits: true, binary: true })).toEqual('999 b');
    expect(prettyBits(1025, { bits: true, binary: true })).toEqual('1 Kibit');
    expect(prettyBits(1e6, { bits: true, binary: true })).toEqual('977 Kibit');
  });

  it('fractional digits options', () => {
    expect(prettyBits(1900, { maximumFractionDigits: 1 })).toEqual('1.9 KB');
    expect(prettyBits(1900, { minimumFractionDigits: 3 })).toEqual('1.900 KB');
    expect(prettyBits(1911, { maximumFractionDigits: 1 })).toEqual('1.9 KB');
    expect(prettyBits(1111, { maximumFractionDigits: 2 })).toEqual('1.11 KB');
    expect(prettyBits(1019, { maximumFractionDigits: 3 })).toEqual('1.019 KB');
    expect(prettyBits(1001, { maximumFractionDigits: 3 })).toEqual('1.001 KB');
    expect(prettyBits(1000, { minimumFractionDigits: 1, maximumFractionDigits: 3 })).toEqual('1.0 KB');
    expect(prettyBits(3942, { minimumFractionDigits: 1, maximumFractionDigits: 2 })).toEqual('3.94 KB');
    expect(prettyBits(59_952_784, { maximumFractionDigits: 1 })).toEqual('60 MB');
    expect(prettyBits(59_952_784, { minimumFractionDigits: 1, maximumFractionDigits: 1 })).toEqual('60.0 MB');
    expect(prettyBits(4001, { maximumFractionDigits: 3, binary: true })).toEqual('3.907 KiB');
    expect(prettyBits(18717, { maximumFractionDigits: 2, binary: true })).toEqual('18.28 KiB');
    expect(prettyBits(18717, { maximumFractionDigits: 4, binary: true })).toEqual('18.2783 KiB');
    expect(prettyBits(32768, { minimumFractionDigits: 2, maximumFractionDigits: 3, binary: true })).toEqual('32.00 KiB');
    expect(prettyBits(65536, { minimumFractionDigits: 1, maximumFractionDigits: 3, binary: true })).toEqual('64.0 KiB');
  });

  it('space option', () => {
    expect(prettyBits(0)).toEqual('0 B');
    expect(prettyBits(0, { space: false })).toEqual('0B');
    expect(prettyBits(999)).toEqual('999 B');
    expect(prettyBits(999, { space: false })).toEqual('999B');
    expect(prettyBits(-13, { signed: true })).toEqual('-13 B');
    expect(prettyBits(-13, { signed: true, space: false })).toEqual('-13B');
    expect(prettyBits(42, { signed: true })).toEqual('+42 B');
    expect(prettyBits(42, { signed: true, space: false })).toEqual('+42B');
  });

  it('largeK false', () => {
    expect(prettyBits(4001, { largeK: false })).toEqual('4 kB');
    expect(prettyBits(18717, { largeK: false, binary: true })).toEqual('18.3 KiB');
    expect(prettyBits(18717, { largeK: false })).toEqual('18.7 kB');
  });

  it('prettyBandwidth & prettyTraffic', () => {
    expect(prettyBandwidth(1e6)).toEqual('1 Mbps');
    expect(prettyTraffic(1_024_000)).toEqual('1000 KiB');
  });

  it('bits', () => {
    expect(bits(1)).toEqual('1 b');
    expect(bits(0)).toEqual('0 b');
    expect(bits(3)).toEqual('3 b');
    expect(bits(11)).toEqual('11 b');
    expect(bits(999)).toEqual('999 b');
    expect(bits(1000)).toEqual('1 Kbit');
    expect(bits(1001)).toEqual('1 Kbit');
    expect(bits(1020)).toEqual('1.02 Kbit');
    expect(bits(1230)).toEqual('1.23 Kbit');
    expect(bits(1234)).toEqual('1.23 Kbit');
    expect(bits(1999)).toEqual('2 Kbit');
    expect(bits(11020)).toEqual('11 Kbit');
    expect(bits(11030)).toEqual('11 Kbit');
    expect(bits(11234)).toEqual('11.2 Kbit');
    expect(bits(21999)).toEqual('22 Kbit');
  });

  it('ibits', () => {
    expect(ibits(1)).toEqual('1 b');
    expect(ibits(0)).toEqual('0 b');
    expect(ibits(3)).toEqual('3 b');
    expect(ibits(11)).toEqual('11 b');
    expect(ibits(999)).toEqual('999 b');
    expect(ibits(1000)).toEqual('1000 b');
    expect(ibits(1001)).toEqual('1000 b');
    expect(ibits(1020)).toEqual('1020 b');
    expect(ibits(1230)).toEqual('1.2 Kibit');
    expect(ibits(1234)).toEqual('1.21 Kibit');
    expect(ibits(1999)).toEqual('1.95 Kibit');
    expect(ibits(11020)).toEqual('10.8 Kibit');
    expect(ibits(11030)).toEqual('10.8 Kibit');
    expect(ibits(11234)).toEqual('11 Kibit');
    expect(ibits(21999)).toEqual('21.5 Kibit');
  });

  it('bytes', () => {
    expect(bytes(1)).toEqual('1 B');
    expect(bytes(0)).toEqual('0 B');
    expect(bytes(3)).toEqual('3 B');
    expect(bytes(11)).toEqual('11 B');
    expect(bytes(123)).toEqual('123 B');
    expect(bytes(999)).toEqual('999 B');
    expect(bytes(1000)).toEqual('1 KB');
    expect(bytes(1001)).toEqual('1 KB');
    expect(bytes(1020)).toEqual('1.02 KB');
    expect(bytes(1030)).toEqual('1.03 KB');
    expect(bytes(1200)).toEqual('1.2 KB');
    expect(bytes(1230)).toEqual('1.23 KB');
    expect(bytes(1999)).toEqual('2 KB');
    expect(bytes(11020)).toEqual('11 KB');
    expect(bytes(11030)).toEqual('11 KB');
    expect(bytes(11234)).toEqual('11.2 KB');
    expect(bytes(21999)).toEqual('22 KB');
  });

  it('ibytes', () => {
    expect(ibytes(1)).toEqual('1 B');
    expect(ibytes(0)).toEqual('0 B');
    expect(ibytes(3)).toEqual('3 B');
    expect(ibytes(11)).toEqual('11 B');
    expect(ibytes(123)).toEqual('123 B');
    expect(ibytes(999)).toEqual('999 B');
    expect(ibytes(1000)).toEqual('1000 B');
    expect(ibytes(1001)).toEqual('1000 B');
    expect(ibytes(1020)).toEqual('1020 B');
    expect(ibytes(1030)).toEqual('1.01 KiB');
    expect(ibytes(1200)).toEqual('1.17 KiB');
    expect(ibytes(1230)).toEqual('1.2 KiB');
    expect(ibytes(1999)).toEqual('1.95 KiB');
    expect(ibytes(11020)).toEqual('10.8 KiB');
    expect(ibytes(11030)).toEqual('10.8 KiB');
    expect(ibytes(11234)).toEqual('11 KiB');
    expect(ibytes(21999)).toEqual('21.5 KiB');
  });

  it('bps', () => {
    expect(bps(1)).toEqual('1 bps');
    expect(bps(0)).toEqual('0 bps');
    expect(bps(3)).toEqual('3 bps');
    expect(bps(11)).toEqual('11 bps');
    expect(bps(123)).toEqual('123 bps');
    expect(bps(999)).toEqual('999 bps');
    expect(bps(1000)).toEqual('1 Kbps');
    expect(bps(1001)).toEqual('1 Kbps');
    expect(bps(1020)).toEqual('1.02 Kbps');
    expect(bps(1030)).toEqual('1.03 Kbps');
    expect(bps(1200)).toEqual('1.2 Kbps');
    expect(bps(1230)).toEqual('1.23 Kbps');
    expect(bps(1999)).toEqual('2 Kbps');
    expect(bps(11020)).toEqual('11 Kbps');
    expect(bps(11030)).toEqual('11 Kbps');
    expect(bps(11234)).toEqual('11.2 Kbps');
    expect(bps(21999)).toEqual('22 Kbps');
  });
});
