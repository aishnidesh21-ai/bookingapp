import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSliderModule,
    MatCheckboxModule,
    MatChipsModule,
    MatPaginatorModule
  ],
  templateUrl: './hotels.html',
  styleUrl: './hotels.scss'
})
export class HotelsComponent implements OnInit {
  // Search filters
  searchFilters = {
    destination: '',
    checkIn: new Date(),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 1)),
    guests: 2,
    rooms: 1,
    minPrice: 0,
    maxPrice: 1000,
    starRating: 0,
    amenities: {
      wifi: false,
      parking: false,
      pool: false,
      spa: false,
      restaurant: false,
      airConditioning: false,
      petFriendly: false,
      gym: false
    }
  };

  // Hotel listings
  hotels = [
    {
      id: 1,
      name: 'Grand Plaza Hotel',
      location: 'New York',
      price: 299,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Luxury hotel in the heart of Manhattan with stunning city views.',
      amenities: ['Free WiFi', 'Parking', 'Pool', 'Spa', 'Restaurant']
    },
    {
      id: 2,
      name: 'Seaside Resort',
      location: 'Miami',
      price: 199,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Beachfront resort with private access to white sand beaches.',
      amenities: ['Free WiFi', 'Pool', 'Beach Access', 'Restaurant', 'Bar']
    },
    {
      id: 3,
      name: 'Mountain View Lodge',
      location: 'Denver',
      price: 159,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Cozy lodge with breathtaking mountain views and hiking trails.',
      amenities: ['Free WiFi', 'Parking', 'Fireplace', 'Restaurant']
    },
    {
      id: 4,
      name: 'City Center Suites',
      location: 'Chicago',
      price: 249,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Modern suites in downtown with easy access to attractions.',
      amenities: ['Free WiFi', 'Gym', 'Business Center', 'Restaurant']
    },
    {
      id: 5,
      name: 'Historic Boutique Hotel',
      location: 'Boston',
      price: 279,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Charming hotel in a renovated historic building with character.',
      amenities: ['Free WiFi', 'Breakfast Included', 'Bar', 'Library']
    },
    {
      id: 6,
      name: 'Sunset Beach Resort',
      location: 'San Diego',
      price: 329,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Luxury beachfront resort with stunning sunset views.',
      amenities: ['Free WiFi', 'Pool', 'Spa', 'Beach Access', 'Multiple Restaurants']
    }
  ];

  // Filtered hotels
  filteredHotels = [...this.hotels];

  // Pagination
  pageSize = 4;
  currentPage = 0;
  totalItems = this.hotels.length;

  // Sort options
  sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating-desc', label: 'Rating: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' }
  ];
  selectedSort = 'rating-desc';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get query params from URL
    this.route.queryParams.subscribe(params => {
      if (params['city']) {
        this.searchFilters.destination = params['city'];
        this.applyFilters();
      }
    });
  }

  // Apply filters to hotel list
  applyFilters(): void {
    this.filteredHotels = this.hotels.filter(hotel => {
      // Filter by destination
      if (this.searchFilters.destination && 
          !hotel.location.toLowerCase().includes(this.searchFilters.destination.toLowerCase())) {
        return false;
      }
      
      // Filter by price range
      if (hotel.price < this.searchFilters.minPrice || hotel.price > this.searchFilters.maxPrice) {
        return false;
      }
      
      // Filter by star rating
      if (this.searchFilters.starRating > 0 && hotel.rating < this.searchFilters.starRating) {
        return false;
      }
      
      return true;
    });
    
    // Apply sorting
    this.sortHotels();
    
    // Reset pagination
    this.currentPage = 0;
    this.totalItems = this.filteredHotels.length;
  }

  // Sort hotels based on selected option
  sortHotels(): void {
    switch (this.selectedSort) {
      case 'price-asc':
        this.filteredHotels.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        this.filteredHotels.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        this.filteredHotels.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        this.filteredHotels.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
  }

  // Handle page change
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  // Get current page items
  get paginatedHotels(): any[] {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredHotels.slice(start, end);
  }

  // Reset all filters
  resetFilters(): void {
    this.searchFilters = {
      destination: '',
      checkIn: new Date(),
      checkOut: new Date(new Date().setDate(new Date().getDate() + 1)),
      guests: 2,
      rooms: 1,
      minPrice: 0,
      maxPrice: 1000,
      starRating: 0,
      amenities: {
        wifi: false,
        parking: false,
        pool: false,
        spa: false,
        restaurant: false,
        airConditioning: false,
        petFriendly: false,
        gym: false
      }
    };
    this.applyFilters();
  }
}
