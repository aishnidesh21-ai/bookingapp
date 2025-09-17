import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CabService {
  private apiUrl = `${environment.apiUrl}/cabs`;
  
  constructor(private http: HttpClient) { }
  
  getAllCabs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  getCabById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  searchByCabType(cabType: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/type/${cabType}`);
  }
  
  searchByRating(rating: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rating/${rating}`);
  }
  
  // Admin operations
  createCab(cab: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cab);
  }
  
  updateCab(id: number, cab: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, cab);
  }
  
  deleteCab(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
