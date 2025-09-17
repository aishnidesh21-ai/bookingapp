import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { FlightService } from '../../services/flight';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSliderModule,
    MatTabsModule,
    HttpClientModule
  ],
  templateUrl: './flights.html',
  styleUrl: './flights.scss'
})
export class FlightsComponent implements OnInit {
  // Search filters
  searchFilters = {
    tripType: 'roundtrip',
    origin: '',
    destination: '',
    departDate: new Date(),
    returnDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    passengers: {
      adults: 1,
      children: 0,
      infants: 0
    },
    cabinClass: 'economy',
    directFlights: false,
    priceRange: { min: 0, max: 2000 },
    airlines: [] as string[],
    departureTime: { morning: false, afternoon: false, evening: false, night: false }
  };

  // Flight results
  flights: any[] = [];

  // Filtered & paginated flights
  filteredFlights: any[] = [];
  paginatedFlights: any[] = [];

  // State
  loading = false;
  pageSize = 4;
  currentPage = 0;
  totalItems = 0;

  // Multi-city trips
  multiCityTrips = [
    { origin: '', destination: '', date: new Date() },
    { origin: '', destination: '', date: new Date(new Date().setDate(new Date().getDate() + 7)) }
  ];

  // Available airlines
  availableAirlines = [
    { name: 'American Airlines', code: 'AA' },
    { name: 'Delta Air Lines', code: 'DL' },
    { name: 'United Airlines', code: 'UA' },
    { name: 'Southwest Airlines', code: 'WN' },
    { name: 'British Airways', code: 'BA' },
    { name: 'Lufthansa', code: 'LH' },
    { name: 'Emirates', code: 'EK' },
    { name: 'Qatar Airways', code: 'QR' }
  ];

  // Sort options
  sortOptions = [
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'duration_asc', label: 'Duration: Shortest' },
    { value: 'departure_asc', label: 'Departure: Earliest' },
    { value: 'arrival_asc', label: 'Arrival: Earliest' }
  ];
  selectedSort = 'price_asc';

  // Popular destinations
  popularDestinations = [
    { city: 'New York', code: 'NYC', country: 'USA', image: '/assets/images/destinations/new-york.jpg' },
    { city: 'London', code: 'LON', country: 'UK', image: '/assets/images/destinations/london.jpg' },
    { city: 'Tokyo', code: 'TYO', country: 'Japan', image: '/assets/images/destinations/tokyo.jpg' },
    { city: 'Paris', code: 'PAR', country: 'France', image: '/assets/images/destinations/paris.jpg' },
    { city: 'Dubai', code: 'DXB', country: 'UAE', image: '/assets/images/destinations/dubai.jpg' }
  ];

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.searchFlights();
    if (this.flights.length === 0) {
      this.flights = this.getMockFlights();
      this.applyFilters();
    }
  }

  // API call
  searchFlights(): void {
    this.loading = true;
    if (this.searchFilters.origin && this.searchFilters.destination) {
      this.flightService.searchFlights(this.searchFilters.origin, this.searchFilters.destination)
        .subscribe(
          data => { this.flights = data; this.loading = false; this.applyFilters(); },
          error => { console.error('Error searching flights:', error); this.loading = false; }
        );
    } else {
      this.flightService.getAllFlights()
        .subscribe(
          data => { this.flights = data; this.loading = false; this.applyFilters(); },
          error => { console.error('Error loading flights:', error); this.loading = false; }
        );
    }
  }

  // Mock data fallback
  getMockFlights(): any[] {
    return [
      {
        id: 1, airline: 'American Airlines', airlineCode: 'AA', flightNumber: 'AA1234',
        origin: 'New York (JFK)', destination: 'Los Angeles (LAX)',
        departureTime: '08:00 AM', arrivalTime: '11:30 AM', duration: '5h 30m',
        stops: 0, price: 349, seatsAvailable: 12,
        departureDate: '2023-12-15', returnDate: '2023-12-22',
        cabinClass: 'Economy',
        amenities: ['Wi-Fi', 'Power Outlets', 'In-flight Entertainment'],
        aircraft: 'Boeing 787', logo: '/assets/images/airlines/american.png'
      },
      {
        id: 2, airline: 'Delta Air Lines', airlineCode: 'DL', flightNumber: 'DL2345',
        origin: 'New York (JFK)', destination: 'Los Angeles (LAX)',
        departureTime: '10:15 AM', arrivalTime: '01:45 PM', duration: '5h 30m',
        stops: 0, price: 379, seatsAvailable: 8,
        departureDate: '2023-12-15', returnDate: '2023-12-22',
        cabinClass: 'Economy',
        amenities: ['Wi-Fi', 'Power Outlets', 'In-flight Entertainment', 'Free Meals'],
        aircraft: 'Airbus A321', logo: '/assets/images/airlines/delta.png'
      }
    ];
  }

  // ---------- Filters, Sorting, Pagination ----------
  applyFilters(): void {
    this.filteredFlights = [...this.flights];
    this.sortFlights();
    this.totalItems = this.filteredFlights.length;
    this.updatePaginatedFlights();
  }

  resetFilters(): void {
    this.searchFilters = {
      tripType: 'roundtrip',
      origin: '',
      destination: '',
      departDate: new Date(),
      returnDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      passengers: { adults: 1, children: 0, infants: 0 },
      cabinClass: 'economy',
      directFlights: false,
      priceRange: { min: 0, max: 2000 },
      airlines: [],
      departureTime: { morning: false, afternoon: false, evening: false, night: false }
    };
    this.applyFilters();
  }

  sortFlights(): void {
    switch (this.selectedSort) {
      case 'price_asc': this.filteredFlights.sort((a, b) => a.price - b.price); break;
      case 'price_desc': this.filteredFlights.sort((a, b) => b.price - a.price); break;
      case 'duration_asc': this.filteredFlights.sort((a, b) => this.getDurationMinutes(a.duration) - this.getDurationMinutes(b.duration)); break;
      case 'departure_asc': this.filteredFlights.sort((a, b) => this.getTimeMinutes(a.departureTime) - this.getTimeMinutes(b.departureTime)); break;
      case 'arrival_asc': this.filteredFlights.sort((a, b) => this.getTimeMinutes(a.arrivalTime) - this.getTimeMinutes(b.arrivalTime)); break;
    }
    this.updatePaginatedFlights();
  }

  getDurationMinutes(duration: string): number {
    const [h, m] = duration.split(/[hm]/).map(Number);
    return h * 60 + m;
  }

  getTimeMinutes(time: string): number {
    const [timePart, ampm] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedFlights();
  }

  updatePaginatedFlights(): void {
    const start = this.currentPage * this.pageSize;
    this.paginatedFlights = this.filteredFlights.slice(start, start + this.pageSize);
  }

  getTotalPassengers(): number {
    return this.searchFilters.passengers.adults +
           this.searchFilters.passengers.children +
           this.searchFilters.passengers.infants;
  }

  selectDestination(destination: any): void {
    this.searchFilters.destination = `${destination.city} (${destination.code})`;
  }

  toggleAirline(airline: string): void {
    const index = this.searchFilters.airlines.indexOf(airline);
    index === -1 ? this.searchFilters.airlines.push(airline) : this.searchFilters.airlines.splice(index, 1);
  }

  isAirlineSelected(airline: string): boolean {
    return this.searchFilters.airlines.includes(airline);
  }

  // ---------- Multi-City Methods ----------
  addCity(): void {
    if (this.multiCityTrips.length < 5) {
      this.multiCityTrips.push({
        origin: '',
        destination: '',
        date: new Date(new Date().setDate(new Date().getDate() + this.multiCityTrips.length * 7))
      });
    }
  }

  removeCity(index: number): void {
    if (this.multiCityTrips.length > 2) {
      this.multiCityTrips.splice(index, 1);
    }
  }
}
