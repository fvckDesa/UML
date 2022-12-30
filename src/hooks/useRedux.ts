// types
import type { RootState, AppDispatch } from "@src/app/store";
import type { TypedUseSelectorHook } from "react-redux";
// redux
import { useDispatch, useSelector, shallowEqual } from "react-redux";

type SelectorFn<Selected> = (state: RootState) => Selected;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useRedux<Selected = unknown>(selector: SelectorFn<Selected>) {
  const data = useAppSelector(selector, shallowEqual);
  const dispatch = useAppDispatch();
  return { dispatch, data };
}
