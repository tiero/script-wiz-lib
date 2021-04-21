import IStackData from "../../model/IStackData";
declare const OP_2DROP: () => IStackData[];
declare const OP_2DUP: (stackData1: IStackData, stackData2: IStackData) => IStackData[];
declare const OP_3DUP: (stackData1: IStackData, stackData2: IStackData, stackData3: IStackData) => IStackData[];
declare const OP_2OVER: (stackData1: IStackData, stackData2: IStackData) => IStackData[];
declare const OP_2SWAP: (stackData1: IStackData, stackData2: IStackData, stackData3: IStackData, stackData4: IStackData) => IStackData[];
declare const OP_DROP: () => IStackData[];
declare const OP_DUP: (stackData1: IStackData) => IStackData[];
declare const OP_NIP: (stackData1: IStackData, stackData2: IStackData) => IStackData[];
declare const OP_OVER: (stackData: IStackData) => IStackData[];
declare const OP_SWAP: (stackData1: IStackData, stackData2: IStackData) => IStackData[];
export { OP_2DROP, OP_2DUP, OP_3DUP, OP_2OVER, OP_2SWAP, OP_DROP, OP_DUP, OP_NIP, OP_OVER, OP_SWAP };
