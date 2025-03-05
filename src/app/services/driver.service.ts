import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Driver } from '../models/driver';
import { Package } from '../models/package';

const BASE_URL = 'http://localhost:8080/31497683/kathy/api/v1/drivers'; 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  constructor(private http: HttpClient) {}

  // Fetch all drivers
  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(BASE_URL); 
  }

  // Fetch a driver by ID
  getDriverById(id: string): Observable<Driver> {
    return this.http.get<Driver>(`${BASE_URL}/${id}`); 
  }

  // Create a new driver
  createDriver(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(`${BASE_URL}/add`, driver, httpOptions); 
  }

  // Update a specific driver by its ID
  updateDriver(driverId: string, updatedDriver: Partial<Driver>): Observable<Driver> {
    return this.http.put<Driver>(`${BASE_URL}/update/${driverId}`, updatedDriver);
  }


  // Delete a driver by ID
  deleteDriver(id: string): Observable<any> {
    return this.http.delete(`${BASE_URL}/${id}`, httpOptions);
}
getAssignedPackages(driverId: string): Observable<Package[]> {
  return this.http.get<Package[]>(`${BASE_URL}/${driverId}/packages`);
}

}
