// types
import type { RootState, AppDispatch } from "@src/app/store";
// redux
import { useDispatch, useSelector, shallowEqual } from "react-redux";

type SelectorFn<Selected> = (state: RootState) => Selected;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector = <Selected = unknown>(
  selector: SelectorFn<Selected>
): Selected => useSelector(selector, shallowEqual);

export function useRedux<Selected = unknown>(selector: SelectorFn<Selected>) {
  const data = useAppSelector(selector);
  const dispatch = useAppDispatch();
  return { dispatch, data };
}
