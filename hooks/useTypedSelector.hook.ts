import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/reducers/all";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;