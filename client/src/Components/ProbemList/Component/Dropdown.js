import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [level, setlevel] = React.useState('');

  const handleChange = (event) => {
    setlevel(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <div style={{position:'absolute',top: '10%', right: '5%'}}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={level}
          onChange={handleChange}
        >
          <MenuItem value={'E'}>Easy</MenuItem>
          <MenuItem value={'M'}>Medium</MenuItem>
          <MenuItem value={'H'}>Hard</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
