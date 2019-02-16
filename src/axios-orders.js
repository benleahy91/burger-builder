import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://react-burger-builder-2-4a827.firebaseio.com/'
});

export default instance;