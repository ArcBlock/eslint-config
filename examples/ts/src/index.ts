/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
import isBoolean from 'lodash/isBoolean';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import isNull from 'lodash/isNull';
import rightPad from 'lodash/padEnd';
import leftPad from 'lodash/padStart';
import base58 from 'bs58';
import * as utf8 from 'utf8';
import base64 from 'base64-url';
import BN from 'bn.js';

const DID_PREFIX = 'did:abt:';
const zero = new BN(0);
const negative1 = new BN(-1);
const base58btc = {
  encode: (v: Uint8Array) => `z${base58.encode(v)}`,
  decode: (v: $TSFixMe) => base58.decode(v.slice(1)),
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isBase58btc = (data: any): boolean => {
  if (typeof data !== 'string') {
    return false;
  }
  return data[0] === 'z';
};

export type BytesType = string | Buffer | Uint8Array;
export type EncodingType = 'hex' | 'base16' | 'base58' | 'base64' | 'Uint8Array' | 'buffer';
export type KeyPairType = { publicKey: BytesType; secretKey: BytesType };

export { BN, leftPad, rightPad };

/**
 * Returns a BN object, converts a number value to a BN
 * @param {String|Number|Object} `arg` input a string number, hex string number, number, BigNumber or BN object
 * @return {Object} `output` BN object of the number
 * @throws if the argument is not an array, object that isn't a bignumber, not a string number or number
 */
export const numberToBN = (arg: string | number | BN) => {
  if (typeof arg === 'string' || typeof arg === 'number') {
    let multiplier = new BN(1); // eslint-disable-line
    const formattedString = String(arg).toLowerCase().trim();
    const isHexPrefixed = formattedString.substr(0, 2) === '0x' || formattedString.substr(0, 3) === '-0x';
    let stringArg = stripHexPrefix(formattedString); // eslint-disable-line
    if (stringArg.substr(0, 1) === '-') {
      stringArg = stripHexPrefix(stringArg.slice(1));
      multiplier = new BN(-1, 10);
    }
    stringArg = stringArg === '' ? '0' : stringArg;
    if (
      (!stringArg.match(/^-?[0-9]+$/) && stringArg.match(/^[0-9A-Fa-f]+$/)) ||
      stringArg.match(/^[a-fA-F]+$/) ||
      (isHexPrefixed === true && stringArg.match(/^[0-9A-Fa-f]+$/))
    ) {
      return new BN(stringArg, 16).mul(multiplier);
    }
    if ((stringArg.match(/^-?[0-9]+$/) || stringArg === '') && isHexPrefixed === false) {
      return new BN(stringArg, 10).mul(multiplier);
    }
  }
  if (isBN(arg)) {
    return new BN(arg.toString(10), 10);
  }
  throw new Error(
    `[number-to-bn] while converting number ${JSON.stringify(
      arg,
    )} to BN.js instance, error: invalid number value. Value must be an integer, hex string, BN or BigNumber instance. Note, decimals are not supported.`,
  );
};

/**
 * Returns a `boolean` on whether or not the `string` starts with '0x'
 *
 * @public
 * @static
 * @param {String} str the string input value
 * @return {Boolean} a boolean if it is or is not hex prefixed
 * @throws if the str input is not a string
 */
export const isHexPrefixed = (str: string) => {
  if (typeof str !== 'string') {
    throw new Error('[is-hex-prefixed] value must be type string');
  }
  return str.slice(0, 2).toLowerCase() === '0x';
};

/**
 * Removes '0x' from a given `String` if present
 *
 * @public
 * @static
 * @param {String} str the string value
 * @return {String|Optional} a string by pass if necessary
 */
export const stripHexPrefix = (str: $TSFixMe) => {
  if (typeof str !== 'string') {
    return str;
  }
  return isHexPrefixed(str) ? str.slice(2) : str;
};

/**
 * Returns true if object is BN, otherwise false
 *
 * @public
 * @static
 * @method isBN
 * @param {Object} object
 * @returns {Boolean}
 */
export const isBN = (object: $TSFixMe) =>
  object instanceof BN || (object && object.constructor && object.constructor.name === 'BN');

/**
 * Returns true if object is BigNumber, otherwise false
 *
 * @public
 * @static
 * @method isBigNumber
 * @param {Object} object
 * @returns {Boolean}
 */
export const isBigNumber = (object: $TSFixMe) =>
  object && object.constructor && object.constructor.name === 'BigNumber';

/**
 * Check if string is HEX, requires a 0x in front
 *
 * @public
 * @static
 * @method isHexStrict
 * @param {String} hex to be checked
 * @returns {Boolean}
 */
export const isHexStrict = (hex: string) => (isString(hex) || isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex);

/**
 * Check if string is HEX
 *
 * @public
 * @static
 * @method isHex
 * @param {String} hex to be checked
 * @returns {Boolean}
 */
export const isHex = (hex: string) => (isString(hex) || isNumber(hex)) && /^(-0x|0x|0X|-0X)?[0-9a-f]*$/i.test(hex);

/**
 * Takes an input and transforms it into an BN
 *
 * @public
 * @static
 * @method toBN
 * @param {Number|String|BN} num, string, HEX string or BN
 * @returns {BN} BN
 */
export const toBN = (num: number | string | BN, base: number | 'hex' = 10) => {
  try {
    if (typeof num === 'number' && num > 0) {
      const numStr = Number(num).toLocaleString('fullwide', { useGrouping: false });
      return new BN(numStr, base);
    }
    return numberToBN(num);
  } catch (error) {
    throw new Error(`${error} Given value: "${num}"`);
  }
};

/**
 * Should be called to get hex representation (prefixed by 0x) of utf8 string
 *
 * @public
 * @static
 * @method utf8ToHex
 * @param {String} str
 * @returns {String} hex representation of input string
 */
export const utf8ToHex = (str: string) => {
  str = utf8.encode(str);
  let hex = '';
  /* eslint-disable no-control-regex */
  // remove \u0000 padding from either side
  str = str.replace(/^(?:\u0000)*/, '');
  str = str.split('').reverse().join('');
  str = str.replace(/^(?:\u0000)*/, '');
  str = str.split('').reverse().join('');
  /* eslint-enable no-control-regex */
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    const n = code.toString(16);
    hex += n.length < 2 ? `0${n}` : n;
  }
  return `0x${hex}`;
};

/**
 * Should be called to get utf8 from it's hex representation
 *
 * @public
 * @static
 * @method hexToUtf8
 * @param {String} hex
 * @returns {String} ascii string representation of hex value
 */
export const hexToUtf8 = (hex: string) => {
  if (!isHexStrict(hex)) throw new Error(`The parameter "${hex}" must be a valid HEX string.`);
  let str = '';
  let code = 0;
  hex = hex.replace(/^0x/i, '');
  // remove 00 padding from either side
  hex = hex.replace(/^(?:00)*/, '');
  hex = hex.split('').reverse().join('');
  hex = hex.replace(/^(?:00)*/, '');
  hex = hex.split('').reverse().join('');
  const l = hex.length;
  for (let i = 0; i < l; i += 2) {
    code = parseInt(hex.substr(i, 2), 16);
    // if (code !== 0) {
    str += String.fromCharCode(code);
    // }
  }
  return utf8.decode(str);
};

/**
 * Converts value to number representation
 *
 * @public
 * @static
 * @method hexToNumber
 * @param {String|Number|BN} value
 * @returns {Number}
 */
export const hexToNumber = (value: string | number | BN) => {
  if (!value) {
    return value;
  }
  return toBN(value).toNumber();
};

/**
 * Converts value to hex representation
 *
 * @public
 * @static
 * @method numberToHex
 * @param {String|Number|BN} value
 * @returns {String}
 */
export const numberToHex = (value: $TSFixMe) => {
  if (isNull(value) || typeof value === 'undefined') {
    return value;
  }
  // eslint-disable-next-line no-restricted-globals
  if (!isFinite(value) && !isHex(value)) {
    throw new Error(`Given input "${value}" is not a number.`);
  }
  const num = toBN(value);
  const result = num.toString(16);
  return num.lt(new BN(0)) ? `-0x${result.substr(1)}` : `0x${result}`;
};

/**
 * Convert a byte array to a hex string
 * Note: Implementation from crypto-js
 *
 * @public
 * @static
 * @method bytesToHex
 * @param {Array} bytes
 * @returns {String} the hex string
 */
export const bytesToHex = (bytes: $TSFixMe) => {
  const hex = [];
  for (let i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16));
    hex.push((bytes[i] & 0xf).toString(16));
  }
  return `0x${hex.join('')}`;
};

/**
 * Convert a hex string to a byte array
 * Note: Implementation from crypto-js
 *
 * @public
 * @static
 * @method hexToBytes
 * @param {String} hex
 * @returns {Array} the byte array
 */
export const hexToBytes = (hex: $TSFixMe) => {
  hex = hex.toString(16);
  if (!isHex(hex)) {
    throw new Error(`Given value "${hex}" is not a valid hex string.`);
  }
  hex = hex.replace(/^0x/i, '');
  hex = hex.length % 2 ? `0${hex}` : hex;
  const bytes = [];
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return bytes;
};

/**
 * Auto converts any given value into it's hex representation.
 * And even stringify objects before.
 *
 * @public
 * @static
 * @method toHex
 * @param {String|Number|BN|Object|TypedArray|Buffer} value
 * @param {Boolean} returnType
 * @returns {String}
 */
export const toHex = (
  value: string | number | boolean | BN | Uint8Array | Buffer | (number | { test: string })[] | { test: string },
  returnType = false,
): string => {
  if (isUint8Array(value) || Buffer.isBuffer(value)) {
    return returnType ? 'bytes' : bytesToHex(value);
  }
  if (isBase58btc(value)) {
    return returnType ? 'bytes' : bytesToHex(base58btc.decode(value));
  }
  if (isBoolean(value)) {
    // eslint-disable-next-line no-nested-ternary
    return returnType ? 'bool' : value ? '0x01' : '0x00';
  }
  if (isObject(value) && !isBigNumber(value) && !isBN(value)) {
    return returnType ? 'string' : utf8ToHex(JSON.stringify(value));
  }
  // if its a negative number, pass it through numberToHex
  if (isString(value)) {
    if (value.indexOf('-0x') === 0 || value.indexOf('-0X') === 0) {
      return returnType ? 'int256' : numberToHex(value);
    }
    if (value.indexOf('0x') === 0 || value.indexOf('0X') === 0) {
      return returnType ? 'bytes' : value;
    }
    // TODO: some edge case may be not properly handled here
    return returnType ? 'string' : utf8ToHex(value);
  }
  // eslint-disable-next-line no-nested-ternary
  return returnType ? (value < 0 ? 'int256' : 'uint256') : numberToHex(value);
};

export const numberToString = (arg: $TSFixMe) => {
  if (typeof arg === 'string') {
    if (!arg.match(/^-?[0-9.]+$/)) {
      throw new Error(`Invalid value '${arg}' while converting to string, should be a number matching (^-?[0-9.]+).`);
    }
    return arg;
  }
  if (typeof arg === 'number') {
    if (Number.isInteger(arg) && arg > 0) {
      return Number(arg).toLocaleString('fullwide', { useGrouping: false });
    }
    return String(arg);
  }
  if (typeof arg === 'object' && arg.toString && (arg.toTwos || arg.dividedToIntegerBy)) {
    if (arg.toPrecision) {
      return String(arg.toPrecision());
    }
    return arg.toString(10);
  }
  throw new Error(`while converting number to string, invalid number value '${arg}' type ${typeof arg}.`);
};

/**
 * Format a big number to human readable number, such as 1_0000_0000_0000_000 => 1 Token
 *
 * @public
 * @static
 * @method fromUnitToToken
 * @param {string|number} input
 * @param {number} [decimal=18]
 * @param {object} [optionsInput=undefined]
 * @returns {string}
 */
export const fromUnitToToken = (input: string | number | BN, decimal = 18, optionsInput: $TSFixMe = {}) => {
  let unit = toBN(input);
  const negative = unit.lt(zero);
  const base = toBN(`1${'0'.repeat(decimal)}`, 10);
  const baseLength = base.toString(10).length - 1 || 1;
  const options = optionsInput || {};
  if (negative) {
    unit = unit.mul(negative1);
  }
  let fraction = unit.mod(base).toString(10);
  while (fraction.length < baseLength) {
    fraction = `0${fraction}`;
  }
  if (!options.pad) {
    // eslint-disable-next-line prefer-destructuring
    fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1];
  }

  let whole = unit.div(base).toString(10);
  if (options.commify) {
    whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  let value = `${whole}${fraction === '0' ? '' : `.${fraction}`}`;
  if (negative) {
    value = `-${value}`;
  }
  return value;
};

/**
 * Convert human readable token number to big number instance
 *
 * @public
 * @static
 * @param {string} input
 * @param {number} [decimal=18]
 * @returns {BN}
 */
export const fromTokenToUnit = (input: string | number, decimal = 18) => {
  let token = numberToString(input);
  const base = toBN(`1${'0'.repeat(decimal)}`, 10);
  const baseLength = base.toString(10).length - 1 || 1;
  // Is it negative?
  const negative = token.substring(0, 1) === '-';
  if (negative) {
    token = token.substring(1);
  }
  if (token === '.') {
    throw new Error(`error converting token ${input} to unit, invalid value`);
  }
  // Split it into a whole and fractional part
  const comps = token.split('.');
  if (comps.length > 2) {
    throw new Error(`error converting token ${input} to unit, too many decimal points`);
  }
  let whole = comps[0];
  let fraction = comps[1];
  if (!whole) {
    whole = '0';
  }
  if (!fraction) {
    fraction = '0';
  }
  if (fraction.length > baseLength) {
    throw new Error(`error converting token ${input} to unit, too many decimal places`);
  }
  while (fraction.length < baseLength) {
    fraction += '0';
  }
  whole = new BN(whole);
  fraction = new BN(fraction);
  let unit = whole.mul(base).add(fraction);
  if (negative) {
    unit = unit.mul(negative1);
  }
  return new BN(unit.toString(10), 10);
};

/**
 * Validates if a value is an Uint8Array.
 *
 * @public
 * @static
 * @param {*} value - value to validate
 * @returns {Boolean} boolean indicating if a value is an Uint8Array
 */
export function isUint8Array(value: $TSFixMe) {
  return Object.prototype.toString.call(value) === '[object Uint8Array]';
}

/**
 * Generate a random UUID
 *
 * @public
 * @static
 * @returns {string} Generated uuid
 */
export function UUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Check if a string is valid UUID
 *
 * @public
 * @static
 * @param {string} str
 * @returns {boolean}
 */
export function isUUID(str: string) {
  return /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.test(str);
}

/**
 * Convert input to Uint8Array on best effort, base64 node supported
 *
 * @public
 * @static
 * @param {buffer|base58|hex|Uint8Array|string} v
 * @returns {Uint8Array}
 * @throws {Error}
 */
export function toUint8Array(v: $TSFixMe): Uint8Array {
  let vb = null;
  if ([null, undefined, ''].includes(v)) {
    vb = new Uint8Array();
  } else if (Buffer.isBuffer(v)) {
    vb = new Uint8Array(v);
  } else if (isHexStrict(v)) {
    vb = new Uint8Array(hexToBytes(v));
  } else if (isUint8Array(v)) {
    vb = new Uint8Array(v);
  } else if (isBase58btc(v)) {
    vb = new Uint8Array(base58btc.decode(v));
  } else if (typeof v === 'string') {
    vb = new Uint8Array(hexToBytes(toHex(v)));
  } else {
    throw new Error(
      `Unsupported input type ${typeof v} detected for toBuffer, only Uint8Array/Buffer/Hex/Base58 are supported`,
    );
  }
  return vb;
}

/**
 * Convert input to Buffer on best effort, base64 not supported
 *
 * @public
 * @static
 * @param {buffer|base58|hex|Uint8Array} v
 * @returns {buffer}
 * @throws {Error}
 */
export function toBuffer(v: $TSFixMe): Buffer {
  return Buffer.from(toUint8Array(v));
}

/**
 * Convert input to base58btc format on best effort
 *
 * @public
 * @static
 * @param {buffer|base58|hex|Uint8Array} v
 * @returns {string}
 * @throws {Error}
 */
export function toBase58(v: $TSFixMe): string {
  const buf = base58btc.encode(toUint8Array(v));
  return Buffer.from(buf).toString('utf-8');
}

/**
 * Decode base58 string
 *
 * @public
 * @static
 * @param {string} v
 * @returns {buffer}
 */
export function fromBase58(v: string) {
  if (isBase58btc(v) === false) {
    throw new Error('fromBase58 expect strict base58 encoded string as input');
  }
  return Buffer.from(base58btc.decode(v));
}

/**
 * Convert input to base64 format
 *
 * @public
 * @static
 * @param {buffer|base58|hex|Uint8Array} v
 * @param {escape} [escape=true]
 * @returns {string}
 * @throws {Error}
 */
export function toBase64(v: $TSFixMe, escape = true) {
  // FIXME: 这个是正确的?
  const encoded = base64.encode(toBuffer(v) as unknown as string);
  return escape ? base64.escape(encoded) : encoded;
}

/**
 * Decode base64(base64_url) string to buffer
 *
 * @public
 * @static
 * @param {string} v
 * @returns {buffer}
 */
export function fromBase64(v: string) {
  if (typeof v !== 'string') {
    throw new Error('fromBase64 requires input to be a string');
  }
  return Buffer.from(base64.unescape(v), 'base64');
}

/**
 * Convert did to address: remove `did:abt:` prefix
 *
 * @public
 * @static
 * @param {string} did - address string
 * @returns {string}
 */
export function toAddress(did: string) {
  return did.replace(DID_PREFIX, '');
}

/**
 * Convert address to did: prepend `did:abt:` prefix
 *
 * @public
 * @static
 * @param {string} did - address string
 * @returns {string}
 */
export function toDid(address: string) {
  return `${DID_PREFIX}${toAddress(address)}`;
}

export const formatTxType = (type: string) => upperFirst(camelCase(type));
