import * as normalizr from 'normalizr';
import { IEState, IEntityState, IEntitiesAction } from '../interfaces/entities.interface';
export declare const normalizeEntityStatus: (statekey: string, status?: string) => IEntitiesAction;
export declare const normalizeEntityData: (statekey: string, schema: normalizr.schema.Array | normalizr.schema.Entity | normalizr.schema.Object | normalizr.schema.Union | normalizr.schema.Values | normalizr.schema.Array[] | normalizr.schema.Entity[] | normalizr.schema.Object[] | normalizr.schema.Union[] | normalizr.schema.Values[] | {
    [key: string]: normalizr.schema.Array | normalizr.schema.Entity | normalizr.schema.Object | normalizr.schema.Union | normalizr.schema.Values | normalizr.schema.Array[] | normalizr.schema.Entity[] | normalizr.schema.Object[] | normalizr.schema.Union[] | normalizr.schema.Values[] | any | normalizr.Schema[];
} | null, data: any, status?: string) => IEntitiesAction;
export declare const normalizeEntityError: (statekey: string, error: any, isGlobalError?: boolean, status?: string) => IEntitiesAction;
export declare const denormalizeEntityStatus: (statekey: string, state: IEState) => string;
export declare const denormalizeEntityData: (statekey: string, schema: normalizr.schema.Array | normalizr.schema.Entity | normalizr.schema.Object | normalizr.schema.Union | normalizr.schema.Values | normalizr.schema.Array[] | normalizr.schema.Entity[] | normalizr.schema.Object[] | normalizr.schema.Union[] | normalizr.schema.Values[] | {
    [key: string]: normalizr.schema.Array | normalizr.schema.Entity | normalizr.schema.Object | normalizr.schema.Union | normalizr.schema.Values | normalizr.schema.Array[] | normalizr.schema.Entity[] | normalizr.schema.Object[] | normalizr.schema.Union[] | normalizr.schema.Values[] | any | normalizr.Schema[];
} | null, state: IEState) => any;
export declare const denormalizeEntityError: (statekey: string, state: IEState) => any;
export declare const denormalizeEntity: <D = any>(statekey: string, schema: normalizr.schema.Array | normalizr.schema.Entity | normalizr.schema.Object | normalizr.schema.Union | normalizr.schema.Values | normalizr.schema.Array[] | normalizr.schema.Entity[] | normalizr.schema.Object[] | normalizr.schema.Union[] | normalizr.schema.Values[] | {
    [key: string]: normalizr.schema.Array | normalizr.schema.Entity | normalizr.schema.Object | normalizr.schema.Union | normalizr.schema.Values | normalizr.schema.Array[] | normalizr.schema.Entity[] | normalizr.schema.Object[] | normalizr.schema.Union[] | normalizr.schema.Values[] | any | normalizr.Schema[];
} | null, state: IEState) => IEntityState<D>;
export declare const setEntityDefaulData: (statekey: string, data: any) => void;
