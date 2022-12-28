import axios from '../../core/axios';

export default {
  get: () => axios.get('/appointments'),
  update: values => axios.patch('/appointments/' + values._id, values),
  remove: id => axios.delete('/appointments/' + id),
  add: values => axios.post('/appointments', values)
};
