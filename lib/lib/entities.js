"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mergeStateObject = (changes, state) => {
    if (!changes) {
        return state;
    }
    if (!state) {
        return changes;
    }
    return Object.assign({}, state, changes);
};
const mergeStateEntityData = (changesData, stateData) => {
    if (!changesData) {
        return stateData;
    }
    if (!stateData) {
        return changesData;
    }
    return Object.keys(changesData).reduce((result, key) => {
        result[key] = mergeStateObject(changesData[key], stateData[key]);
        return result;
    }, Object.assign({}, stateData));
};
const mergeStateEntity = (changes, state) => {
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
const mergeState = (changes, state) => {
    if (!changes) {
        return state;
    }
    if (!state) {
        return changes;
    }
    return Object.keys(changes).reduce((result, key) => {
        result[key] = mergeStateEntity(changes[key], state[key]);
        return result;
    }, Object.assign({}, state));
};
// reducer
exports.entitiesReducer = (state = {}, action) => {
    const { entities } = action;
    if (entities) {
        return mergeState(entities, state);
    }
    return state;
};
