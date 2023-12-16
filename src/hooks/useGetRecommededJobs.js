import { useReducer, useEffect } from 'react'
import {DEFAULT_SIZE,PROFILE} from '../utils/constant'
import axios from 'axios'

const BASE_URL = '/api/v1/recommendations'

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
    case ACTIONS.UPDATE_HAS_NEXT_PAGE:
      return { ...state, hasNextPage: action.payload.hasNextPage }
    default:
      return state
  }
}

export default function useGetRecommendedJobs(page) {
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: false })

  useEffect(() => {
      const cancelToken1 = axios.CancelToken.source()
      dispatch({ type: ACTIONS.MAKE_REQUEST })
      axios.get(BASE_URL, {
        cancelToken: cancelToken1.token,
        params: { pageNum: page - 1, size: DEFAULT_SIZE, type: PROFILE },
        headers : {userId : "Test", correlationId : Math.random()}
      }).then(res => {
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } })
      }).catch(e => {
        if (axios.isCancel(e)) return
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
      })

      return () => {
        cancelToken1.cancel()
      }
    },[page]
  )

  return state
}