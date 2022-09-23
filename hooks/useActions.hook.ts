import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { allSagaActions } from '@ActionCreators/sagaActions';
import { allExternalActions } from "@ActionCreators/externalActions";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({
    ...allSagaActions,
    ...allExternalActions
  }, dispatch);
};