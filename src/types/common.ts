import { SystemStyleObject } from '@mui/system';
import {CSSObject} from "@mui/material";

export type CSSProperties<T extends string> = Record<T, CSSObject | SystemStyleObject | (() => CSSObject) | ((data: unknown) => CSSObject)>