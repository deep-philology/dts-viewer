import Vue from 'vue';
import Vuex from 'vuex';

import api from './api';
import { SET_ENDPOINT, LOAD_ENDPOINT, SET_LOADING, LOAD_COLLECTIONS, LOAD_COLLECTION } from './constants';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    endpoint: '',
    loading: false,
    id: '',
    type: '',
    context: '',
    documentsEndpoint: '',
    collectionsEndpoint: '',
    navigationEndpoint: '',
    collectionsOrder: [],
    collections: {},
  },
  mutations: {
    [SET_LOADING]: (state, loading) => {
      state.loading = loading;
    },
    [SET_ENDPOINT]: (state, url) => {
      state.endpoint = url;
    },
    [LOAD_ENDPOINT]: (state, data) => {
      state.id = data['@id'];
      state.context = data['@context'];
      state.type = data['@type'];
      state.collectionsEndpoint = data.collections;
      state.documentsEndpoint = data.documents;
      state.navigationEndpoint = data.navigation;
    },
    [LOAD_COLLECTIONS]: (state, data) => {
      // @@@ might need to filter out data to make sure it's only of @type === 'Collection'
      state.collectionsOrder = data.member.map(m => m['@id']);
      state.collections = data.member.reduce((acc, m) => {
        acc[m['@id']] = m;
        return acc;
      }, {});
    },
    [LOAD_COLLECTION]: (state, data) => {
      const subOrder = data.member.filter(m => m['@type'] === 'Collection').map(m => m['@id']);
      state.collections = {
        ...state.collections,
        [data['@id']]: {
          ...data,
          id: data['@id'],
          type: data['@type'],
          context: data['@context'],
          collectionsOrder: subOrder,
        },
      };
    },
  },
  getters: {
    collectionsUrl: state => `${state.endpoint}${state.collectionsEndpoint.replace(state.id, '')}`,
  },
  actions: {
    [LOAD_COLLECTION]: ({ commit, dispatch, getters }, { urn }) => {
      const cb = (data) => {
        commit(LOAD_COLLECTION, data);
        data.member.forEach((member) => {
          if (member['@type'] === 'Collection') {
            return dispatch(LOAD_COLLECTION, { urn: member['@id'] });
          }
          return null;
        });
      };
      return api.fetchUrn(getters.collectionsUrl, urn, cb);
    },
    [LOAD_COLLECTIONS]: ({ commit, dispatch }, { url }) => api.fetchEndpoint(url, (data) => {
      commit(LOAD_COLLECTIONS, data);
      data.member.forEach((member) => {
        if (member['@type'] === 'Collection') {
          return dispatch(LOAD_COLLECTION, { urn: member['@id'] });
        }
        return Promise();
      });
    }),
    [LOAD_ENDPOINT]: ({ commit, dispatch }, { url }) => {
      commit(SET_LOADING, true);
      return api.fetchEndpoint(url, (data) => {
        commit(SET_ENDPOINT, url);
        commit(LOAD_ENDPOINT, data);
        const collectionsUrl = `${url}${data.collections.replace(data['@id'], '')}`;
        dispatch(LOAD_COLLECTIONS, { url: collectionsUrl }).then(() => {
          commit(SET_LOADING, false);
        });
      });
    },
  },
});
