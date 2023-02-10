import {Link} from "../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import axiosApi from "../axiosApi";

interface LinksState {
  item: Link | null;
  loading: boolean;
}

const initialState: LinksState = {
  item: null,
  loading: false,
};

export const fetchShortUrl = createAsyncThunk<Link, string>(
  'links/fetch',
  async (url) => {
    const result = await axiosApi.post<Link>('/links', {originalUrl: url});
    return result.data;
  }
);

const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShortUrl.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchShortUrl.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.item = payload;
    });
    builder.addCase(fetchShortUrl.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const linksReducer = linksSlice.reducer;

export const selectLink = (state: RootState) => state.links.item;
export const selectLoading = (state: RootState) => state.links.loading;