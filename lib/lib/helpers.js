"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const normalizr = __importStar(require("normalizr"));
const DefaultEntitiesData = {};
const normalizeData = (input, schema) => {
    const { result, entities } = normalizr.normalize(input, schema);
    const nextEntities = Object.keys(entities).reduce((res, key) => {
        res[key] = {
            data: entities[key],
        };
        return res;
    }, {});
    return { result, entities: nextEntities };
};
const getAllEntitiesData = (state) => {
    return Object.keys(state.entities).reduce((result, key) => {
        if (state.entities[key]) {
            result[key] = state.entities[key].data;
        }
        return result;
    }, {});
};
const denormalizeData = (state, input, schema) => {
    const allEntitiesData = getAllEntitiesData(state);
    return normalizr.denormalize(input, schema, allEntitiesData);
};
// normalizeEntityStatus
exports.normalizeEntityStatus = (statekey, status = 'loading') => {
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
exports.normalizeEntityData = (statekey, schema, data, status = 'loaded') => {
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
        entities: Object.assign({}, entities, { [keyType]: {
                data: { [id]: result },
                status: { [id]: status },
            } }),
    };
};
// normalizeEntityError
exports.normalizeEntityError = (statekey, error, isGlobalError = true, // 是否显示为全局错误
status = 'error') => {
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
exports.denormalizeEntityStatus = (statekey, state) => {
    const [keyType, id] = statekey.split('/');
    const entities = state.entities[keyType];
    if (entities && entities.status && entities.status[id]) {
        return entities.status[id];
    }
    return '';
};
// denormalizeEntityData
exports.denormalizeEntityData = (statekey, schema, state) => {
    const [keyType, id] = statekey.split('/');
    const entities = state.entities[keyType];
    if (entities && entities.data) {
        const input = entities.data[id];
        if (input) {
            if (schema) {
                return denormalizeData(state, input, schema);
            }
            else {
                return input;
            }
        }
    }
    return DefaultEntitiesData[statekey] || {};
};
// denormalizeEntityError
exports.denormalizeEntityError = (statekey, state) => {
    const [keyType, id] = statekey.split('/');
    const entities = state.entities[keyType];
    if (entities && entities.errors && entities.errors[id]) {
        return entities.errors[id];
    }
    return null;
};
// denormalizeEntity
exports.denormalizeEntity = (statekey, schema, state) => {
    return {
        status: exports.denormalizeEntityStatus(statekey, state),
        data: exports.denormalizeEntityData(statekey, schema, state),
        error: exports.denormalizeEntityError(statekey, state),
    };
};
// setEntityKeyDefaulData
exports.setEntityDefaulData = (statekey, data) => {
    DefaultEntitiesData[statekey] = data;
};
