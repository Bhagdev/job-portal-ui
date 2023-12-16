import { useReducer, useEffect } from 'react'
import axios from 'axios'
import {DEFAULT_SIZE} from '../utils/constant'

const BASE_URL = '/api/v1/search/jobs'

const ACTIONS = {
  MAKE_REQUEST: 'make-request',
  GET_DATA: 'get-data',
  ERROR: 'error',
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: [] }
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs }
    case ACTIONS.ERROR:
      return { ...state, loading: false, error: action.payload.error, jobs: [] }
    default:
      return state
  }
}

export default function useSearchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: false })

  useEffect(() => {
    if ((params.keyword || params.location) && page) {
      const cancelToken = axios.CancelToken.source()
      dispatch({ type: ACTIONS.MAKE_REQUEST })
      axios.post(BASE_URL, {
        location: params.location
      }, {
        cancelToken: cancelToken.token,
        params: { pageNum: page - 1, size: DEFAULT_SIZE, query: params.keyword },
        headers : {correlationId : Math.random()}
      }).then(res => {
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } })
      }).catch(e => {
        if (axios.isCancel(e)) return
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
      })
      return () => {
        cancelToken.cancel()
      }
    }
  }, [params, page])

  return state
}