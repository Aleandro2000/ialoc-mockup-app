import { createReducer, on } from '@ngrx/store';
import { Reservation, Table } from '../models/reservation.model';
import * as ReservationActions from '../actions/reservation.actions';

export interface ReservationState {
  reservations: Reservation[];
  tables: Table[];
  suggestedTable: Table | null;
  loading: boolean;
  error: string | null;
  lastPollTimestamp: number;
}

export const initialState: ReservationState = {
  reservations: [],
  tables: [],
  suggestedTable: null,
  loading: false,
  error: null,
  lastPollTimestamp: 0,
};

export const reservationReducer = createReducer(
  initialState,

  on(ReservationActions.loadReservations, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ReservationActions.loadReservationsSuccess, (state, { reservations }) => ({
    ...state,
    reservations,
    loading: false,
  })),

  on(ReservationActions.loadReservationsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ReservationActions.loadTables, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ReservationActions.loadTablesSuccess, (state, { tables }) => ({
    ...state,
    tables,
    loading: false,
  })),

  on(ReservationActions.loadTablesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ReservationActions.createReservation, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ReservationActions.createReservationSuccess, (state, { reservation }) => ({
    ...state,
    reservations: [...state.reservations, reservation].sort(
      (a, b) => a.reservation_time.localeCompare(b.reservation_time)
    ),
    loading: false,
    suggestedTable: null,
  })),

  on(ReservationActions.createReservationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ReservationActions.suggestTableSuccess, (state, { table }) => ({
    ...state,
    suggestedTable: table,
  })),

  on(ReservationActions.suggestTableFailure, (state, { error }) => ({
    ...state,
    suggestedTable: null,
    error,
  })),

  on(ReservationActions.clearSuggestedTable, (state) => ({
    ...state,
    suggestedTable: null,
  })),

  on(ReservationActions.reservationReceived, (state, { reservation }) => {
    const exists = state.reservations.some((r) => r.id === reservation.id);
    if (exists) {
      return state;
    }
    return {
      ...state,
      reservations: [...state.reservations, reservation].sort(
        (a, b) => a.reservation_time.localeCompare(b.reservation_time)
      ),
    };
  })
);
