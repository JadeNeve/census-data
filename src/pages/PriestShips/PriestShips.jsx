import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, Paper, Container } from '@mui/material';

const PriestShips = () => {
  const { state } = useLocation();
  const { priests, elderName, RsdntCongrName, elderId } = state || {};

  if (!priests || priests.length === 0) {
    return <Container><Typography variant="h6">No priests data available...</Typography></Container>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Priests in Elder {elderName} - {RsdntCongrName}
      </Typography>
      <Paper style={{ padding: '20px', margin: '20px 0' }}>
        <List>
          {priests.map((priest, index) => (
            <ListItem key={index} style={{ borderBottom: '1px solid #ddd' }}>
              <ListItemText
                primary={priest.prstAdminSortName}
                secondary={`Total Families: ${Object.keys(priest.families).length}`}
              />
              <Link 
                to={{
                  pathname: `/fields/${elderId}/${index}/${encodeURIComponent(elderName)}/${encodeURIComponent(priest.prstAdminSortName)}`
                }}
                state={{
                  families: Object.values(priest.families), 
                  elderName, 
                  prstAdminSortName: priest.prstAdminSortName,
                  elderId,
                  priestIndex: index
                }}
                style={{ textDecoration: 'none', marginLeft: '10px' }}
              >
                <Typography variant="body2" style={{ color: '#3f51b5' }}>
                  View Details
                </Typography>
              </Link>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default PriestShips;
