import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PackageService } from '../services/package.service'; 
import { DriverService } from '../services/driver.service'; 
import { Package } from '../models/package'; 
import { Driver } from '../models/driver'; 
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css']
})
export class AddPackageComponent implements OnInit {
  package: Package = new Package('', 0, '', '', new Date(), '', false);
  drivers: Driver[] = []; 
  selectedDriver: string = ''; 


  constructor(
    private packageService: PackageService, 
    private driverService: DriverService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDrivers();
  }

  loadDrivers() {
    this.driverService.getDrivers().subscribe({ 
      next: (data) => {
        this.drivers = data; 

      }
    });
  }

  addPackage(form: NgForm) {
    this.package.driver_id = this.selectedDriver;

    this.packageService.createPackage(this.package).subscribe({
      next: (response) => {
        console.log('Package added:', response);
        this.router.navigate(['/list-packages']);
      },
      error: (err) => {
        console.error('Error adding package:', err); 
        this.router.navigate(['/invalid-data']); 
      }
    });
  }
}