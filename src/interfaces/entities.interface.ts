export interface IEntitiesOneState {
  status?: {
    [entityId: string]: string;
  };
  data?: {
    [entityId: string]: any;
  };
  errors?: {
    [entityId: string]: any;
  };
}

export interface IEntitiesState {
  [entityName: string]: IEntitiesOneState;
}

export interface IEState {
  entities: IEntitiesState;
  [key: string]: any;
}

export interface IEntityState<D = any> {
  status: string;
  data: D;
  error: any;
}

export interface IEntitiesAction {
  type: string;
  entities: IEntitiesState;
  [key: string]: any;
}
