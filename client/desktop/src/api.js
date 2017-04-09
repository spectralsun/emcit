import { request } from 'common/util'

import { loadedReports } from 'actions'

export const getReports = filters => dispatch => {
    console.log(filters)
    request.post('/api/v1/analytics', filters)
        .then(res => dispatch(loadedReports(res.data)))
        //.catch()
}
