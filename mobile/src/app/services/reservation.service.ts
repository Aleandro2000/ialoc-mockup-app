import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation, Table, CreateReservationRequest, SuggestTableRequest, PollResponse } from '../store/models/reservation.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private readonly apiUrl = environment.apiUrl;
  private restaurantId = '1';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Restaurant-Id': this.restaurantId
    });
  }

  setRestaurantId(id: string): void {
    this.restaurantId = id;
  }

  getRestaurantId(): string {
    return this.restaurantId;
  }

  getReservations(date?: string): Observable<Reservation[]> {
    const params = date ? `?date=${date}` : '';
    return this.http.get<Reservation[]>(`${this.apiUrl}/api/reservations${params}`, {
      headers: this.getHeaders()
    });
  }

  createReservation(reservation: CreateReservationRequest): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/api/reservations`, reservation, {
      headers: this.getHeaders()
    });
  }

  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(`${this.apiUrl}/api/tables`, {
      headers: this.getHeaders()
    });
  }

  suggestTable(request: SuggestTableRequest): Observable<Table> {
    return this.http.post<Table>(`${this.apiUrl}/api/reservations/suggest-table`, request, {
      headers: this.getHeaders()
    });
  }

  pollMessages(since: number): Observable<PollResponse> {
    return this.http.get<PollResponse>(`${this.apiUrl}/api/ws/poll?since=${since}`, {
      headers: this.getHeaders()
    });
  }
}
