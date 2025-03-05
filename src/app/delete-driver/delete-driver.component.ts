import { Component, OnInit } from '@angular/core';
import { DriverService } from '../services/driver.service';
import { PackageService } from '../services/package.service';
import { Driver } from '../models/driver';
import { CommonModule } from '@angular/common';
import { Package } from '../models/package';
import { RouterModule, Router } from '@angular/router';

@Component({
    selector: 'app-delete-driver',
    standalone: true,
    templateUrl: './delete-driver.component.html',
    styleUrls: ['./delete-driver.component.css'],
    imports: [CommonModule, RouterModule],
})
export class DeleteDriverComponent implements OnInit {
    drivers: Driver[] = [];
    selectedDriverId: string | null = null; 
    assignedPackages: Package[] = []; 

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

    togglePackages(driver: Driver): void {
        this.selectedDriverId = this.selectedDriverId === driver.driver_id ? null : driver.driver_id;
        if (this.selectedDriverId) {
            this.packageService.getPackagesByDriverId(driver.driver_id).subscribe({
                next: (packages) => {
                    this.assignedPackages = packages;
                },
                error: (err) => {
                    console.error('Error fetching packages', err);
                    this.assignedPackages = []; 
                }
            });
        } else {
            this.assignedPackages = []; 
        }
    }



    deleteDriver(driver: any) {
        this.driverService.deleteDriver(driver._id).subscribe(result => {
            this.getDrivers();
            this.router.navigate(["/list-drivers"]);
        });
    }
    
}
