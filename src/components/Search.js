import React from 'react';
import TextField from '@material-ui/core/TextField';
import '../shared/style.css';
import { Grid, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';


const Search = (props) => {

    function handleChange(event) {
        props.searchOrdersListByText(event.target.value);
    }
      
    return(
        <Grid container>
            <Grid item xs={12} className="text-center">
                <TextField
                    id="input-with-icon-textfield"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      placeholder: (
                        "Search by Pincode or Date"
                      )
                    }}
                    className="SearchField"
                    onChange={handleChange}
                />
            </Grid>
        </Grid>
    );
}

export default Search;