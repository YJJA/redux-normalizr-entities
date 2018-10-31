import { entitiesReducer } from '../entities';
import { denormalizeEntityStatus, denormalizeEntityData } from '../helpers';

describe('entities reducer', () => {
  it('entities render empty entitiesState', () => {
    const entitiesState = {};
    const nextEntitiesState = entitiesReducer(entitiesState, {
      type: '12',
      entities: {
        components: {
          data: {
            'components-1': { id: 1, title: 'sfsf' },
          },
          status: {
            'components-1': 'loading',
          },
        },
      },
    });

    const nextState = { entities: nextEntitiesState };

    const status = denormalizeEntityStatus(
      'components/components-1',
      nextState
    );
    expect(status).toEqual('loading');

    const data = denormalizeEntityData(
      'components/components-1',
      null,
      nextState
    );
    expect(data).toEqual({
      id: 1,
      title: 'sfsf',
    });
  });

  it('entities render notEmpty entitiesState', () => {
    const entitiesState = {
      components: {
        data: {
          'components-1': { id: 1, title: 'sfsf' },
          'components-2': { id: 2, title: 'efefef' },
        },
        status: {
          'components-1': 'loading',
        },
      },
    };

    const nextEntitiesState = entitiesReducer(entitiesState, {
      type: '12',
      entities: {
        components: {
          data: {
            'components-1': { id: 1, title: 'ccccc' },
          },
          status: {
            'components-1': 'loaded',
          },
        },
      },
    });

    const nextState = { entities: nextEntitiesState };
    const status = denormalizeEntityStatus(
      'components/components-1',
      nextState
    );
    expect(status).toEqual('loaded');

    const data = denormalizeEntityData(
      'components/components-1',
      null,
      nextState
    );
    expect(data).toEqual({
      id: 1,
      title: 'ccccc',
    });

    const data2 = denormalizeEntityData(
      'components/components-2',
      null,
      nextState
    );
    expect(data2).toEqual({
      id: 2,
      title: 'efefef',
    });
  });
});
