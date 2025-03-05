import { Component, OnInit } from '@angular/core';
import { PackageService } from '../services/package.service';
import { Package } from '../models/package';
import { Driver } from '../models/driver';
import { KgToGPipe } from '../kg-to-g.pipe';  
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-list-packages',
  standalone: true,
  templateUrl: './list-packages.component.html',
  styleUrls: ['./list-packages.component.css'],
  imports: [KgToGPipe, CommonModule, RouterModule],  
})
export class ListPackagesComponent implements OnInit {
  packages: Package[] = [];
  selectedPackageId: string | null = null; 
  assignedDrivers: Driver[] = [];
  noDriversMessage: string = '';

  constructor(
    private packageService: PackageService, 
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.getPackages();
  }

  getPackages(): void {
    this.packageService.getPackages().subscribe({
      next: (packages: Package[]) => {
        this.packages = packages;
      },
      error: (err: any) => {
        console.error('Error fetching packages', err);
      }
    });
  }

  toggleDrivers(packageId: string): void {
    this.selectedPackageId = packageId; 
    this.assignedDrivers = []; 
    this.noDriversMessage = ''; 

    this.packageService.getDriversByPackageId(packageId).subscribe({
      next: (drivers) => {
          this.assignedDrivers = drivers;

          if (this.assignedDrivers.length === 0) {
              this.noDriversMessage = 'No Drivers Found';
          } else {
              this.noDriversMessage = ''; 
          }
      },
      error: () => {
        this.noDriversMessage = 'An error occurred while fetching drivers.'; 
    }
    });
  }

  deletePackage(pkg: Package): void {
    if (pkg._id) { 
      this.packageService.deletePackage(pkg._id).subscribe({
        next: () => {
          this.getPackages(); 
          this.router.navigate(["/list-packages"]); 
        }
      });
    }
  }
}
