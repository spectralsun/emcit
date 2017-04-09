import { request } from 'common/util'

import { loadedReports } from 'actions'

export const getReports = filters => dispatch => {
    console.log(filters)
    request.get('/api/v1/report')
        .then(res => dispatch(loadedReports(res.data)))
        //.catch()
}
