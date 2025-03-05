import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Package } from '../models/package';
import {Driver} from '../models/driver';

const API_URL = 'http://localhost:8080/31497683/kathy/api/v1/packages'; 

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient) {}

  // Get all packages
  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(`${API_URL}`);
  }

  // Get a specific package by its ID
  getPackageById(packageId: string): Observable<Package> {
    return this.http.get<Package>(`${API_URL}/${packageId}`);
  }

  // Update a specific package by its ID
  updatePackage(packageId: string, updatedPackage: Partial<Package>): Observable<Package> {
    return this.http.put<Package>(`${API_URL}/update/${packageId}`, updatedPackage);
  }

  // Delete a package by its ID
  deletePackage(packageId: string): Observable<any> {
    return this.http.delete(`${API_URL}/${packageId}`);
  }

  // Create a new package
  createPackage(newPackage: Package): Observable<Package> {
    return this.http.post<Package>(`${API_URL}/add`, newPackage);
  }

  // Fetch drivers assigned to a specific package
getDriversByPackageId(packageId: string): Observable<Driver[]> {
  return this.http.get<Driver[]>(`${API_URL}/${packageId}/drivers`);
}
  // Fetch packages assigned to a specific driver
  getPackagesByDriverId(driverId: string): Observable<Package[]> {
    return this.http.get<Package[]>(`${API_URL}?driver_id=${driverId}`); 
  }
}
