import axios from 'axios';
import Constants from 'expo-constants';
const { manifest } = Constants;

axios.defaults.baseURL =
  'http://airmasters-backend.herokuapp.com'

console.log(axios.defaults.baseURL);

export default axios;
