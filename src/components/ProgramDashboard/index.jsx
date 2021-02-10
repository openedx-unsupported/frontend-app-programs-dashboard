import React, { useContext, useEffect, useState } from 'react';
import { Card, CardGrid } from '@edx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

import './program-dashboard.scss';

const getPrograms = async () => {
  const { data } = await getAuthenticatedHttpClient()
    .get(`${getConfig().LMS_BASE_URL}/api/dashboard/v1/programs/`)
  return data;
}

export const ProgramDashboard = () => {
  const { authenticatedUser, config } = useContext(AppContext);
  const [programsList, setProgramsList] = useState([]);

  useEffect(async () => {
    let data = await getPrograms();
    setProgramsList(data.programs)
  }, []);

  return (
    <div className="program-dashboard">
      <CardGrid
        columnSizes={{
          xs: 12,
          lg: 6,
          xl: 4,
        }}>
        {programsList.map(program => (
          <Card className="program-card">
            <Card.Img variant="top" src={program.banner_image.large.url} />
            <Card.Body>
              <Card.Title>{program.title}</Card.Title>
              <Card.Text>{program.type}</Card.Text>
              <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-column align-items-center">
                  <p>Completed</p>
                  <div className="progress-dot completed">{program.progress.completed}</div>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <p>In Progress</p>
                  <div className="progress-dot in-progress">{program.progress.in_progress}</div>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <p>Remaining</p>
                  <div className="progress-dot not-started">{program.progress.not_started}</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </CardGrid>
    </div>
  );
}