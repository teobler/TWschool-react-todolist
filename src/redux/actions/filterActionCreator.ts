import {ACTION_TYPE} from './ACTION_TYPE';

export const filterActionCreator = (label: string) => {
  return {type: ACTION_TYPE.SWITCH_FILTER, label};
};
