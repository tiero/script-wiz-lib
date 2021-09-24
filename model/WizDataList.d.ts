import WizData from "@script-wiz/wiz-data";
export declare type WizDataList = {
    inputHexes: string[];
    main: WizData[];
    alt: WizData[];
    flow: boolean[];
    altFlow: boolean[];
    isStackFailed: boolean;
    errorMessage?: unknown;
};
