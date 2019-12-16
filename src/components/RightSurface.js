import React from 'react';
import OrdersList from './OrdersList';
import Search from './Search';
import '../shared/style.css';
import { Grid , Typography, Box, Fab, IconButton, Dialog, DialogActions, DialogContent, Button, DialogTitle} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SortIcon from '@material-ui/icons/Sort';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const RightSurface = (props) => {
      
    return(
            <>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Box display="flex" flexDirection="row" p={2} >
                            <Box p={1} display="flex" alignItems="center" >
                                <DashboardIcon fontSize="large"/>
                            </Box>
                            <Box p={1}>
                                <Typography variant="h4">Dashboard</Typography>
                            </Box>
                        </Box>      
                    </Grid>
                    <Grid item xs={12} className="text-center">
                        <Search searchOrdersListByText={(text) => props.searchOrdersListByText(text)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" flexWrap="wrap">
                            <Box display="flex" flexDirection="row" p={2}>
                                <Box p={0.5} pl={1} display="flex" alignItems="center" >
                                    <Typography variant="subtitle1" display="inline">Showing</Typography>
                                </Box>
                                <Box p={0.5} display="flex" alignItems="center" >
                                    <Typography variant="h6" display="inline">{props.ordersList.queried.length}</Typography>
                                </Box>
                                <Box p={0.5} display="flex" alignItems="center" >
                                    <Typography variant="subtitle1" display="inline" >results for</Typography>
                                </Box>
                                <Box p={0.5} display="flex" alignItems="center" > 
                                    <Typography variant="h6" display="inline">{props.ordersList.query.length === 0 ? props.ordersList.queried.length : props.ordersList.query}</Typography>
                                </Box>
                            </Box>  
                            <Box flexGrow={1}></Box>
                            <Box>
                                <Fab aria-label="sort" onClick={() => {props.sortQueriedOrders(0)}}>
                                    <SortIcon />
                                </Fab>
                            </Box>  
                        </Box>        
                    </Grid>
                    <Grid item xs={12} className="text-center">
                        <OrdersList 
                            ordersList={props.ordersList} 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                                display="flex"
                                justifyContent="center"
                                p={5}
                        >
                            <Box p={2}>
                                <IconButton color="inherit" aria-label="prev" onClick={() => props.prevOrders()}>
                                    <KeyboardArrowLeftIcon fontSize="large"/>
                                </IconButton>
                            </Box>
                            <Box p={2} display="flex" alignItems="center">
                                <Typography variant="subtitle1" display="inline">{(props.ordersList.currentIndex-9) > 0 ? props.ordersList.currentIndex-9 : 0} - {props.ordersList.currentIndex} of {props.ordersList.queried.length}</Typography>
                            </Box>
                            <Box p={2}>
                                <IconButton color="inherit" aria-label="next" onClick={() => props.nextOrders()}>
                                    <KeyboardArrowRightIcon fontSize="large"/>
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>
            </Grid>
            
        </>
    );
}

export default RightSurface;