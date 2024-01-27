import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { taskAction } from '../store/store';

function Filter() {
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        event.preventDefault()
        const filterType = event.target.value 
        if(filterType === filter) return ;
        dispatch(taskAction.setFilter(filterType))
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="filter-label">Filter</InputLabel>
                <Select
                    labelId="Filter Task"
                    id="filter-task"
                    value={filter}
                    label="Filter"
                    onChange={handleChange}
                    sx={{color:"black"}}
                >
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={"Complete"}>Complete</MenuItem>
                    <MenuItem value={"Incomplete"}>Incomplete</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default Filter
