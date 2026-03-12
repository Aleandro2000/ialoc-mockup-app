import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { Table } from '../store/models/reservation.model';
import * as ReservationActions from '../store/actions/reservation.actions';
import * as ReservationSelectors from '../store/selectors/reservation.selectors';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit, OnDestroy {
  tables$: Observable<Table[]>;
  suggestedTable$: Observable<Table | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  guestName = '';
  guestCount = 2;
  reservationDate = new Date().toISOString().split('T')[0];
  reservationTime = '19:00';
  selectedTableId: number | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.tables$ = this.store.select(ReservationSelectors.selectAllTables);
    this.suggestedTable$ = this.store.select(ReservationSelectors.selectSuggestedTable);
    this.loading$ = this.store.select(ReservationSelectors.selectLoading);
    this.error$ = this.store.select(ReservationSelectors.selectError);
  }

  ngOnInit(): void {
    this.store.dispatch(ReservationActions.loadTables());

    this.suggestedTable$
      .pipe(
        takeUntil(this.destroy$),
        filter((table): table is Table => table !== null)
      )
      .subscribe((table) => {
        this.selectedTableId = table.id;
        this.showSuggestionToast(table);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onGuestCountChange(): void {
    if (this.guestCount > 0 && this.reservationDate && this.reservationTime) {
      this.store.dispatch(
        ReservationActions.suggestTable({
          guestCount: this.guestCount,
          date: this.reservationDate,
          time: this.reservationTime,
        })
      );
    }
  }

  onDateTimeChange(): void {
    if (this.guestCount > 0 && this.reservationDate && this.reservationTime) {
      this.store.dispatch(
        ReservationActions.suggestTable({
          guestCount: this.guestCount,
          date: this.reservationDate,
          time: this.reservationTime,
        })
      );
    }
  }

  async showSuggestionToast(table: Table): Promise<void> {
    const toast = await this.toastController.create({
      message: `Masa sugerata: ${table.name} (${table.min_capacity}-${table.max_capacity} persoane)`,
      duration: 3000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();
  }

  async submitReservation(): Promise<void> {
    if (!this.guestName.trim()) {
      const alert = await this.alertController.create({
        header: 'Eroare',
        message: 'Introduceti numele clientului',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    if (this.guestCount < 1) {
      const alert = await this.alertController.create({
        header: 'Eroare',
        message: 'Numarul de persoane trebuie sa fie cel putin 1',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    this.store.dispatch(
      ReservationActions.createReservation({
        reservation: {
          guest_name: this.guestName,
          guest_count: this.guestCount,
          reservation_date: this.reservationDate,
          reservation_time: this.reservationTime,
          table_id: this.selectedTableId || undefined,
        },
      })
    );

    const toast = await this.toastController.create({
      message: 'Rezervare creata cu succes!',
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();

    this.resetForm();
  }

  resetForm(): void {
    this.guestName = '';
    this.guestCount = 2;
    this.reservationDate = new Date().toISOString().split('T')[0];
    this.reservationTime = '19:00';
    this.selectedTableId = null;
    this.store.dispatch(ReservationActions.clearSuggestedTable());
  }
}
