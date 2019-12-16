import React, { useState } from 'react';
import '../shared/style.css';
import { Button, Box, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, ListItemSecondaryAction, Badge, Typography} from '@material-ui/core';
import Order from './Order';

const OrdersList = (props) => {

        const [open, setOpen] = useState(false);
        const [dialogData, setDialogData] = useState("");

        const handleDialogOpen = (data) => {
            setOpen(true)
            setDialogData(data)
        }

        const handleDialogClose = () => {
            setOpen(false)
        }
   
        //console.log(this.props)
        const {ordersList: {isLoading, errMess, display}} = props;

        if(isLoading)
            return(
                <Box
                    display="flex"
                    justifyContent="center"
                >
                    <Box><CircularProgress color="inherit"/></Box>
                </Box>
            )
        else if(errMess)
                return(errMess)
        else
            return(
                <>
                <Box 
                    display="flex"
                    flexWrap="wrap"
                    alignContent="flex-start"
                    justifyContent="center"
                    p={2}
                    
                >
                    { display.map((order) => {

                            return (
                                <Box m={2} key={order.orderId}>
                                    <Order 
                                        orderId={order.orderId}
                                        customerId={order.customerId}
                                        deliveryPincode={order.deliveryPincode}
                                        orderDate={order.orderDate}
                                        items={order.items}
                                        handleDialogOpen={handleDialogOpen}
                                    />
                                </Box>
                            )
                        })
                    }
                    
                </Box>
                <Dialog
                    open={open}
                >
                    <DialogTitle>
                        Full List
                    </DialogTitle>
                    <DialogContent>
                        <Box p={4} m={4} className="ListArea">
                            <List>
                                {
                                    dialogData.split(";").map((item, index) => {
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
                            </List>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={handleDialogClose}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                </>
            );
    }

export default OrdersList;