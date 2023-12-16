import React, { useState } from 'react';
import useSearchJobs from './hooks/useSearchJobs'
import useGetRecommendedJobs from './hooks/useGetRecommededJobs';
import { Container } from 'react-bootstrap'
import Header from './components/navbar';
import JobListing from './pages/jobListing'
import { useEffect } from 'react';
import { RECOMMEND_TITLE, PROFILE_RECOMMEND_TITLE, SEARCH_RESULT_TITLE } from './utils/constant';

function App() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const [titles, setTitles] = useState({})
  const [jobsFetchResponse, setJobsFetchResponse] = useState({})
  const recommendedJobs = useGetRecommendedJobs(page)
  const searchedJobs = useSearchJobs(params, page)

  useEffect(() => {
    setJobsFetchResponse(recommendedJobs)
    setTitles({title: RECOMMEND_TITLE, subTitle: PROFILE_RECOMMEND_TITLE})
  },[recommendedJobs])

  useEffect(() => {
    setJobsFetchResponse(searchedJobs)
    setTitles({title: SEARCH_RESULT_TITLE, subTitle: ""})
  }, [searchedJobs])

  function handleSearchParamChange(e) {
    const param = e.target.name
    const value = e.target.value
    setPage(1)
    setParams(prevParams => {
      return { ...prevParams, [param]: value }
    })

  }


  return (
    <Container>
      <Header params={params} onParamChange={handleSearchParamChange} />
      <JobListing jobs={jobsFetchResponse.jobs}
        loading={jobsFetchResponse.loading}
        error={jobsFetchResponse.error}
        titles = {titles}
        setPage={setPage}
        page={page} />
    </Container>
  )
}

export default App;
