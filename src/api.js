import axios from 'axios';

export default {
  fetchEndpoint: (url, cb) => axios.get(url).then(r => cb(r.data)),
  fetchUrn: (url, urn, cb) => axios.get(`${url}?id=${urn}`).then(r => cb(r.data)),
};
