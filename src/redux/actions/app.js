import { createAction } from '@reduxjs/toolkit';

export const showLoader = createAction('APP/SHOW_LOADER');
export const hideLoader = createAction('APP/HIDE_LOADER');
export const showSnackbar = createAction('APP/SHOW_SNACKBAR');
export const hideSnackbar = createAction('APP/HIDE_SNACKBAR');
