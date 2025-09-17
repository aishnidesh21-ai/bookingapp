import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private apiUrl = `${environment.apiUrl}/flights`;
  
  constructor(private http: HttpClient) { }
  
  getAllFlights(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  getFlightById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  searchFlights(departureCity: string, arrivalCity: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?departureCity=${departureCity}&arrivalCity=${arrivalCity}`);
  }
  
  searchByAirline(airline: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/airline/${airline}`);
  }
  
  // Admin operations
  createFlight(flight: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, flight);
  }
  
  updateFlight(id: number, flight: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, flight);
  }
  
  deleteFlight(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
