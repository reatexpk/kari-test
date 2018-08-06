import { combineReducers } from 'redux';

const counter = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'ADD_VALUE':
      return { ...state, count: action.count };
    default:
      return state;
  }
};

export default combineReducers({
  counter,
});
