import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlightService } from '../../services/flight';
import { TrainService } from '../../services/train';
import { CabService } from '../../services/cab';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboardComponent implements OnInit {
  dashboardStats: any = {};
  flights: any[] = [];
  trains: any[] = [];
  cabs: any[] = [];
  
  constructor(
    private flightService: FlightService,
    private trainService: TrainService,
    private cabService: CabService,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.loadDashboardStats();
    this.loadFlights();
    this.loadTrains();
    this.loadCabs();
  }
  
  loadDashboardStats(): void {
    this.authService.getDashboardStats().subscribe(
      (stats) => {
        this.dashboardStats = stats;
      },
      (error) => {
        console.error('Error loading dashboard stats:', error);
      }
    );
  }
  
  loadFlights(): void {
    this.flightService.getAllFlights().subscribe(
      (data) => {
        this.flights = data;
      },
      (error) => {
        console.error('Error loading flights:', error);
      }
    );
  }
  
  loadTrains(): void {
    this.trainService.getAllTrains().subscribe(
      (data) => {
        this.trains = data;
      },
      (error) => {
        console.error('Error loading trains:', error);
      }
    );
  }
  
  loadCabs(): void {
    this.cabService.getAllCabs().subscribe(
      (data) => {
        this.cabs = data;
      },
      (error) => {
        console.error('Error loading cabs:', error);
      }
    );
  }
}
