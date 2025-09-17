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

interface CabSearchFilters {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: Date | null;
  pickupTime: string;
  returnDate: Date | null;
  returnTime: string;
  passengers: number;
  cabType: string;
  priceRange: {
    min: number;
    max: number;
  };
  features: {
    airConditioned: boolean;
    wifi: boolean;
    childSeat: boolean;
    gps: boolean;
    musicSystem: boolean;
  };
  providers: string[];
}

interface Cab {
  id: string;
  name: string;
  provider: string;
  providerLogo: string;
  type: string;
  image: string;
  capacity: number;
  luggage: number;
  price: number;
  rating: number;
  reviewCount: number;
  features: string[];
  estimatedTime: string;
  distance: string;
}

interface PopularRoute {
  id: number;
  from: string;
  to: string;
  image: string;
  price: number;
}

@Component({
  selector: 'app-cabs',
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
  templateUrl: './cabs.html',
  styleUrl: './cabs.scss'
})
export class CabsComponent implements OnInit {
  searchFilters: CabSearchFilters = {
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: new Date(),
    pickupTime: '12:00',
    returnDate: null,
    returnTime: '12:00',
    passengers: 2,
    cabType: 'any',
    priceRange: {
      min: 0,
      max: 200
    },
    features: {
      airConditioned: false,
      wifi: false,
      childSeat: false,
      gps: false,
      musicSystem: false
    },
    providers: []
  };

  cabs: Cab[] = [];
  filteredCabs: Cab[] = [];
  paginatedCabs: Cab[] = [];
  
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
    { value: 'rating_desc', label: 'Rating: Highest First' },
    { value: 'distance_asc', label: 'Distance: Shortest First' }
  ];
  
  // Cab providers
  availableProviders = [
    { code: 'UBER', name: 'Uber' },
    { code: 'LYFT', name: 'Lyft' },
    { code: 'OLA', name: 'Ola Cabs' },
    { code: 'BOLT', name: 'Bolt' },
    { code: 'GRAB', name: 'Grab' },
    { code: 'DIDI', name: 'DiDi' }
  ];
  
  // Cab types
  cabTypes = [
    { value: 'any', label: 'Any Type' },
    { value: 'economy', label: 'Economy' },
    { value: 'compact', label: 'Compact' },
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'van', label: 'Van' }
  ];
  
  // Popular routes
  popularRoutes: PopularRoute[] = [
    {
      id: 1,
      from: 'Airport',
      to: 'Downtown',
      image: '/assets/images/cabs/airport-downtown.jpg',
      price: 35
    },
    {
      id: 2,
      from: 'Hotel Zone',
      to: 'Beach Resort',
      image: '/assets/images/cabs/hotel-beach.jpg',
      price: 25
    },
    {
      id: 3,
      from: 'City Center',
      to: 'Shopping Mall',
      image: '/assets/images/cabs/city-mall.jpg',
      price: 15
    },
    {
      id: 4,
      from: 'Convention Center',
      to: 'Business District',
      image: '/assets/images/cabs/convention-business.jpg',
      price: 30
    }
  ];

  ngOnInit(): void {
    this.generateMockCabs();
    this.applyFilters();
  }

  generateMockCabs(): void {
    // Generate mock cab data
    const mockCabs: Cab[] = [
      {
        id: 'c1',
        name: 'Toyota Camry',
        provider: 'Uber',
        providerLogo: '/assets/images/cabs/uber-logo.png',
        type: 'sedan',
        image: '/assets/images/cabs/toyota-camry.jpg',
        capacity: 4,
        luggage: 2,
        price: 35,
        rating: 4.8,
        reviewCount: 245,
        features: ['Air Conditioning', 'WiFi', 'GPS'],
        estimatedTime: '15 min',
        distance: '5.2 miles'
      },
      {
        id: 'c2',
        name: 'Honda Civic',
        provider: 'Lyft',
        providerLogo: '/assets/images/cabs/lyft-logo.png',
        type: 'economy',
        image: '/assets/images/cabs/honda-civic.jpg',
        capacity: 4,
        luggage: 1,
        price: 28,
        rating: 4.6,
        reviewCount: 189,
        features: ['Air Conditioning', 'GPS'],
        estimatedTime: '12 min',
        distance: '4.8 miles'
      },
      {
        id: 'c3',
        name: 'Ford Explorer',
        provider: 'Uber',
        providerLogo: '/assets/images/cabs/uber-logo.png',
        type: 'suv',
        image: '/assets/images/cabs/ford-explorer.jpg',
        capacity: 6,
        luggage: 3,
        price: 45,
        rating: 4.7,
        reviewCount: 156,
        features: ['Air Conditioning', 'WiFi', 'GPS', 'Child Seat', 'Music System'],
        estimatedTime: '18 min',
        distance: '5.5 miles'
      },
      {
        id: 'c4',
        name: 'Mercedes E-Class',
        provider: 'Bolt',
        providerLogo: '/assets/images/cabs/bolt-logo.png',
        type: 'luxury',
        image: '/assets/images/cabs/mercedes-eclass.jpg',
        capacity: 4,
        luggage: 2,
        price: 65,
        rating: 4.9,
        reviewCount: 112,
        features: ['Air Conditioning', 'WiFi', 'GPS', 'Music System'],
        estimatedTime: '10 min',
        distance: '4.2 miles'
      },
      {
        id: 'c5',
        name: 'Toyota Sienna',
        provider: 'Ola Cabs',
        providerLogo: '/assets/images/cabs/ola-logo.png',
        type: 'van',
        image: '/assets/images/cabs/toyota-sienna.jpg',
        capacity: 7,
        luggage: 4,
        price: 55,
        rating: 4.5,
        reviewCount: 98,
        features: ['Air Conditioning', 'WiFi', 'GPS', 'Child Seat'],
        estimatedTime: '20 min',
        distance: '6.1 miles'
      },
      {
        id: 'c6',
        name: 'Hyundai Accent',
        provider: 'Grab',
        providerLogo: '/assets/images/cabs/grab-logo.png',
        type: 'compact',
        image: '/assets/images/cabs/hyundai-accent.jpg',
        capacity: 4,
        luggage: 1,
        price: 25,
        rating: 4.4,
        reviewCount: 176,
        features: ['Air Conditioning', 'GPS'],
        estimatedTime: '14 min',
        distance: '5.0 miles'
      },
      {
        id: 'c7',
        name: 'BMW 5 Series',
        provider: 'DiDi',
        providerLogo: '/assets/images/cabs/didi-logo.png',
        type: 'luxury',
        image: '/assets/images/cabs/bmw-5series.jpg',
        capacity: 4,
        luggage: 2,
        price: 75,
        rating: 4.9,
        reviewCount: 87,
        features: ['Air Conditioning', 'WiFi', 'GPS', 'Music System'],
        estimatedTime: '15 min',
        distance: '5.3 miles'
      },
      {
        id: 'c8',
        name: 'Chevrolet Spark',
        provider: 'Lyft',
        providerLogo: '/assets/images/cabs/lyft-logo.png',
        type: 'economy',
        image: '/assets/images/cabs/chevrolet-spark.jpg',
        capacity: 4,
        luggage: 1,
        price: 22,
        rating: 4.3,
        reviewCount: 145,
        features: ['Air Conditioning', 'GPS'],
        estimatedTime: '16 min',
        distance: '5.4 miles'
      }
    ];
    
    this.cabs = mockCabs;
  }

  applyFilters(): void {
    // Apply filters to the cabs array
    this.filteredCabs = this.cabs.filter(cab => {
      // Filter by price range
      if (cab.price < this.searchFilters.priceRange.min || 
          cab.price > this.searchFilters.priceRange.max) {
        return false;
      }
      
      // Filter by cab type
      if (this.searchFilters.cabType !== 'any' && cab.type !== this.searchFilters.cabType) {
        return false;
      }
      
      // Filter by passenger capacity
      if (cab.capacity < this.searchFilters.passengers) {
        return false;
      }
      
      // Filter by cab providers if any selected
      if (this.searchFilters.providers.length > 0) {
        const providerCode = this.getProviderCode(cab.provider);
        if (!this.searchFilters.providers.includes(providerCode)) {
          return false;
        }
      }
      
      // Filter by features
      if (this.searchFilters.features.airConditioned && 
          !cab.features.includes('Air Conditioning')) {
        return false;
      }
      
      if (this.searchFilters.features.wifi && 
          !cab.features.includes('WiFi')) {
        return false;
      }
      
      if (this.searchFilters.features.childSeat && 
          !cab.features.includes('Child Seat')) {
        return false;
      }
      
      if (this.searchFilters.features.gps && 
          !cab.features.includes('GPS')) {
        return false;
      }
      
      if (this.searchFilters.features.musicSystem && 
          !cab.features.includes('Music System')) {
        return false;
      }
      
      return true;
    });
    
    // Sort the filtered cabs
    this.sortCabs();
    
    // Update pagination
    this.totalItems = this.filteredCabs.length;
    this.updatePaginatedCabs();
  }

  sortCabs(): void {
    this.filteredCabs.sort((a, b) => {
      switch (this.selectedSort) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'rating_desc':
          return b.rating - a.rating;
        case 'distance_asc':
          return this.getDistanceMiles(a.distance) - this.getDistanceMiles(b.distance);
        default:
          return 0;
      }
    });
  }

  getDistanceMiles(distance: string): number {
    // Parse distance like "5.2 miles" to number
    return parseFloat(distance.split(' ')[0]);
  }

  updatePaginatedCabs(): void {
    const startIndex = this.currentPage * this.pageSize;
    this.paginatedCabs = this.filteredCabs.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedCabs();
  }

  resetFilters(): void {
    this.searchFilters = {
      pickupLocation: this.searchFilters.pickupLocation,
      dropoffLocation: this.searchFilters.dropoffLocation,
      pickupDate: this.searchFilters.pickupDate,
      pickupTime: this.searchFilters.pickupTime,
      returnDate: this.searchFilters.returnDate,
      returnTime: this.searchFilters.returnTime,
      passengers: 2,
      cabType: 'any',
      priceRange: {
        min: 0,
        max: 200
      },
      features: {
        airConditioned: false,
        wifi: false,
        childSeat: false,
        gps: false,
        musicSystem: false
      },
      providers: []
    };
    
    this.applyFilters();
  }

  isProviderSelected(code: string): boolean {
    return this.searchFilters.providers.includes(code);
  }

  toggleProvider(code: string): void {
    const index = this.searchFilters.providers.indexOf(code);
    if (index === -1) {
      this.searchFilters.providers.push(code);
    } else {
      this.searchFilters.providers.splice(index, 1);
    }
    this.applyFilters();
  }

  getProviderCode(providerName: string): string {
    const provider = this.availableProviders.find(p => p.name === providerName);
    return provider ? provider.code : '';
  }

  selectRoute(route: PopularRoute): void {
    this.searchFilters.pickupLocation = route.from;
    this.searchFilters.dropoffLocation = route.to;
    this.applyFilters();
  }

  incrementPassengers(): void {
    if (this.searchFilters.passengers < 10) {
      this.searchFilters.passengers++;
    }
  }

  decrementPassengers(): void {
    if (this.searchFilters.passengers > 1) {
      this.searchFilters.passengers--;
    }
  }

  getRatingStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars: number[] = [];
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(1);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(0.5);
    }
    
    // Add empty stars
    while (stars.length < 5) {
      stars.push(0);
    }
    
    return stars;
  }
}
