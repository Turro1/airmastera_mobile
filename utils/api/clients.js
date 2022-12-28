import axios from '../../core/axios';

export default {
  get: () => axios.get('/clients'),
  add: values => axios.post('/clients', values),
  update: values => axios.patch('/clients/' + values._id, values),
  remove: id => axios.delete('/clients/' + id),
  show: id => axios.get('/clients/' + id),
  };