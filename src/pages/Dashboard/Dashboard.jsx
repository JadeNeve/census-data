import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper, Typography, CircularProgress, IconButton, Drawer, AppBar, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import Sidebar from '../../navigation/Sidebar';

const Dashboard = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/ElderShip/');
                setPlaces(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const countMembersInEldership = (priests) => {
        return priests.reduce((total, priest) => {
            const families = Object.values(priest.families || {});
            return total + families.reduce((familyTotal, family) => familyTotal + family.members.length, 0);
        }, 0);
    };

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
            <CircularProgress />
        </div>;
    }

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <AppBar position="fixed" color="primary" sx={{ display: { md: 'none' } }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 }
                }}
            >
                <Sidebar />
            </Drawer>

            <Drawer
                variant="permanent"
                sx={{
                    width: 250,
                    flexShrink: 0,
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': { width: 250, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Sidebar />
            </Drawer>

            <main style={{ flexGrow: 1, p: 3, width: { md: `calc(100% - 250px)` }, mt: { sm: 8, xs: 8, md: 0 } }}>
                <Toolbar />
                <Typography variant="h4" style={{ margin: '10px 0', padding: '0 20px' }}>DASHBOARD</Typography>
                <Grid container spacing={4} style={{ padding: '0 20px' }}>
                    {places.map((elder, index) => {
                        const elderName = elder.name.split(',')[0];
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <Paper style={{
                                    padding: '25px 30px',
                                    borderRadius: '8px',
                                    backgroundColor: '#fff',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }} elevation={0}>
                                    <div style={{ color: "#273757", fontWeight: "bold", marginBottom: 20 }}>
                                        <h2>Elder {elderName}</h2>
                                    </div>
                                    <Typography variant="body1">
                                        Members Total: {countMembersInEldership(elder.priests)}
                                    </Typography>
                                    <Typography variant="body1">
                                        {elder.RsdntCongrName} OAC
                                    </Typography>
                                    <Typography variant="body1">
                                        Priests Total: {elder.priests.length}
                                    </Typography>
                                    <Typography variant="body1" marginBottom={2}>
                                        {elder.OverseerShip}
                                    </Typography>
                                    <div style={{ marginTop: '20px', display: 'inline-block' }}>
                                        <Link 
                                            to={{
                                                pathname: `/priestships/${elder.id}/${encodeURIComponent(elderName)}`,
                                            }}
                                            state={{
                                                priests: elder.priests,
                                                elderName: elderName,
                                                RsdntCongrName: elder.RsdntCongrName,
                                                elderId: elder.id,
                                            }}
                                            style={{
                                                textDecoration: 'none',
                                                color: '#273757',
                                                fontWeight: 500,
                                                borderBottom: '0.5px solid #273757',
                                                paddingBottom: '5px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            View Congregation
                                        </Link>
                                    </div>
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </main>
        </div>
    );
};

export default Dashboard;
