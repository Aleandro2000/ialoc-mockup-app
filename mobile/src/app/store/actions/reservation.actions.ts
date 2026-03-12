import { createAction, props } from '@ngrx/store';
import { Reservation, Table, CreateReservationRequest } from '../models/reservation.model';

export const loadReservations = createAction(
  '[Reservations] Load Reservations',
  props<{ date?: string }>()
);

export const loadReservationsSuccess = createAction(
  '[Reservations] Load Reservations Success',
  props<{ reservations: Reservation[] }>()
);

export const loadReservationsFailure = createAction(
  '[Reservations] Load Reservations Failure',
  props<{ error: string }>()
);

export const loadTables = createAction('[Tables] Load Tables');

export const loadTablesSuccess = createAction(
  '[Tables] Load Tables Success',
  props<{ tables: Table[] }>()
);

export const loadTablesFailure = createAction(
  '[Tables] Load Tables Failure',
  props<{ error: string }>()
);

export const createReservation = createAction(
  '[Reservations] Create Reservation',
  props<{ reservation: CreateReservationRequest }>()
);

export const createReservationSuccess = createAction(
  '[Reservations] Create Reservation Success',
  props<{ reservation: Reservation }>()
);

export const createReservationFailure = createAction(
  '[Reservations] Create Reservation Failure',
  props<{ error: string }>()
);

export const suggestTable = createAction(
  '[Tables] Suggest Table',
  props<{ guestCount: number; date: string; time: string }>()
);

export const suggestTableSuccess = createAction(
  '[Tables] Suggest Table Success',
  props<{ table: Table }>()
);

export const suggestTableFailure = createAction(
  '[Tables] Suggest Table Failure',
  props<{ error: string }>()
);

export const clearSuggestedTable = createAction('[Tables] Clear Suggested Table');

export const reservationReceived = createAction(
  '[WebSocket] Reservation Received',
  props<{ reservation: Reservation }>()
);

export const startPolling = createAction('[WebSocket] Start Polling');

export const stopPolling = createAction('[WebSocket] Stop Polling');
