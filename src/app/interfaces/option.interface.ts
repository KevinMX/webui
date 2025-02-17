export type BaseOptionValueType = string | number;
export type RadioOptionValueType = string | number | boolean;
export type SelectOptionValueType = string | number | string[] | number[];

export interface Option<T = BaseOptionValueType> {
  label: string;
  value: T;
}

export type MapOption = [
  value: string,
  label: string,
];

export interface RadioOption<T = RadioOptionValueType> extends Option<T> {
  tooltip?: string;
}

export interface SelectOption<T = SelectOptionValueType> extends Option<T> {
  disabled?: boolean;
  tooltip?: string;
}
