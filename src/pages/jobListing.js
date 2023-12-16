import Job from "../components/job"
import React from "react"
import { Card, Container } from "react-bootstrap"
import JobsPagination from "../components/jobsPagination"
import { Spinner } from "react-bootstrap"


export default function JobListing({ jobs, loading, error, setPage, page, titles }) {
    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title className='mb-1' as="h6">{titles?.title}</Card.Title>
                    <Card.Subtitle style={{ fontSize : '0.75rem' }} className='text-muted mb-3'>{titles?.subTitle}</Card.Subtitle>
                    {loading && <Spinner animation="border" variant="secondary" className="align-items-center" />}
                    {error && <h6>Error. Try Refreshing.</h6>}
                    {jobs && jobs.result && jobs.result.map(job => {
                        return <Job key={job.id} job={job} />
                    })}
                    {jobs && jobs.result && jobs.result.length &&
                        <JobsPagination page={page} setPage={setPage} totalPages={2} />}
                </Card.Body>
            </Card>

        </Container>
    )

}
