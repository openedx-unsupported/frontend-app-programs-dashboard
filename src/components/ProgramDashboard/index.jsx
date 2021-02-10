import React, { useContext } from 'react';
import { Card, CardGrid } from '@edx/paragon';
import { AppContext } from '@edx/frontend-platform/react';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

import './program-dashboard.scss';

  const getPrograms = async () => {
  const { data } = await getAuthenticatedHttpClient()
    .get(`${getConfig().LMS_BASE_URL}/api/dashboard/v1/programs/`);
  return unpackAccountResponseData(data);
}

export const ProgramDashboard = () => {
  const { authenticatedUser, config } = useContext(AppContext);
  let data = getPrograms();
  console.log(data)
  return (
    <div className="program-dashboard">
      <CardGrid
        columnSizes={{
          xs: 12,
          lg: 6,
          xl: 4,
        }}>
        <Card className="program-card">
          <Card.Img variant="top" src="https://source.unsplash.com/400x200/?nature,flower" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <div className="d-flex flex-row justify-content-between">
              <p>Completed</p>
              <p>In Progress</p>
              <p>Remaining</p>
            </div>
          </Card.Body>
        </Card>
      </CardGrid>
    </div>
  );
}