import React from 'react';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <img src="/path-to-your-image.jpg" alt="User" className="sidebar-user-image" />
                <h3 className="sidebar-user-name">User Name</h3>
            </div>
            <div className="sidebar-links">
                <Link to="/dashboard" className="sidebar-link">
                    <DashboardIcon /><span>Dashboard</span>
                </Link>
                <Link to="/search" className="sidebar-link">
                    <SearchIcon /><span>Search</span>
                </Link>
                <Link to="/logout" className="sidebar-link">
                    <ExitToAppIcon /><span>Logout</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
