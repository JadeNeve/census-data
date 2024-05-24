import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { DataProvider } from '../contexts/DataContext';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import PriestShips from '../pages/PriestShips/PriestShips';
import Fields from '../pages/Fields/Fields';
import FamilyVisitingPoints from '../pages/FamilyVisitingPoints/FamilyVisitingPoints';
import Unauthorised from '../pages/Unauthorised/Unauthorised';
import Dashboard from '../pages/Dashboard/Dashboard';
import Search from '../pages/Search/Search';
import { useAuth } from '../contexts/AuthProvider';
import PrivateRoute from './PrivateRoute';
import { useElderShip } from '../contexts/ElderShipContext';
import EditMemberDetails from '../pages/FamilyVisitingPoints/EditMemberDetails';

const MainRoute = () => {
  const { userLoggedIn } = useAuth();
  const { elderShips } = useElderShip();

  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={userLoggedIn ? <Dashboard /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Unauthorised />} />
        <Route element={<PrivateRoute />}>
          <Route path="/search" element={<Search />} />
          <Route path="/priestships/:elderId/:elderName" element={<PriestShips elderShips={elderShips} />} />
          <Route path="/fields/:elderId/:priestIndex/:elderName/:prstAdminSortName" element={<Fields elderShips={elderShips} />} />
          <Route path="/familyvisitingpoints/:elderId/:priestIndex/:familyIndex/:elderName/:prstAdminSortName/:surname" element={<FamilyVisitingPoints elderShips={elderShips} />} />
          <Route path="/editmemberdetails" element={<EditMemberDetails />} />
        </Route>
      </Routes>
    </DataProvider>
  );
};

export default MainRoute;
