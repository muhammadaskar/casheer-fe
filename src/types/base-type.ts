/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BaseType {
  meta: MetaType;
  data: any;
}

interface MetaType {
  code: number;
  message: string;
}
