import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/31497683/kathy/api/v1/statistics'; // Adjust the URL if necessary

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private http: HttpClient) {}

  getStatistics(): Observable<any> {
    return this.http.get<any>(API_URL); // Fetch statistics from the backend
  }
}
