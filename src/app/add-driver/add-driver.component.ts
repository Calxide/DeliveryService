import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { DriverService } from '../services/driver.service';
import { Driver } from '../models/driver';
import { Router } from '@angular/router';
import { ObjectId } from 'mongoose';


@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [FormsModule, CommonModule],  
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})


export class AddDriverComponent {
  driver: Driver = new Driver('', 'Food', '', new Date());


  constructor(private driverService: DriverService, private router: Router) {}

  addDriver(form: NgForm) {
    if (form.invalid) {
      console.error('Form is invalid:', form.controls);
      this.router.navigate(['/invalid-data']);
      return;
    }

    // Call the service to create the driver
    this.driverService.createDriver(this.driver).subscribe({
      next: (response) => {
        console.log('Driver added successfully:', response);
        this.router.navigate(['/list-drivers']);
      },
      error: (error) => {
        console.error('Error creating driver:', error);
        this.router.navigate(['/invalid-data']);
      }
    });
  }
  
  }


