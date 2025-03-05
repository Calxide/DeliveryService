import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverService } from '../services/driver.service';
import { Driver } from '../models/driver';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-driver',
  standalone: true,
  templateUrl: './update-driver.component.html',
  styleUrls: ['./update-driver.component.css'],
  imports: [CommonModule, FormsModule],
})
export class UpdateDriverComponent implements OnInit {
  driverId: string | null = ''; // Changed to an empty string
  driver: Driver | null = null;
  license: string = '';
  department: 'Food' | 'Furniture' | 'Electronic' = 'Food'; 

  constructor(
    private route: ActivatedRoute,
    private driverService: DriverService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get driver ID from route parameters if available
    this.route.paramMap.subscribe(params => {
      this.driverId = params.get('id'); // Retrieve driver ID from route parameters
      if (this.driverId) {
        this.fetchDriverDetails(this.driverId);
      }
    });
  }

  fetchDriverDetails(driverId: string): void {
    this.driverService.getDriverById(driverId).subscribe(driver => {
      this.driver = driver;
      this.license = driver.driver_license; 
      this.department = driver.driver_department; 
    }, error => {
      console.error('Error fetching driver details:', error);
      this.router.navigate(['/invalid-data']); // Redirect to invalid data page if not found
    });
  }

  updateDriver(): void {
    console.log('Update Driver method called'); // This should be at the top of the method
    console.log('Driver ID:', this.driverId);
    console.log('License:', this.license);
    console.log('Department:', this.department);
    if (this.driverId) {
      this.driverService.updateDriver(this.driverId, { 
        driver_license: this.license, 
        driver_department: this.department 
      }).subscribe({
        next: () => {
          this.router.navigate(['/list-drivers']); 
        },
        error: (err) => {
          console.error('Error updating driver', err);
        }
      });
    }
  }
}
