import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../services/statistic.service'; // Ensure you import the statistics service

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  driverCount: number = 0;
  packageCount: number = 0;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.fetchStatistics(); // Fetch statistics when the component initializes
  }

  fetchStatistics(): void {
    this.statisticsService.getStatistics().subscribe(stats => {
      this.driverCount = stats.driverCount; // Assuming the backend returns { driverCount, packageCount }
      this.packageCount = stats.packageCount;
    }, error => {
      console.error('Error fetching statistics:', error);
    });
  }
}
