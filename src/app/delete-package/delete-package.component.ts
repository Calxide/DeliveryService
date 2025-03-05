import { Component } from '@angular/core';
import { PackageService } from '../services/package.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-package',
  standalone: true,
  templateUrl: './delete-package.component.html',
  styleUrls: ['./delete-package.component.css'],
  imports: [FormsModule, CommonModule],
})
export class DeletePackageComponent {
  packageId: string = '';

  constructor(private packageService: PackageService, private router: Router) {}

  deletePackage(): void {
    if (this.packageId.trim()) {
      this.packageService.deletePackage(this.packageId).subscribe({
        next: () => {
          this.router.navigate(['/list-packages']);
        },
        error: (error) => {
          console.error('Error deleting package:', error);
          this.router.navigate(['/invalid-data']);
        }
      });
    } else {
      this.router.navigate(['/invalid-data']);
    }
  }
}
