import { Component, OnInit } from '@angular/core';
import { DriverService } from '../services/driver.service';
import { PackageService } from '../services/package.service';
import { Driver } from '../models/driver';
import { CommonModule } from '@angular/common';
import { Package } from '../models/package';
import { RouterModule, Router } from '@angular/router';

@Component({
    selector: 'app-list-drivers',
    standalone: true,
    templateUrl: './list-drivers.component.html',
    styleUrls: ['./list-drivers.component.css'],
    imports: [CommonModule, RouterModule],
})
export class ListDriversComponent implements OnInit {
    drivers: Driver[] = [];
    selectedDriverId: string | null = null; 
    assignedPackages: Package[] = []; 
    noPackagesMessage: string = '';

    constructor(
        private driverService: DriverService,
        private packageService: PackageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getDrivers();
    }

    getDrivers(): void {
        this.driverService.getDrivers().subscribe({
            next: (drivers) => {
                this.drivers = drivers;
            },
            error: (err) => {
                console.error('Error fetching drivers', err);
            },
        });
    }

    togglePackages(driverId: string): void {
        this.selectedDriverId = driverId; 
        this.assignedPackages = []; 
        this.noPackagesMessage = ''; 
    
        // Fetch packages assigned to this driver
        this.driverService.getAssignedPackages(driverId).subscribe({
            next: (packages) => {
                this.assignedPackages = packages;
    
                // Update noPackagesMessage based on the packages fetched
                if (this.assignedPackages.length === 0) {
                    this.noPackagesMessage = 'No Packages Found';
                } else {
                    this.noPackagesMessage = ''; 
                }
            },
            error: (error) => {
                console.error('Error fetching assigned packages:', error);
                this.noPackagesMessage = 'An error occurred while fetching packages.'; 
            },
            complete: () => {
                console.log('Completed fetching packages');
            }
        });
        
    }


    deleteDriver(driver: any) {
        this.driverService.deleteDriver(driver._id).subscribe(result => {
            this.getDrivers();
            this.router.navigate(["/list-drivers"]);
        });
    }
    
}
