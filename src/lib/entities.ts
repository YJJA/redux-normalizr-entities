import {
  IEntitiesState,
  IEntitiesAction,
} from '../interfaces/entities.interface';

const mergeStateObject = (changes: any, state: any) => {
  if (!changes) {
    return state;
  }

  if (!state) {
    return changes;
  }

  return { ...state, ...changes };
};

const mergeStateEntityData = (changesData: any, stateData: any) => {
  if (!changesData) {
    return stateData;
  }

  if (!stateData) {
    return changesData;
  }

  return Object.keys(changesData).reduce(
    (result, key) => {
      result[key] = mergeStateObject(changesData[key], stateData[key]);
      return result;
    },
    { ...stateData }
  );
};

const mergeStateEntity = (changes: any, state: any) => {
  if (!changes) {
    return state;
  }

  if (!state) {
    return changes;
  }

  return {
    data: mergeStateEntityData(changes.data, state.data),
    status: mergeStateObject(changes.status, state.status),
    errors: mergeStateObject(changes.errors, state.errors),
  };
};

const mergeState = (changes: any, state: any): any => {
  if (!changes) {
    return state;
  }

  if (!state) {
    return changes;
  }

  return Object.keys(changes).reduce(
    (result, key) => {
      result[key] = mergeStateEntity(changes[key], state[key]);
      return result;
    },
    { ...state }
  );
};

// reducer
export const entitiesReducer = (
  state = {},
  action: IEntitiesAction
): IEntitiesState => {
  const { entities } = action;

  if (entities) {
    return mergeState(entities, state);
  }

  return state;
};
