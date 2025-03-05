import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { PackageService } from '../services/package.service'; 
import { Package } from '../models/package'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KgToGPipe } from '../kg-to-g.pipe';

@Component({
  selector: 'app-translate-description',
  templateUrl: './translate-description.component.html',
  styleUrls: ['./translate-description.component.css'],
  standalone: true,
  imports: [KgToGPipe, CommonModule, FormsModule]
})
export class TranslateDescriptionComponent implements OnInit {
  packages: Package[] = [];
  targetLanguage: string = 'es'; 
  translatedDescriptions: { [key: string]: string } = {}; 

  constructor(
    private translationService: TranslationService,
    private packageService: PackageService
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

  translateDescription(description: string | undefined): void {
    if (description) {
      this.translationService.translate(description, this.targetLanguage)
        .subscribe({
          next: (result) => {
      
            this.translatedDescriptions[description] = result; 
          },
          error: () => {
            console.warn('Translation failed.');
          }
        });
    } else {
      console.warn('Description is undefined, translation skipped.');
    }
  }
}