import React, {useState} from 'react';
import {Grid, Link, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";

const LinkShorten = () => {
  const [state, setState] = useState('');
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  return (
    <div style={{textAlign: 'center'}}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h4">Shorten your URL!</Typography>
        </Grid>
        <Grid item>
          <form>
            <TextField
              id="text" label="Shorten your URL!"
              value={state}
              onChange={inputChangeHandler}
              name="text" required
            />
          </form>
        </Grid>
        <Grid item>
          <LoadingButton loadingIndicator="Loading…" type="submit" color="primary"
                         variant="contained">Shorten</LoadingButton>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">Your link now looks like this: </Typography>
        </Grid>
        <Grid item>
          <Link></Link>
        </Grid>
      </Grid>

    </div>
  );
};

export default LinkShorten;