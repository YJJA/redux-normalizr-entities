import * as normalizr from 'normalizr';
import {
  IEState,
  IEntityState,
  IEntitiesAction,
} from '../interfaces/entities.interface';

const DefaultEntitiesData: { [key: string]: any } = {};

const normalizeData = (input: any, schema: normalizr.Schema) => {
  const { result, entities } = normalizr.normalize(input, schema);
  const nextEntities = Object.keys(entities).reduce((res: any, key: string) => {
    res[key] = {
      data: entities[key],
    };
    return res;
  }, {});

  return { result, entities: nextEntities };
};

const getAllEntitiesData = (state: IEState) => {
  return Object.keys(state.entities).reduce((result: any, key: string) => {
    if (state.entities[key]) {
      result[key] = state.entities[key].data;
    }
    return result;
  }, {});
};

const denormalizeData = (
  state: IEState,
  input: any,
  schema: normalizr.Schema
) => {
  const allEntitiesData = getAllEntitiesData(state);
  return normalizr.denormalize(input, schema, allEntitiesData);
};

// normalizeEntityStatus
export const normalizeEntityStatus = (
  statekey: string,
  status: string = 'loading'
): IEntitiesAction => {
  const [keyType, id] = statekey.split('/');
  return {
    type: `${statekey}/${status.toLocaleUpperCase()}`,
    entities: {
      [keyType]: {
        status: { [id]: status },
      },
    },
  };
};

// normalizeEntityData
export const normalizeEntityData = (
  statekey: string,
  schema: normalizr.Schema | null,
  data: any,
  status: string = 'loaded'
): IEntitiesAction => {
  const [keyType, id] = statekey.split('/');
  const type = `${statekey}/${status.toLocaleUpperCase()}`;

  let result = data;
  let entities = null;

  if (schema) {
    const normalizeResult = normalizeData(data, schema);
    result = normalizeResult.result;
    entities = normalizeResult.entities;
  }

  return {
    type,
    entities: {
      ...entities,
      [keyType]: {
        data: { [id]: result },
        status: { [id]: status },
      },
    },
  };
};

// normalizeEntityError
export const normalizeEntityError = (
  statekey: string,
  error: any,
  isGlobalError: boolean = true, // 是否显示为全局错误
  status: string = 'error'
): IEntitiesAction => {
  const [keyType, id] = statekey.split('/');
  return {
    type: `${statekey}/${status.toLocaleUpperCase()}`,
    error: isGlobalError ? error : null,
    entities: {
      [keyType]: {
        status: { [id]: status },
        errors: { [id]: error },
      },
    },
  };
};

// denormalizeEntityStatus
export const denormalizeEntityStatus = (
  statekey: string,
  state: IEState
): string => {
  const [keyType, id] = statekey.split('/');
  const entities = state.entities[keyType];
  if (entities && entities.status && entities.status[id]) {
    return entities.status[id];
  }
  return '';
};

// denormalizeEntityData
export const denormalizeEntityData = (
  statekey: string,
  schema: normalizr.Schema | null,
  state: IEState
): any => {
  const [keyType, id] = statekey.split('/');
  const entities = state.entities[keyType];
  if (entities && entities.data) {
    const input = entities.data[id];
    if (input) {
      if (schema) {
        return denormalizeData(state, input, schema);
      } else {
        return input;
      }
    }
  }

  return DefaultEntitiesData[statekey] || {};
};

// denormalizeEntityError
export const denormalizeEntityError = (
  statekey: string,
  state: IEState
): any => {
  const [keyType, id] = statekey.split('/');
  const entities = state.entities[keyType];
  if (entities && entities.errors && entities.errors[id]) {
    return entities.errors[id];
  }

  return null;
};

// denormalizeEntity
export const denormalizeEntity = <D = any>(
  statekey: string,
  schema: normalizr.Schema | null,
  state: IEState
): IEntityState<D> => {
  return {
    status: denormalizeEntityStatus(statekey, state),
    data: denormalizeEntityData(statekey, schema, state),
    error: denormalizeEntityError(statekey, state),
  };
};

// setEntityKeyDefaulData
export const setEntityDefaulData = (statekey: string, data: any) => {
  DefaultEntitiesData[statekey] = data;
};
