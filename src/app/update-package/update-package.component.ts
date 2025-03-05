import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from '../services/package.service';
import { Package } from '../models/package';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-package',
  standalone: true,
  templateUrl: './update-package.component.html',
  styleUrls: ['./update-package.component.css'],
  imports: [CommonModule, FormsModule],
})
export class UpdatePackageComponent implements OnInit {
  packageId: string | null = null;
  package: Package | null = null;
  newDestination: string = '';

  constructor(
    private route: ActivatedRoute,
    private packageService: PackageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.packageId = params.get('id'); 
      if (this.packageId) {
        this.fetchPackageDetails(this.packageId);
      }
    });
  }

  fetchPackageDetails(packageId: string): void {
    this.packageService.getPackageById(packageId).subscribe(pkg => {
      this.package = pkg;
      this.newDestination = pkg.package_destination; 
    }, error => {
      this.router.navigate(['/invalid-data']);
    });
  }

  updatePackage(): void {
    if (this.packageId) {
      this.packageService.updatePackage(this.packageId, { package_destination: this.newDestination }).subscribe({
        next: () => {
          this.router.navigate(['/list-packages']); 
        },
        error: (err) => {
          console.error('Error updating package', err);
        }
      });
    }
  }
}
