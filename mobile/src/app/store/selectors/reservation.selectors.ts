import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReservationState } from '../reducers/reservation.reducer';

export const selectReservationState = createFeatureSelector<ReservationState>('reservations');

export const selectAllReservations = createSelector(
  selectReservationState,
  (state) => state.reservations
);

export const selectAllTables = createSelector(
  selectReservationState,
  (state) => state.tables
);

export const selectSuggestedTable = createSelector(
  selectReservationState,
  (state) => state.suggestedTable
);

export const selectLoading = createSelector(
  selectReservationState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectReservationState,
  (state) => state.error
);

export const selectTodayReservations = createSelector(
  selectAllReservations,
  (reservations) => {
    const today = new Date().toISOString().split('T')[0];
    return reservations.filter((r) => r.reservation_date === today);
  }
);
