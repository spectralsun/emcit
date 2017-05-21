import {createApi} from 'common/util';
import {loadedReports, loadedUser, loadedUsers, createdUser, updatedUser} from 'actions'


const api = createApi('/api/v1');

export const getReports = api.post('/analytics');
export const getReport = api.get(({id}) => `/report/${id}`);

export const getUser = api.get(({id}) => `/user/${id}`);
export const getUsers = api.get('/user');
export const createUser = api.post('/user');
export const updateUser = api.put(({id}) => `/user/${id}`);
