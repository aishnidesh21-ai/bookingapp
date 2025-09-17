import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './hotel-detail.html',
  styleUrl: './hotel-detail.scss'
})
export class HotelDetailComponent implements OnInit {
  hotelId: number = 0;
  hotel: any = {};
  
  // Mock hotel data
  hotels = [
    {
      id: 1,
      name: 'Grand Plaza Hotel',
      location: 'New York',
      price: 299,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Luxury hotel in the heart of Manhattan with stunning city views.',
      amenities: ['Free WiFi', 'Parking', 'Pool', 'Spa', 'Restaurant'],
      address: '123 Broadway, New York, NY 10001',
      phone: '+1 (212) 555-1234',
      email: 'info@grandplaza.com',
      checkIn: '3:00 PM',
      checkOut: '11:00 AM',
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      ],
      rooms: [
        {
          type: 'Standard Room',
          price: 299,
          capacity: '2 Adults',
          amenities: ['Free WiFi', 'TV', 'Air Conditioning', 'Mini Bar'],
          image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          type: 'Deluxe Room',
          price: 399,
          capacity: '2 Adults, 1 Child',
          amenities: ['Free WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'City View'],
          image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          type: 'Executive Suite',
          price: 599,
          capacity: '2 Adults, 2 Children',
          amenities: ['Free WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'City View', 'Living Room', 'Jacuzzi'],
          image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
      ],
      reviews: [
        {
          name: 'John Smith',
          rating: 5,
          date: '2023-05-15',
          comment: 'Excellent hotel with amazing service. The staff was very friendly and helpful.'
        },
        {
          name: 'Sarah Johnson',
          rating: 4,
          date: '2023-04-22',
          comment: 'Great location and comfortable rooms. The breakfast could be better.'
        },
        {
          name: 'Michael Brown',
          rating: 5,
          date: '2023-03-10',
          comment: 'One of the best hotels I\'ve stayed at. The view from my room was breathtaking.'
        }
      ]
    },
    {
      id: 2,
      name: 'Seaside Resort',
      location: 'Miami',
      price: 349,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      description: 'Beachfront resort with stunning ocean views and private beach access.',
      amenities: ['Free WiFi', 'Pool', 'Beach Access', 'Spa', 'Restaurant'],
      address: '456 Ocean Drive, Miami, FL 33139',
      phone: '+1 (305) 555-6789',
      email: 'info@seasideresort.com',
      checkIn: '4:00 PM',
      checkOut: '10:00 AM',
      images: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1562790351-d273a961e0e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      ],
      rooms: [
        {
          type: 'Ocean View Room',
          price: 349,
          capacity: '2 Adults',
          amenities: ['Free WiFi', 'TV', 'Air Conditioning', 'Balcony', 'Ocean View'],
          image: 'https://images.unsplash.com/photo-1562790351-d273a961e0e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          type: 'Beach Front Suite',
          price: 499,
          capacity: '2 Adults, 2 Children',
          amenities: ['Free WiFi', 'TV', 'Air Conditioning', 'Balcony', 'Direct Beach Access'],
          image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
      ],
      reviews: [
        {
          name: 'Emily Wilson',
          rating: 5,
          date: '2023-06-02',
          comment: 'Perfect beach getaway! The resort is beautiful and the staff is amazing.'
        },
        {
          name: 'David Lee',
          rating: 4,
          date: '2023-05-18',
          comment: 'Great location right on the beach. Rooms are spacious and clean.'
        }
      ]
    }
  ];

  // Booking form data
  bookingData = {
    checkIn: new Date(),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 1)),
    guests: 2,
    rooms: 1,
    roomType: ''
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hotelId = +params['id'];
      this.loadHotelDetails();
    });
  }

  loadHotelDetails(): void {
    // In a real app, this would be an API call
    this.hotel = this.hotels.find(h => h.id === this.hotelId) || this.hotels[0];
    if (this.hotel && this.hotel.rooms && this.hotel.rooms.length > 0) {
      this.bookingData.roomType = this.hotel.rooms[0].type;
    }
  }

  bookNow(): void {
    console.log('Booking data:', this.bookingData);
    alert('Booking successful! Check your email for confirmation.');
  }

  getRatingStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return [
      ...Array(fullStars).fill(1),
      ...(hasHalfStar ? [0.5] : []),
      ...Array(emptyStars).fill(0)
    ];
  }
}