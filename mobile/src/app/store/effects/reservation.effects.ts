import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { ReservationService } from '../../services/reservation.service';
import { WebSocketService } from '../../services/websocket.service';
import * as ReservationActions from '../actions/reservation.actions';

@Injectable()
export class ReservationEffects {
  loadReservations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.loadReservations),
      mergeMap(({ date }) =>
        this.reservationService.getReservations(date).pipe(
          map((reservations) => ReservationActions.loadReservationsSuccess({ reservations })),
          catchError((error) => of(ReservationActions.loadReservationsFailure({ error: error.message })))
        )
      )
    )
  );

  loadTables$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.loadTables),
      mergeMap(() =>
        this.reservationService.getTables().pipe(
          map((tables) => ReservationActions.loadTablesSuccess({ tables })),
          catchError((error) => of(ReservationActions.loadTablesFailure({ error: error.message })))
        )
      )
    )
  );

  createReservation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.createReservation),
      mergeMap(({ reservation }) =>
        this.reservationService.createReservation(reservation).pipe(
          map((newReservation) => ReservationActions.createReservationSuccess({ reservation: newReservation })),
          catchError((error) => of(ReservationActions.createReservationFailure({ error: error.error?.error || error.message })))
        )
      )
    )
  );

  suggestTable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.suggestTable),
      mergeMap(({ guestCount, date, time }) =>
        this.reservationService.suggestTable({ guest_count: guestCount, reservation_date: date, reservation_time: time }).pipe(
          map((table) => ReservationActions.suggestTableSuccess({ table })),
          catchError((error) => of(ReservationActions.suggestTableFailure({ error: error.error?.error || error.message })))
        )
      )
    )
  );

  startPolling$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ReservationActions.startPolling),
        tap(() => this.webSocketService.startPolling())
      ),
    { dispatch: false }
  );

  stopPolling$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ReservationActions.stopPolling),
        tap(() => this.webSocketService.stopPolling())
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private reservationService: ReservationService,
    private webSocketService: WebSocketService
  ) {}
}
