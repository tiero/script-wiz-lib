const BIT_8 = 8;
const BIT_16 = 16;
const BIT_32 = 32;

export const resizeUint8Array = (uint8Array: Uint8Array, byteLength: number): Uint8Array => {
  const resizedUint8Array = new Uint8Array(byteLength);
  if (uint8Array.length > byteLength) {
    const maxNumber: number = Math.pow(2, BIT_8) - 1;
    resizedUint8Array.fill(maxNumber);
  } else {
    resizedUint8Array.set(uint8Array);
  }
  return resizedUint8Array;
};

export const numeralNextValue = (value: number, base: number): { numeral: number; nextValue: number } => {
  const numeral: number = value % base;
  const nextValue: number = (value - numeral) / base;
  return { numeral, nextValue };
};

export const toUint8Array = (value: number): Uint8Array => {
  const baseNumber = Math.pow(2, BIT_8);
  let lastValue = value;
  const numeralArray: number[] = [];

  while (lastValue >= baseNumber) {
    const { numeral, nextValue } = numeralNextValue(lastValue, baseNumber);
    numeralArray.push(numeral);
    lastValue = nextValue;
  }

  if (lastValue > 0) numeralArray.push(lastValue);
  const result = Uint8Array.from(numeralArray);
  return result;
};

export const toUint8ArrayResizedUint16 = (value: number): Uint8Array => {
  const uint8Array = toUint8Array(value);
  const resizedUint8Array = resizeUint8Array(uint8Array, 2);
  return resizedUint8Array;
};

export const toUint8ArrayResizedUint32 = (value: number): Uint8Array => {
  const uint8Array = toUint8Array(value);
  const resizedUint8Array = resizeUint8Array(uint8Array, 4);
  return resizedUint8Array;
};

export const toUint8ArrayResizedUint64 = (value: number): Uint8Array => {
  const uint8Array = toUint8Array(value);
  const resizedUint8Array = resizeUint8Array(uint8Array, 8);
  return resizedUint8Array;
};

/* export const toUint16Array = (value: number) => {
  const baseNumber = Math.pow(2, BIT_16);
  let lastValue = value;
  const numeralArray: number[] = [];

  while (lastValue >= baseNumber) {
    const [numeral, nextValue] = numeralNextValue(lastValue, baseNumber);
    numeralArray.push(numeral);
    lastValue = nextValue;
  }

  if (lastValue > 0) numeralArray.push(lastValue);
  const result = Uint16Array.from(numeralArray);
  return result;
};

export const toUint32Array = (value: number) => {
  const baseNumber = Math.pow(2, BIT_32);
  let lastValue = value;
  const numeralArray: number[] = [];

  while (lastValue >= baseNumber) {
    const [numeral, nextValue] = numeralNextValue(lastValue, baseNumber);
    numeralArray.push(numeral);
    lastValue = nextValue;
  }

  if (lastValue > 0) numeralArray.push(lastValue);
  const result = Uint32Array.from(numeralArray);
  return result;
}; */