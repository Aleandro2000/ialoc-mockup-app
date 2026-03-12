export interface Table {
  id: number;
  restaurant_id: number;
  name: string;
  min_capacity: number;
  max_capacity: number;
  created_at?: string;
  updated_at?: string;
}

export interface Reservation {
  id: number;
  restaurant_id: number;
  table_id: number;
  guest_name: string;
  guest_count: number;
  reservation_date: string;
  reservation_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  table?: Table;
  created_at?: string;
  updated_at?: string;
}

export interface CreateReservationRequest {
  guest_name: string;
  guest_count: number;
  reservation_date: string;
  reservation_time: string;
  table_id?: number;
}

export interface SuggestTableRequest {
  guest_count: number;
  reservation_date: string;
  reservation_time: string;
}

export interface WebSocketMessage {
  event: string;
  data: any;
}

export interface PollResponse {
  messages: WebSocketMessage[];
  timestamp: number;
}
