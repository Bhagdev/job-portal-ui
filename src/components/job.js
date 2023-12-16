import React from 'react'
import { Card, Badge } from 'react-bootstrap'


export default function Job({ job }) {

  return (
    <Card style={{ width: '30rem' }} className="mb-2">
      <Card.Body>
        <div className="d-flex align-items-stretch row">
         <div><img className="d-none d-md-block p-1" width="50rem" height="30rem" alt={job.company} src={job.logoUrl} /></div>
          <div className="p-2">
            <Card.Title as="h6" className='mb-2'>
              {job.title}
            </Card.Title>
            <Card.Subtitle className='text-muted'>
                {job.company.companyName}
            </Card.Subtitle>
            <Card.Text>
            <span className="mb-2 text-muted font-weight-light">{job.location.city},{job.location.state},{job.location.country}</span><br></br>
            {job.skills && job.skills.map(skill => <Badge className='mr-1' mr-1 variant="secondary">{skill}</Badge>)}
            {job.tags && job.tags.map(tag => <Badge className='mr-1' variant="secondary">{tag}</Badge>)}     
            </Card.Text>          
          </div>        
        </div>    
      </Card.Body>
    </Card>
  )
}
