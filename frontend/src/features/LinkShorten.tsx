import React, {FormEvent, useState} from 'react';
import {Grid, Link, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {fetchShortUrl, selectLink, selectLoading} from "./linksSlice";

const LinkShorten = () => {
  const dispatch = useAppDispatch();
  const shortUrl = useAppSelector(selectLink);
  const loading = useAppSelector(selectLoading);
  const [state, setState] = useState('');
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(fetchShortUrl(state));
    setState('');
  };

  return (
    <div style={{textAlign: 'center'}}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h4">Shorten your URL!</Typography>
        </Grid>
        <Grid item>
          <form onSubmit={onSubmit} id="shortForm">
            <TextField
              id="text" label="Shorten your URL!"
              value={state} type="url"
              onChange={inputChangeHandler}
              name="text" required
            />
          </form>
        </Grid>
        <Grid item>
          <LoadingButton loading={loading} form="shortForm" loadingIndicator="Loading…" type="submit" color="primary"
                         variant="contained">Shorten</LoadingButton>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">Your link now looks like this: </Typography>
        </Grid>
        <Grid item>
          {shortUrl && <Link href={'http://localhost:8000/' + shortUrl.shortUrl} target="_blank">{'http://localhost:8000/' + shortUrl.shortUrl}</Link>}
        </Grid>
      </Grid>

    </div>
  );
};

export default LinkShorten;