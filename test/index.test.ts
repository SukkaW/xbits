import { describe, it } from 'mocha';
import { expect } from 'chai';
import {
  prettyBandwidth, prettyBits, prettyTraffic,
  bits, bytes, ibits,
  ibytes,
  bps
} from '../src';

describe('xbits', () => {
  it('converts bytes to human readable strings', () => {
    expect(prettyBits(0)).to.equal('0 B');
    expect(prettyBits(0.4)).to.equal('0.4 B');
    expect(prettyBits(0.7)).to.equal('0.7 B');
    expect(prettyBits(10)).to.equal('10 B');
    expect(prettyBits(10.1)).to.equal('10.1 B');
    expect(prettyBits(999)).to.equal('999 B');
    expect(prettyBits(1001)).to.equal('1 KB');
    expect(prettyBits(1e16)).to.equal('10 PB');
    expect(prettyBits(1e30)).to.equal('1000000 YB');
  });

  it('supports negative number', () => {
    expect(prettyBits(-0.4)).to.equal('-0.4 B');
    expect(prettyBits(-0.7)).to.equal('-0.7 B');
    expect(prettyBits(-10.1)).to.equal('-10.1 B');
    expect(prettyBits(-999)).to.equal('-999 B');
    expect(prettyBits(-1001)).to.equal('-1 KB');
  });

  it('locale option', () => {
    expect(prettyBits(-0.4, { locale: 'de' })).to.equal('-0,4 B');
    expect(prettyBits(0.4, { locale: 'de' })).to.equal('0,4 B');
    expect(prettyBits(1001, { locale: 'de' })).to.equal('1 KB');
    expect(prettyBits(10.1, { locale: 'de' })).to.equal('10,1 B');
    expect(prettyBits(1e30, { locale: 'de' })).to.equal('1.000.000 YB');

    expect(prettyBits(-0.4, { locale: 'en' })).to.equal('-0.4 B');
    expect(prettyBits(0.4, { locale: 'en' })).to.equal('0.4 B');
    expect(prettyBits(1001, { locale: 'en' })).to.equal('1 KB');
    expect(prettyBits(10.1, { locale: 'en' })).to.equal('10.1 B');
    expect(prettyBits(1e30, { locale: 'en' })).to.equal('1,000,000 YB');

    expect(prettyBits(-0.4, { locale: ['unknown', 'de', 'en'] })).to.equal('-0,4 B');
    expect(prettyBits(0.4, { locale: ['unknown', 'de', 'en'] })).to.equal('0,4 B');
    expect(prettyBits(1001, { locale: ['unknown', 'de', 'en'] })).to.equal('1 KB');
    expect(prettyBits(10.1, { locale: ['unknown', 'de', 'en'] })).to.equal('10,1 B');
    expect(prettyBits(1e30, { locale: ['unknown', 'de', 'en'] })).to.equal('1.000.000 YB');

    expect(prettyBits(-0.4, { locale: true })).to.equal('-0.4 B');
    expect(prettyBits(0.4, { locale: true })).to.equal('0.4 B');
    expect(prettyBits(1001, { locale: true })).to.equal('1 KB');
    expect(prettyBits(10.1, { locale: true })).to.equal('10.1 B');
    expect(prettyBits(1e30, { locale: true })).to.equal('1,000,000 YB');

    expect(prettyBits(-0.4, { locale: false })).to.equal('-0.4 B');
    expect(prettyBits(0.4, { locale: false })).to.equal('0.4 B');
    expect(prettyBits(1001, { locale: false })).to.equal('1 KB');
    expect(prettyBits(10.1, { locale: false })).to.equal('10.1 B');
    expect(prettyBits(1e30, { locale: false })).to.equal('1000000 YB');

    expect(prettyBits(-0.4, { locale: undefined })).to.equal('-0.4 B');
    expect(prettyBits(0.4, { locale: undefined })).to.equal('0.4 B');
    expect(prettyBits(1001, { locale: undefined })).to.equal('1 KB');
    expect(prettyBits(10.1, { locale: undefined })).to.equal('10.1 B');
    expect(prettyBits(1e30, { locale: undefined })).to.equal('1000000 YB');
  });

  it('signed option', () => {
    expect(prettyBits(42, { signed: true })).to.equal('+42 B');
    expect(prettyBits(-13, { signed: true })).to.equal('-13 B');
    expect(prettyBits(0, { signed: true })).to.equal(' 0 B');
  });

  it('bits option', () => {
    expect(prettyBits(0, { bits: true })).to.equal('0 b');
    expect(prettyBits(0.4, { bits: true })).to.equal('0.4 b');
    expect(prettyBits(0.7, { bits: true })).to.equal('0.7 b');
    expect(prettyBits(10, { bits: true })).to.equal('10 b');
    expect(prettyBits(10.1, { bits: true })).to.equal('10.1 b');
    expect(prettyBits(999, { bits: true })).to.equal('999 b');
    expect(prettyBits(1001, { bits: true })).to.equal('1 Kbit');
    expect(prettyBits(1e16, { bits: true })).to.equal('10 Pbit');
    expect(prettyBits(1e30, { bits: true })).to.equal('1000000 Ybit');
  });

  it('binary option', () => {
    expect(prettyBits(0, { binary: true })).to.equal('0 B');
    expect(prettyBits(4, { binary: true })).to.equal('4 B');
    expect(prettyBits(10, { binary: true })).to.equal('10 B');
    expect(prettyBits(10.1, { binary: true })).to.equal('10.1 B');
    expect(prettyBits(999, { binary: true })).to.equal('999 B');
    expect(prettyBits(1025, { binary: true })).to.equal('1 KiB');
    expect(prettyBits(1001, { binary: true })).to.equal('1000 B');
    expect(prettyBits(1e16, { binary: true })).to.equal('8.88 PiB');
    expect(prettyBits(1e30, { binary: true })).to.equal('827000 YiB');
  });

  it('bits and binary option', () => {
    expect(prettyBits(0, { bits: true, binary: true })).to.equal('0 b');
    expect(prettyBits(4, { bits: true, binary: true })).to.equal('4 b');
    expect(prettyBits(10, { bits: true, binary: true })).to.equal('10 b');
    expect(prettyBits(999, { bits: true, binary: true })).to.equal('999 b');
    expect(prettyBits(1025, { bits: true, binary: true })).to.equal('1 Kibit');
    expect(prettyBits(1e6, { bits: true, binary: true })).to.equal('977 Kibit');
  });

  it('fractional digits options', () => {
    expect(prettyBits(1900, { maximumFractionDigits: 1 })).to.equal('1.9 KB');
    expect(prettyBits(1900, { minimumFractionDigits: 3 })).to.equal('1.900 KB');
    expect(prettyBits(1911, { maximumFractionDigits: 1 })).to.equal('1.9 KB');
    expect(prettyBits(1111, { maximumFractionDigits: 2 })).to.equal('1.11 KB');
    expect(prettyBits(1019, { maximumFractionDigits: 3 })).to.equal('1.019 KB');
    expect(prettyBits(1001, { maximumFractionDigits: 3 })).to.equal('1.001 KB');
    expect(prettyBits(1000, { minimumFractionDigits: 1, maximumFractionDigits: 3 })).to.equal('1.0 KB');
    expect(prettyBits(3942, { minimumFractionDigits: 1, maximumFractionDigits: 2 })).to.equal('3.94 KB');
    expect(prettyBits(59_952_784, { maximumFractionDigits: 1 }), '59.9 MB');
    expect(prettyBits(59_952_784, { minimumFractionDigits: 1, maximumFractionDigits: 1 }), '59.9 MB');
    expect(prettyBits(4001, { maximumFractionDigits: 3, binary: true })).to.equal('3.907 KiB');
    expect(prettyBits(18717, { maximumFractionDigits: 2, binary: true })).to.equal('18.28 KiB');
    expect(prettyBits(18717, { maximumFractionDigits: 4, binary: true })).to.equal('18.2783 KiB');
    expect(prettyBits(32768, { minimumFractionDigits: 2, maximumFractionDigits: 3, binary: true })).to.equal('32.00 KiB');
    expect(prettyBits(65536, { minimumFractionDigits: 1, maximumFractionDigits: 3, binary: true })).to.equal('64.0 KiB');
  });

  it('space option', () => {
    expect(prettyBits(0)).to.equal('0 B');
    expect(prettyBits(0, { space: false })).to.equal('0B');
    expect(prettyBits(999)).to.equal('999 B');
    expect(prettyBits(999, { space: false })).to.equal('999B');
    expect(prettyBits(-13, { signed: true })).to.equal('-13 B');
    expect(prettyBits(-13, { signed: true, space: false })).to.equal('-13B');
    expect(prettyBits(42, { signed: true })).to.equal('+42 B');
    expect(prettyBits(42, { signed: true, space: false })).to.equal('+42B');
  });

  it('largeK false', () => {
    expect(prettyBits(4001, { largeK: false })).to.equal('4 kB');
    expect(prettyBits(18717, { largeK: false, binary: true })).to.equal('18.3 KiB');
    expect(prettyBits(18717, { largeK: false })).to.equal('18.7 kB');
  });

  it('prettyBandwidth & prettyTraffic', () => {
    expect(prettyBandwidth(1e6)).to.equal('1 Mbps');
    expect(prettyTraffic(1_024_000)).to.equal('1000 KiB');
  });

  it('bits', () => {
    expect(bits(1)).to.equal('1 b');
    expect(bits(0)).to.equal('0 b');
    expect(bits(3)).to.equal('3 b');
    expect(bits(11)).to.equal('11 b');
    expect(bits(999)).to.equal('999 b');
    expect(bits(1000)).to.equal('1 Kbit');
    expect(bits(1001)).to.equal('1 Kbit');
    expect(bits(1020)).to.equal('1.02 Kbit');
    expect(bits(1230)).to.equal('1.23 Kbit');
    expect(bits(1234)).to.equal('1.23 Kbit');
    expect(bits(1999)).to.equal('2 Kbit');
    expect(bits(11020)).to.equal('11 Kbit');
    expect(bits(11030)).to.equal('11 Kbit');
    expect(bits(11234)).to.equal('11.2 Kbit');
    expect(bits(21999)).to.equal('22 Kbit');
  });

  it('ibits', () => {
    expect(ibits(1)).to.equal('1 b');
    expect(ibits(0)).to.equal('0 b');
    expect(ibits(3)).to.equal('3 b');
    expect(ibits(11)).to.equal('11 b');
    expect(ibits(999)).to.equal('999 b');
    expect(ibits(1000)).to.equal('1000 b');
    expect(ibits(1001)).to.equal('1000 b');
    expect(ibits(1020)).to.equal('1020 b');
    expect(ibits(1230)).to.equal('1.2 Kibit');
    expect(ibits(1234)).to.equal('1.21 Kibit');
    expect(ibits(1999)).to.equal('1.95 Kibit');
    expect(ibits(11020)).to.equal('10.8 Kibit');
    expect(ibits(11030)).to.equal('10.8 Kibit');
    expect(ibits(11234)).to.equal('11 Kibit');
    expect(ibits(21999)).to.equal('21.5 Kibit');
  });

  it('bytes', () => {
    expect(bytes(1)).to.equal('1 B');
    expect(bytes(0)).to.equal('0 B');
    expect(bytes(3)).to.equal('3 B');
    expect(bytes(11)).to.equal('11 B');
    expect(bytes(123)).to.equal('123 B');
    expect(bytes(999)).to.equal('999 B');
    expect(bytes(1000)).to.equal('1 KB');
    expect(bytes(1001)).to.equal('1 KB');
    expect(bytes(1020)).to.equal('1.02 KB');
    expect(bytes(1030)).to.equal('1.03 KB');
    expect(bytes(1200)).to.equal('1.2 KB');
    expect(bytes(1230)).to.equal('1.23 KB');
    expect(bytes(1999)).to.equal('2 KB');
    expect(bytes(11020)).to.equal('11 KB');
    expect(bytes(11030)).to.equal('11 KB');
    expect(bytes(11234)).to.equal('11.2 KB');
    expect(bytes(21999)).to.equal('22 KB');
  });

  it('ibytes', () => {
    expect(ibytes(1)).to.equal('1 B');
    expect(ibytes(0)).to.equal('0 B');
    expect(ibytes(3)).to.equal('3 B');
    expect(ibytes(11)).to.equal('11 B');
    expect(ibytes(123)).to.equal('123 B');
    expect(ibytes(999)).to.equal('999 B');
    expect(ibytes(1000)).to.equal('1000 B');
    expect(ibytes(1001)).to.equal('1000 B');
    expect(ibytes(1020)).to.equal('1020 B');
    expect(ibytes(1030)).to.equal('1.01 KiB');
    expect(ibytes(1200)).to.equal('1.17 KiB');
    expect(ibytes(1230)).to.equal('1.2 KiB');
    expect(ibytes(1999)).to.equal('1.95 KiB');
    expect(ibytes(11020)).to.equal('10.8 KiB');
    expect(ibytes(11030)).to.equal('10.8 KiB');
    expect(ibytes(11234)).to.equal('11 KiB');
    expect(ibytes(21999)).to.equal('21.5 KiB');
  });

  it('bps', () => {
    expect(bps(1)).to.equal('1 bps');
    expect(bps(0)).to.equal('0 bps');
    expect(bps(3)).to.equal('3 bps');
    expect(bps(11)).to.equal('11 bps');
    expect(bps(123)).to.equal('123 bps');
    expect(bps(999)).to.equal('999 bps');
    expect(bps(1000)).to.equal('1 Kbps');
    expect(bps(1001)).to.equal('1 Kbps');
    expect(bps(1020)).to.equal('1.02 Kbps');
    expect(bps(1030)).to.equal('1.03 Kbps');
    expect(bps(1200)).to.equal('1.2 Kbps');
    expect(bps(1230)).to.equal('1.23 Kbps');
    expect(bps(1999)).to.equal('2 Kbps');
    expect(bps(11020)).to.equal('11 Kbps');
    expect(bps(11030)).to.equal('11 Kbps');
    expect(bps(11234)).to.equal('11.2 Kbps');
    expect(bps(21999)).to.equal('22 Kbps');
  });
});
