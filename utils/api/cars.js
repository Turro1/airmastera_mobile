import axios from '../../core/axios';

export default {
  get: () => axios.get('/cars'),
  remove: id => axios.delete('/cars/' + id),
  update: values => axios.patch('/cars/' + values._id, values),
  add: values => axios.post('/cars', values),
  show: id => axios.get('/cars/' + id)
};
