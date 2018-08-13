import {ACTION_TYPE} from '../actions/ACTION_TYPE';

const initState = [
  { label: 'All', selected: true },
  { label: 'Completed' },
  { label: 'Active' }
];

export interface IFilterItem {
  label: string;
  selected?: boolean;
}

interface ISwitchFilterAction {
  type: string;
  label: string;
  selected?: boolean;
}

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
