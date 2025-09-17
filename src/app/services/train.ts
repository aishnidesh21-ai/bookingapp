import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  private apiUrl = `${environment.apiUrl}/trains`;
  
  constructor(private http: HttpClient) { }
  
  getAllTrains(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  getTrainById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  searchTrains(departureStation: string, arrivalStation: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?departureStation=${departureStation}&arrivalStation=${arrivalStation}`);
  }
  
  // Admin operations
  createTrain(train: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, train);
  }
  
  updateTrain(id: number, train: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, train);
  }
  
  deleteTrain(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
