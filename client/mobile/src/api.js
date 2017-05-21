import { createApi } from 'common/util'

const api = createApi('/api/v1');

export const createReport = api.post('/report');
