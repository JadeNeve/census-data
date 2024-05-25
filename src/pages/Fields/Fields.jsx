import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Typography, Paper, Container } from '@mui/material';
import { useElderShip } from '../../contexts/ElderShipContext';

const Fields = () => {
  const { elderId, priestIndex, elderName, prstAdminSortName } = useParams();
  const { state } = useLocation();
  const { elderShips } = useElderShip();

  const elderShip = elderShips.find(elder => elder.id === elderId);
  const priest = elderShip?.priests[priestIndex];
  const families = priest?.families || [];

  if (!families || families.length === 0) {
    return <Container><Typography variant="h6">No family data available...</Typography></Container>;
  }

  const groupedData = families.reduce((acc, family) => {
    const key = `${family.members[0].Surname}_${family.MemAddress}`;
    if (!acc[key]) {
      acc[key] = { ...family, members: [] };
    }
    acc[key].members = acc[key].members.concat(family.members);
    return acc;
  }, {});

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Families under {prstAdminSortName} in Elder {decodeURIComponent(elderName)}
      </Typography>
      {Object.keys(groupedData).map((key, index) => {
        const [surname, address] = key.split('_');
        const familyData = groupedData[key];

        return (
          <Paper key={index} style={{ padding: '20px', margin: '20px 0' }}>
            <Typography variant="h6">{surname}</Typography>
            <Typography>Address: {address}</Typography>
            {familyData.members.map((member, idx) => (
              <div key={idx}>
                <Typography>{member.Name1} {member.Name2} {member.Surname}</Typography>
                <Typography variant="body2">CenGroup: {member.CenGroup}</Typography>
                <Typography variant="body2">Age: {member.Age}</Typography>
              </div>
            ))}
            <Link 
              to={{
                pathname: `/familyvisitingpoints/${elderId}/${priestIndex}/${index}/${encodeURIComponent(elderName)}/${encodeURIComponent(prstAdminSortName)}/${encodeURIComponent(surname)}`,
              }}
              state={{
                family: familyData,
                elderId,
                priestIndex,
                familyIndex: index
              }}
              style={{ textDecoration: 'none', marginTop: '10px' }}
            >
              <Typography color="primary">Edit Family Visiting Point</Typography>
            </Link>
          </Paper>
        );
      })}
      {Object.keys(groupedData).length === 0 && <Typography>No family visiting points found.</Typography>}
    </Container>
  );
};

export default Fields;
