import React from 'react';
import '../shared/style.css';
import { Grid, Card, CardContent, DialogTitle, Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Badge, Button, Dialog, DialogContent, DialogActions } from '@material-ui/core';


const Order = (props) => {
    return(
        <>
            <Card>
                <CardContent>
                    <Grid container>
                        <Box display="flex">
                            <Box m={2} mb={0}>
                                <Typography align="left" variant="overline" display="block">Order Id</Typography>
                                <Typography align="left" variant="body1" display="block">{props.orderId}</Typography>
                            </Box>
                            <Box m={2} mb={0}>
                                <Typography align="left" variant="overline" display="block">Customer Id</Typography>
                                <Typography align="left" variant="body1" display="block">{props.customerId}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid container>
                        <Box display="flex">
                            <Box m={2} mb={0}> 
                                <Typography align="left" variant="overline" display="block">Pincode</Typography>
                                <Typography align="left" variant="body1" display="block">{props.deliveryPincode}</Typography>
                            </Box>
                            <Box m={2} mb={0}>
                                <Typography align="left" variant="overline" display="block">Date</Typography>
                                <Typography align="left" variant="body1" display="block">{props.orderDate}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid container>
                        <Grid xs={12} item>
                            <Box p={1} m={1} className="ListArea">
                                <List>
                                    { 
                                        props.items.split(";").slice(0, 3).map((item, index) => {
                                            var itemArray = item.split(":")
                                        return (
                                            <ListItem key={index}>
                                                <ListItemText>
                                                    <Typography align="left" variant="body1">{itemArray[0]}</Typography>
                                                </ListItemText>
                                                <ListItemSecondaryAction>
                                                    <Badge badgeContent={itemArray[1]} color="primary"></Badge>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        )
                                        })
                                    }
                                    { props.items.split(";").length > 3 ? 
                                            <ListItem>
                                                <ListItemText className="text-center">
                                                    <Button size="small" onClick={() => props.handleDialogOpen(props.items)}>View more</Button>
                                                </ListItemText>
                                            </ListItem>: ""
                                    }
                                </List>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}

export default Order;