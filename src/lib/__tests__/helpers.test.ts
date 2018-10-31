import {
  normalizeEntityError,
  normalizeEntityData,
  normalizeEntityStatus,
  denormalizeEntity,
} from '../helpers';

describe('test helpers', () => {
  it('test helpers normalizeEntityStatus', () => {
    const { type, entities } = normalizeEntityStatus('components/001');

    expect(type).toEqual('components/001/LOADING');
    expect(entities).toEqual({
      components: {
        status: { '001': 'loading' },
      },
    });
  });

  it('test helpers normalizeEntityData', () => {
    const { type, entities } = normalizeEntityData('components/001', null, {
      id: '001',
      title: 'title 001',
    });

    expect(type).toEqual('components/001/LOADED');
    expect(entities).toEqual({
      components: {
        status: { '001': 'loaded' },
        data: {
          '001': {
            id: '001',
            title: 'title 001',
          },
        },
      },
    });
  });

  it('test helpers normalizeEntityError', () => {
    const error = new Error('error');
    const { type, entities } = normalizeEntityError('components/001', error);

    expect(type).toEqual('components/001/ERROR');
    expect(entities).toEqual({
      components: {
        errors: { '001': error },
        status: { '001': 'error' },
      },
    });
  });

  it('test helpers denormalizeEntity', () => {
    const error = new Error('error');
    const state = {
      entities: {
        components: {
          errors: {
            'components-1': error,
          },
          data: {
            'components-1': { id: 1, title: 'sfsf' },
          },
          status: {
            'components-1': 'loading',
          },
        },
      },
    };

    const entity = denormalizeEntity('components/components-1', null, state);

    expect(entity.status).toEqual('loading');
    expect(entity.data).toEqual({ id: 1, title: 'sfsf' });
    expect(entity.error).toEqual(error);
  });
});
