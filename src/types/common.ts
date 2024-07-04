import {CSSObject} from "@mui/material";

export type CSSProperties<T extends string> = Record<T, CSSObject | (() => CSSObject) | ((data: unknown) => CSSObject)>