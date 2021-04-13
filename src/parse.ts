import stackHex from "./helper/stackHex";
import stackNumber from "./helper/stackNumber";
import OP from "./helper/stackOp";
import stackString from "./helper/stackString";
import { StackData, StackDataResult } from "./model";

const parseFinalInput = (input: string): StackData => {
  // 0x1245
  // "hello"
  // 12
  // OP_...

  if (input.startsWith("0x")) {
    console.log("byte data input");
    // byte data
    return stackHex(input);
  }
  // else if (input.match(EMOJI_REGEX)) {
  //   const byteValueDisplay = input.replace(/'/g, "");
  //   const charCode = input.charCodeAt(0);
  //   return {
  //     input,
  //     byteValueDisplay,
  //     byteValue: "",
  //   };
  // }
  else if ((input.startsWith('"') && input.endsWith('"')) || (input.startsWith("'") && input.endsWith("'"))) {
    // string data

    const formattedInput = input.substr(1, input.length - 2);
    return stackString(formattedInput);
  } else if (!isNaN(input as any)) {
    console.log("number data input");
    // number
    return stackNumber(input);
  } else {
    console.log("what happend");
    throw "it is not a valid input";
  }

  return { input: "", byteValue: "", byteValueDisplay: "" };
};

const parse = (input: string, stackDataArray: StackData[]): StackDataResult => {
  if (input.startsWith("<") && input.endsWith(">")) {
    const finalInput = input.substr(1, input.length - 2);
    const data = parseFinalInput(finalInput);
    return { data, removeLastSize: 0 };
  } else if (input === "OP_0" || input === "OP_FALSE") {
    return { data: { byteValue: "0x00", input: "0x00", numberValue: 0, byteValueDisplay: "0" }, removeLastSize: 0 };
  } else if (input.startsWith("OP_")) {
    const sLength = stackDataArray.length;
    if (sLength < 2) throw "Empty stack error";
    const thirth: StackData | undefined = sLength === 2 ? undefined : stackDataArray[sLength - 3];
    return OP(input, stackDataArray[sLength - 1], stackDataArray[sLength - 2], thirth);
  } else {
    throw "it is not a valid input or OP code";
  }
};

export default parse;