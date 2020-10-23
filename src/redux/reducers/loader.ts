import {STARTER, FINISH} from '../actions/actionTypes';

interface IAction {
  type: 'STARTER' | 'FINISH';
  payload: any;
}

const initialState = {
  loading: false,
};

const loader = (state = initialState, action: IAction) => {
  const {type, payload} = action;
  switch (type) {
    case STARTER:
      return {
        loading: true,
      };
    case FINISH:
      return {
        loading: false,
      };
    default:
      return state;
  }
};

export default loader;
