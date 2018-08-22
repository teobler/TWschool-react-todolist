import {ACTION_TYPE} from '../actions/ACTION_TYPE';
import {IFilterItem, ISwitchFilterAction} from '../redux';

export const filterInitState = [
  { label: 'All', selected: true },
  { label: 'Completed', selected: false },
  { label: 'Active', selected: false }
];

const filters = (state: IFilterItem[] = filterInitState, action: ISwitchFilterAction) => {
  switch(action.type) {
    case ACTION_TYPE.SWITCH_FILTER:
      return state.map((filterItem: IFilterItem)=> {
        return Object.assign({}, filterItem, {
          selected: filterItem.label === action.label,
        })
      });
    default:
      return state;
  }
};

export default filters
