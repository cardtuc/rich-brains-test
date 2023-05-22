import { createAction } from '@reduxjs/toolkit';

export const setClients = createAction('CLIENTS/SET');
export const setSelectedClient = createAction('CLIENTS/SELECTED');
export const clearSelectedClient = createAction('CLIENTS/CLEAR_SELECTED');
