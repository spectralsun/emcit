import { createApi } from 'common/util'

const api = createApi('/api/v1');

export const loginUser = api.post('/account/login');
