import WizData from "@script-wiz/wiz-data";
import BN from "bn.js";
import { convert64, numToLE64 } from "./conversion";

const MAX_INTEGER = new BN("7fffffffffffffff", "hex");
const MIN_INTEGER = new BN("8000000000000000", "hex");
const BN_ZERO = new BN(0);
const NEGATIVE_1 = new BN(-1);

export const add64 = (wizData: WizData, wizData2: WizData): WizData[] => {
  if (wizData.bytes.length != 8 || wizData2.bytes.length != 8) throw "Input bytes length must be equal 8 byte";

  const a = new BN(wizData.bin, 2);
  const b = new BN(wizData2.bin, 2);

  if ((a.gt(BN_ZERO) && b.gt(MAX_INTEGER.sub(a))) || (a.lt(BN_ZERO) && b.lt(MIN_INTEGER.sub(a)))) {
    return [WizData.fromNumber(0)];
  } else {
    const addedValue = a.add(b);
    return [convert64(addedValue), WizData.fromNumber(1)];
  }
};

export const sub64 = (wizData: WizData, wizData2: WizData): WizData[] => {
  if (wizData.bytes.length != 8 || wizData2.bytes.length != 8) throw "Input bytes length must be equal 8 byte";

  const a = new BN(wizData.bin, 2);
  const b = new BN(wizData2.bin, 2);

  if ((b.gt(BN_ZERO) && a.lt(MIN_INTEGER.add(b))) || (b.lt(BN_ZERO) && a.gt(MAX_INTEGER.add(b)))) {
    return [WizData.fromNumber(0)];
  } else {
    const subValue = a.sub(b);
    return [convert64(subValue), WizData.fromNumber(1)];
  }
};

export const mul64 = (wizData: WizData, wizData2: WizData): WizData[] => {
  if (wizData.bytes.length !== 8 || wizData2.bytes.length !== 8) throw "Input bytes length must be equal 8 byte";

  const a = new BN(wizData.bin, 2);
  const b = new BN(wizData2.bin, 2);

  if (
    (a.gt(BN_ZERO) && b.gt(BN_ZERO) && a.gt(MAX_INTEGER.div(b))) ||
    (a.gt(BN_ZERO) && b.lt(BN_ZERO) && b.lt(MIN_INTEGER.div(a))) ||
    (a.lt(BN_ZERO) && b.gt(BN_ZERO) && a.lt(MIN_INTEGER.div(b))) ||
    (a.lt(BN_ZERO) && b.lt(BN_ZERO) && b.lt(MAX_INTEGER.div(a)))
  ) {
    return [WizData.fromNumber(0)];
  } else {
    const mulValue = a.mul(b);
    return [convert64(mulValue), WizData.fromNumber(1)];
  }
};

export const div64 = (wizData: WizData, wizData2: WizData): WizData[] => {
  if (wizData.bytes.length != 8 || wizData2.bytes.length != 8) throw "Input bytes length must be equal 8 byte";

  const a = new BN(wizData.bin, 2);
  const b = new BN(wizData2.bin, 2);

  if (b.eq(BN_ZERO) || (b.eq(NEGATIVE_1) && a.eq(MIN_INTEGER))) {
    return [WizData.fromNumber(0)];
  }

  let r = a.mod(b);
  let q = a.div(b);

  if (r.lt(BN_ZERO) && b.gt(BN_ZERO)) {
    r = r.add(b);
    q = q.sub(new BN(1));
  } else if (r.lt(BN_ZERO) && b.lt(BN_ZERO)) {
    r = r.sub(b);
    q = q.add(new BN(1));
  }

  return [convert64(r), convert64(q), WizData.fromNumber(1)];
};

export const neg64 = (wizData: WizData): WizData => {
  if (wizData.bytes.length != 8) throw "Input bytes length must be equal 8 byte";

  const data = new BN(wizData.bin, 2);

  if (data.eq(MIN_INTEGER)) throw "Input value must be not equal min integer.";

  const negateValue = data.neg();

  const newNegateValue = new BN(new BN(negateValue).toString("hex"));

  return convert64(new BN(newNegateValue));
};

export const lessThan64 = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.bytes.length > 8 || wizData2.bytes.length > 8) throw "Input bytes length must be equal 8 byte";

  const a = numToLE64(wizData);
  const b = numToLE64(wizData2);

  const bigA = new BN(a.hex, "hex");
  const bigB = new BN(b.hex, "hex");

  return WizData.fromNumber(bigA.lt(bigB) ? 1 : 0);
};

export const lessThanOrEqual64 = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.bytes.length > 8 || wizData2.bytes.length > 8) throw "Input bytes length must be equal 8 byte";

  const a = numToLE64(wizData);
  const b = numToLE64(wizData2);

  const bigA = new BN(a.hex, "hex");
  const bigB = new BN(b.hex, "hex");

  return WizData.fromNumber(bigA.lte(bigB) ? 1 : 0);
};

export const greaterThan64 = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.bytes.length > 8 || wizData2.bytes.length > 8) throw "Input bytes length must be equal 8 byte";

  const a = numToLE64(wizData);
  const b = numToLE64(wizData2);

  const bigA = new BN(a.hex, "hex");
  const bigB = new BN(b.hex, "hex");

  return WizData.fromNumber(bigA.gt(bigB) ? 1 : 0);
};

export const greaterThanOrEqual64 = (wizData: WizData, wizData2: WizData): WizData => {
  if (wizData.bytes.length > 8 || wizData2.bytes.length > 8) throw "Input bytes length must be equal 8 byte";

  const a = numToLE64(wizData);
  const b = numToLE64(wizData2);

  const bigA = new BN(a.hex, "hex");
  const bigB = new BN(b.hex, "hex");

  return WizData.fromNumber(bigA.gte(bigB) ? 1 : 0);
};
