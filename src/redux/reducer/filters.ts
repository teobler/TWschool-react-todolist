import {ACTION_TYPE} from '../actions/ACTION_TYPE';
import {IFilterItem, ISwitchFilterAction} from '../redux';

const initState = [
  { label: 'All', selected: true },
  { label: 'Completed' },
  { label: 'Active' }
];

const filters = (state: IFilterItem[] = initState, action: ISwitchFilterAction) => {
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
