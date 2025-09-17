import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-home',
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
    MatTabsModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {
  // Featured destinations
  featuredHotels = [
    { id: 1, name: 'Luxury Resort & Spa', location: 'Maldives', price: 299, rating: 4.8, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 2, name: 'Mountain View Lodge', location: 'Switzerland', price: 199, rating: 4.6, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 3, name: 'Urban Boutique Hotel', location: 'New York', price: 249, rating: 4.5, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 4, name: 'Beachfront Paradise', location: 'Bali', price: 179, rating: 4.7, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
  ];

  featuredFlights = [
    { id: 1, from: 'New York', to: 'London', price: 499, airline: 'Global Airways', departure: '10:00 AM', arrival: '10:30 PM' },
    { id: 2, from: 'Los Angeles', to: 'Tokyo', price: 799, airline: 'Pacific Flights', departure: '1:15 PM', arrival: '5:45 PM' },
    { id: 3, from: 'Chicago', to: 'Paris', price: 649, airline: 'Euro Connect', departure: '9:30 PM', arrival: '11:45 AM' },
    { id: 4, from: 'Miami', to: 'Rio de Janeiro', price: 549, airline: 'South American Airlines', departure: '8:20 AM', arrival: '7:10 PM' }
  ];

  // Search form data
  searchData = {
    destination: '',
    checkIn: new Date(),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 1)),
    guests: 2,
    rooms: 1
  };

  // Popular destinations
  popularDestinations = [
    { name: 'Paris', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', hotels: 1420 },
    { name: 'New York', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', hotels: 1080 },
    { name: 'Tokyo', image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', hotels: 980 },
    { name: 'Dubai', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', hotels: 850 },
    { name: 'Rome', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', hotels: 920 },
    { name: 'Sydney', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', hotels: 740 }
  ];

  // Special offers
  specialOffers = [
    { title: 'Summer Escape', discount: '30% OFF', description: 'Book your summer vacation and get 30% off on selected hotels', validUntil: 'June 30, 2023' },
    { title: 'Weekend Getaway', discount: '25% OFF', description: 'Perfect weekend trips with special discounts on luxury accommodations', validUntil: 'Ongoing' },
    { title: 'Family Package', discount: 'Kids Stay Free', description: 'Children under 12 stay and eat free when accompanied by adults', validUntil: 'December 31, 2023' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Initialize with tomorrow's date for checkout
    this.searchData.checkOut = new Date(new Date().setDate(new Date().getDate() + 1));
  }

  search(): void {
    console.log('Search data:', this.searchData);
    // Will be implemented with actual API calls
  }
}
