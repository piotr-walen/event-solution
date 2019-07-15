import { MinLength, validate, validateSync, IsEmail } from "class-validator";
import { plainToClass } from "class-transformer";
import { FormValues, FormErrors, FormTouched } from "./form.state";

export enum FormActionType {
  SET_VALUES = "SET_VALUES",
  CLEAR_ALL_VALUES = "CLEAR_ALL_VALUES",
  SET_ERRORS = "SET_ERRORS",
  SET_TOUCHED = "SET_TOUCHED",
  SET_ALL_TOUCHED = "SET_ALL_TOUCHED",
  CLEAR_ALL_TOUCHED = "CLEAR_ALL_TOUCHED",
  SET_SUBMITTING = "SET_SUBMITTING",
  SET_SUBMIT_ERROR = "SET_SUBMIT_ERROR",
}

export interface SetValueAction {
  type: FormActionType.SET_VALUES;
  payload: Partial<FormValues>;
}

export interface ClearAllValues {
  type: FormActionType.CLEAR_ALL_VALUES;
}

export interface SetErrorsAction {
  type: FormActionType.SET_ERRORS;
  payload: Partial<FormErrors>;
}

export interface SetTouchedAction {
  type: FormActionType.SET_TOUCHED;
  payload: Partial<FormTouched>;
}

export interface SetAllTouched {
  type: FormActionType.SET_ALL_TOUCHED;
}

export interface ClearAllTouched {
  type: FormActionType.CLEAR_ALL_TOUCHED;
}

export interface SetSubmittingAction {
  type: FormActionType.SET_SUBMITTING;
  payload: boolean;
}

export interface SetSubmitErrorAction {
  type: FormActionType.SET_SUBMIT_ERROR;
  payload: string | null;
}

export type FormAction =
  | ClearAllTouched
  | ClearAllValues
  | SetAllTouched
  | SetValueAction
  | SetErrorsAction
  | SetTouchedAction
  | SetSubmittingAction
  | SetSubmitErrorAction;
