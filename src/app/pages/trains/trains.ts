import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';

interface TrainSearchFilters {
  origin: string;
  destination: string;
  departDate: Date | null;
  returnDate: Date | null;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  trainClass: string;
  directTrains: boolean;
  priceRange: {
    min: number;
    max: number;
  };
  departureTime: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
    night: boolean;
  };
  trainOperators: string[];
}

interface Train {
  id: string;
  trainNumber: string;
  operator: string;
  logo: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  departureDate: string;
  duration: string;
  stops: number;
  stopStations: string[];
  price: number;
  trainClass: string;
  amenities: string[];
  seatsAvailable: number;
}

interface PopularRoute {
  id: number;
  origin: string;
  destination: string;
  image: string;
  price: number;
}

@Component({
  selector: 'app-trains',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatTabsModule,
    MatNativeDateModule
  ],
  templateUrl: './trains.html',
  styleUrl: './trains.scss'
})
export class TrainsComponent implements OnInit {
  searchFilters: TrainSearchFilters = {
    origin: '',
    destination: '',
    departDate: new Date(),
    returnDate: null,
    passengers: {
      adults: 1,
      children: 0,
      infants: 0
    },
    trainClass: 'second',
    directTrains: false,
    priceRange: {
      min: 0,
      max: 500
    },
    departureTime: {
      morning: true,
      afternoon: true,
      evening: true,
      night: true
    },
    trainOperators: []
  };

  trains: Train[] = [];
  filteredTrains: Train[] = [];
  paginatedTrains: Train[] = [];
  
  // Pagination
  pageSize = 4;
  pageSizeOptions = [4, 8, 12];
  totalItems = 0;
  currentPage = 0;
  
  // Sorting
  selectedSort = 'price_asc';
  sortOptions = [
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'duration_asc', label: 'Duration: Shortest' },
    { value: 'departure_asc', label: 'Departure: Earliest' },
    { value: 'arrival_asc', label: 'Arrival: Earliest' }
  ];
  
  // Train operators
  availableOperators = [
    { code: 'IR', name: 'Indian Railways' },
    { code: 'AMTRAK', name: 'Amtrak' },
    { code: 'EUROSTAR', name: 'Eurostar' },
    { code: 'DB', name: 'Deutsche Bahn' },
    { code: 'SNCF', name: 'SNCF' },
    { code: 'JR', name: 'Japan Railways' }
  ];
  
  // Popular routes
  popularRoutes: PopularRoute[] = [
    {
      id: 1,
      origin: 'New York',
      destination: 'Washington DC',
      image: '/assets/images/trains/nyc-dc.jpg',
      price: 89
    },
    {
      id: 2,
      origin: 'London',
      destination: 'Paris',
      image: '/assets/images/trains/london-paris.jpg',
      price: 199
    },
    {
      id: 3,
      origin: 'Tokyo',
      destination: 'Osaka',
      image: '/assets/images/trains/tokyo-osaka.jpg',
      price: 120
    },
    {
      id: 4,
      origin: 'Berlin',
      destination: 'Munich',
      image: '/assets/images/trains/berlin-munich.jpg',
      price: 79
    },
    {
      id: 5,
      origin: 'Madrid',
      destination: 'Barcelona',
      image: '/assets/images/trains/madrid-barcelona.jpg',
      price: 65
    }
  ];

  ngOnInit(): void {
    this.generateMockTrains();
    this.applyFilters();
  }

  generateMockTrains(): void {
    // Generate mock train data
    const mockTrains: Train[] = [
      {
        id: 't1',
        trainNumber: 'IR-12301',
        operator: 'Indian Railways',
        logo: '/assets/images/trains/ir-logo.png',
        origin: 'New Delhi',
        destination: 'Mumbai',
        departureTime: '06:30',
        arrivalTime: '22:45',
        departureDate: 'Mon, 15 Jul 2023',
        duration: '16h 15m',
        stops: 5,
        stopStations: ['Mathura', 'Kota', 'Ratlam', 'Vadodara', 'Surat'],
        price: 85,
        trainClass: 'second',
        amenities: ['Wi-Fi', 'Food Service', 'Power Outlets'],
        seatsAvailable: 42
      },
      {
        id: 't2',
        trainNumber: 'EUROSTAR-9011',
        operator: 'Eurostar',
        logo: '/assets/images/trains/eurostar-logo.png',
        origin: 'London',
        destination: 'Paris',
        departureTime: '08:15',
        arrivalTime: '11:45',
        departureDate: 'Mon, 15 Jul 2023',
        duration: '2h 30m',
        stops: 0,
        stopStations: [],
        price: 199,
        trainClass: 'first',
        amenities: ['Wi-Fi', 'Meal Service', 'Power Outlets', 'Quiet Zone'],
        seatsAvailable: 28
      },
      {
        id: 't3',
        trainNumber: 'AMTRAK-156',
        operator: 'Amtrak',
        logo: '/assets/images/trains/amtrak-logo.png',
        origin: 'New York',
        destination: 'Washington DC',
        departureTime: '10:00',
        arrivalTime: '13:30',
        departureDate: 'Mon, 15 Jul 2023',
        duration: '3h 30m',
        stops: 3,
        stopStations: ['Newark', 'Philadelphia', 'Baltimore'],
        price: 89,
        trainClass: 'business',
        amenities: ['Wi-Fi', 'Cafe Car', 'Power Outlets'],
        seatsAvailable: 56
      },
      {
        id: 't4',
        trainNumber: 'DB-ICE-802',
        operator: 'Deutsche Bahn',
        logo: '/assets/images/trains/db-logo.png',
        origin: 'Berlin',
        destination: 'Munich',
        departureTime: '12:30',
        arrivalTime: '17:15',
        departureDate: 'Mon, 15 Jul 2023',
        duration: '4h 45m',
        stops: 2,
        stopStations: ['Leipzig', 'Nuremberg'],
        price: 79,
        trainClass: 'second',
        amenities: ['Wi-Fi', 'Restaurant', 'Power Outlets', 'Quiet Zone'],
        seatsAvailable: 38
      },
      {
        id: 't5',
        trainNumber: 'SNCF-TGV-6201',
        operator: 'SNCF',
        logo: '/assets/images/trains/sncf-logo.png',
        origin: 'Paris',
        destination: 'Lyon',
        departureTime: '14:00',
        arrivalTime: '16:00',
        departureDate: 'Mon, 15 Jul 2023',
        duration: '2h 00m',
        stops: 0,
        stopStations: [],
        price: 65,
        trainClass: 'first',
        amenities: ['Wi-Fi', 'Meal Service', 'Power Outlets'],
        seatsAvailable: 24
      },
      {
        id: 't6',
        trainNumber: 'JR-SHINKANSEN-N700',
        operator: 'Japan Railways',
        logo: '/assets/images/trains/jr-logo.png',
        origin: 'Tokyo',
        destination: 'Osaka',
        departureTime: '09:00',
        arrivalTime: '11:30',
        departureDate: 'Mon, 15 Jul 2023',
        duration: '2h 30m',
        stops: 1,
        stopStations: ['Nagoya'],
        price: 120,
        trainClass: 'first',
        amenities: ['Wi-Fi', 'Food Service', 'Power Outlets', 'Quiet Zone'],
        seatsAvailable: 32
      },
      {
        id: 't7',
        trainNumber: 'IR-12302',
        operator: 'Indian Railways',
        logo: '/assets/images/trains/ir-logo.png',
        origin: 'New Delhi',
        destination: 'Mumbai',
        departureTime: '16:30',
        arrivalTime: '08:45',
        departureDate: 'Mon, 15 Jul 2023',
        duration: '16h 15m',
        stops: 5,
        stopStations: ['Mathura', 'Kota', 'Ratlam', 'Vadodara', 'Surat'],
        price: 75,
        trainClass: 'sleeper',
        amenities: ['Bedding', 'Food Service'],
        seatsAvailable: 86
      },
      {
        id: 't8',
        trainNumber: 'AMTRAK-158',
        operator: 'Amtrak',
        logo: '/assets/images/trains/amtrak-logo.png',
        origin: 'New York',
        destination: 'Washington DC',
        departureTime: '14:00',
        arrivalTime: '17:30',
        departureDate: 'Mon, 15 Jul 2023',
        duration: '3h 30m',
        stops: 3,
        stopStations: ['Newark', 'Philadelphia', 'Baltimore'],
        price: 92,
        trainClass: 'business',
        amenities: ['Wi-Fi', 'Cafe Car', 'Power Outlets'],
        seatsAvailable: 42
      }
    ];
    
    this.trains = mockTrains;
  }

  applyFilters(): void {
    // Apply filters to the trains array
    this.filteredTrains = this.trains.filter(train => {
      // Filter by direct trains
      if (this.searchFilters.directTrains && train.stops > 0) {
        return false;
      }
      
      // Filter by price range
      if (train.price < this.searchFilters.priceRange.min || 
          train.price > this.searchFilters.priceRange.max) {
        return false;
      }
      
      // Filter by train operators if any selected
      if (this.searchFilters.trainOperators.length > 0) {
        const operatorCode = this.getOperatorCode(train.operator);
        if (!this.searchFilters.trainOperators.includes(operatorCode)) {
          return false;
        }
      }
      
      // Filter by departure time
      const hour = parseInt(train.departureTime.split(':')[0], 10);
      const isMorning = hour >= 5 && hour < 12;
      const isAfternoon = hour >= 12 && hour < 18;
      const isEvening = hour >= 18 && hour < 24;
      const isNight = hour >= 0 && hour < 5;
      
      if ((isMorning && !this.searchFilters.departureTime.morning) ||
          (isAfternoon && !this.searchFilters.departureTime.afternoon) ||
          (isEvening && !this.searchFilters.departureTime.evening) ||
          (isNight && !this.searchFilters.departureTime.night)) {
        return false;
      }
      
      // Filter by train class if specified
      if (this.searchFilters.trainClass && 
          this.searchFilters.trainClass !== 'any' && 
          train.trainClass !== this.searchFilters.trainClass) {
        return false;
      }
      
      return true;
    });
    
    // Sort the filtered trains
    this.sortTrains();
    
    // Update pagination
    this.totalItems = this.filteredTrains.length;
    this.updatePaginatedTrains();
  }

  sortTrains(): void {
    this.filteredTrains.sort((a, b) => {
      switch (this.selectedSort) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'duration_asc':
          return this.getDurationMinutes(a.duration) - this.getDurationMinutes(b.duration);
        case 'departure_asc':
          return this.getTimeMinutes(a.departureTime) - this.getTimeMinutes(b.departureTime);
        case 'arrival_asc':
          return this.getTimeMinutes(a.arrivalTime) - this.getTimeMinutes(b.arrivalTime);
        default:
          return 0;
      }
    });
  }

  getDurationMinutes(duration: string): number {
    // Parse duration like "2h 30m" to minutes
    const hours = parseInt(duration.split('h')[0], 10) || 0;
    const minutes = parseInt(duration.split('h')[1]?.split('m')[0], 10) || 0;
    return hours * 60 + minutes;
  }

  getTimeMinutes(time: string): number {
    // Parse time like "14:30" to minutes since midnight
    const parts = time.split(':');
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }

  updatePaginatedTrains(): void {
    const startIndex = this.currentPage * this.pageSize;
    this.paginatedTrains = this.filteredTrains.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedTrains();
  }

  resetFilters(): void {
    this.searchFilters = {
      origin: this.searchFilters.origin,
      destination: this.searchFilters.destination,
      departDate: this.searchFilters.departDate,
      returnDate: this.searchFilters.returnDate,
      passengers: {
        adults: 1,
        children: 0,
        infants: 0
      },
      trainClass: 'any',
      directTrains: false,
      priceRange: {
        min: 0,
        max: 500
      },
      departureTime: {
        morning: true,
        afternoon: true,
        evening: true,
        night: true
      },
      trainOperators: []
    };
    
    this.applyFilters();
  }

  getTotalPassengers(): number {
    return this.searchFilters.passengers.adults + 
           this.searchFilters.passengers.children + 
           this.searchFilters.passengers.infants;
  }

  isOperatorSelected(code: string): boolean {
    return this.searchFilters.trainOperators.includes(code);
  }

  toggleOperator(code: string): void {
    const index = this.searchFilters.trainOperators.indexOf(code);
    if (index === -1) {
      this.searchFilters.trainOperators.push(code);
    } else {
      this.searchFilters.trainOperators.splice(index, 1);
    }
    this.applyFilters();
  }

  getOperatorCode(operatorName: string): string {
    const operator = this.availableOperators.find(op => op.name === operatorName);
    return operator ? operator.code : '';
  }

  selectRoute(route: PopularRoute): void {
    this.searchFilters.origin = route.origin;
    this.searchFilters.destination = route.destination;
    this.applyFilters();
  }
}
