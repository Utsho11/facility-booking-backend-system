import mongoose from 'mongoose';
import config from '../config';
import { User } from '../modules/user/user.model';
import { Facility } from '../modules/facility/facility.model';
import { Booking } from '../modules/booking/booking.model';
import { Review } from '../modules/review/review.model';

const seedData = async () => {
  try {
    const mongoUri =
      config.database_url ||
      'mongodb+srv://assignment3:assignment3@cluster0.z2lq5.mongodb.net/facility-booking?retryWrites=true&w=majority';

    console.log('Connecting to database for seeding...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully!');

    // 1. Seed Demo Admin and Demo User
    console.log('Seeding Demo Accounts...');
    const demoAdminExists = await User.findOne({ email: 'demoadmin@gmail.com' });
    let adminUser = demoAdminExists;
    if (!demoAdminExists) {
      adminUser = await User.create({
        name: 'Demo Administrator',
        email: 'demoadmin@gmail.com',
        password: 'admin123456',
        phone: '01711223344',
        role: 'admin',
        address: 'HQ Tower, Suite 400, Banani, Dhaka',
      });
      console.log('Demo Admin created (demoadmin@gmail.com / admin123456)');
    } else {
      console.log('Demo Admin already exists');
    }

    const demoUserExists = await User.findOne({ email: 'demouser@gmail.com' });
    let athleteUser = demoUserExists;
    if (!demoUserExists) {
      athleteUser = await User.create({
        name: 'Demo Athlete Player',
        email: 'demouser@gmail.com',
        password: 'user123456',
        phone: '01855667788',
        role: 'user',
        address: 'Sector 4, Road 11, Uttara, Dhaka',
      });
      console.log('Demo User created (demouser@gmail.com / user123456)');
    } else {
      console.log('Demo User already exists');
    }

    // 2. Seed High-Quality Facilities with categories and amenities
    console.log('Seeding Sports Facilities...');
    const facilitiesList = [
      {
        name: 'Grand Slam Championship Tennis Arena',
        category: 'tennis',
        description:
          'Pro-grade acrylic hard-court featuring tournament floodlights, ball machines, electronic scoreboard, and shaded spectator stands.',
        pricePerHour: 45,
        location: 'Gulshan 2 Sports Enclave, Dhaka',
        image:
          'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=80',
        amenities: ['Night Floodlights', 'Locker Rooms', 'Pro Ball Machine', 'Spectator Lounge', 'Free Parking'],
        rating: 4.9,
        reviewsCount: 28,
        isDeleted: false,
      },
      {
        name: 'Apex Pro Wooden Badminton Complex',
        category: 'badminton',
        description:
          '6-court BWF standard shock-absorbing teakwood flooring with glare-free anti-flicker LED illumination, locker rooms, and AC lounge.',
        pricePerHour: 30,
        location: 'Dhanmondi Club Road, Dhaka',
        image:
          'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80',
        amenities: ['BWF Teakwood Floor', 'AC Lounge', 'Racket Rental', 'Shower Rooms', 'Free WiFi'],
        rating: 4.8,
        reviewsCount: 34,
        isDeleted: false,
      },
      {
        name: 'Stamford FIFA 2-Star Turf Football Ground',
        category: 'football',
        description:
          'All-weather FIFA-certified 7-a-side artificial turf pitch equipped with high-mast night stadium lighting, dugout benches, and referee booth.',
        pricePerHour: 60,
        location: 'Bashundhara R/A Block I, Dhaka',
        image:
          'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80',
        amenities: ['FIFA Certified Turf', 'Stadium Floodlights', 'Team Dugouts', 'Referee Booth', 'Cafeteria'],
        rating: 4.9,
        reviewsCount: 42,
        isDeleted: false,
      },
      {
        name: 'Skyline Hardwood Indoor Basketball Arena',
        category: 'basketball',
        description:
          'NBA regulation maple wood court with tempered glass spring-loaded breakaway hoops, digital 24s shot clocks, and team bench seating.',
        pricePerHour: 50,
        location: 'Mirpur DOHS Avenue, Dhaka',
        image:
          'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
        amenities: ['NBA Maple Court', 'Breakaway Rims', '24s Shot Clocks', 'Sound System', 'Locker Rooms'],
        rating: 4.8,
        reviewsCount: 19,
        isDeleted: false,
      },
      {
        name: 'AquaPulse Olympic Heated Swimming Center',
        category: 'swimming',
        description:
          '50-meter 8-lane temperature-controlled swimming facility with UV-sanitized chlorine-free filtration, diving blocks, and certified lifeguards.',
        pricePerHour: 40,
        location: 'Uttara Sector 7 Lakefront, Dhaka',
        image:
          'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?auto=format&fit=crop&w=1200&q=80',
        amenities: ['50m Olympic Pool', 'Heated Water', 'UV Filtration', 'Certified Lifeguard', 'Sauna'],
        rating: 4.9,
        reviewsCount: 26,
        isDeleted: false,
      },
      {
        name: 'The Pavilion Cricket Bowling Nets',
        category: 'cricket',
        description:
          'High-speed robotic bowling machines, multi-surface astroturf pitches with calibrated speed radars and HD video replay analysis.',
        pricePerHour: 35,
        location: 'Mohakhali Sports Hub, Dhaka',
        image:
          'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80',
        amenities: ['Robotic Bowling Machine', 'Speed Radar', 'Video Analysis', 'Gear Rental', 'Free Parking'],
        rating: 4.7,
        reviewsCount: 22,
        isDeleted: false,
      },
      {
        name: 'Velocity Glass-Wall Squash Court',
        category: 'squash',
        description:
          'WSF-accredited air-conditioned squash court with high-impact tempered glass back walls and high-rebound calibrated floor springs.',
        pricePerHour: 28,
        location: 'Banani Road 11 Club, Dhaka',
        image:
          'https://images.unsplash.com/photo-1558365849-6ebd8b0454b2?auto=format&fit=crop&w=1200&q=80',
        amenities: ['WSF Glass Backwall', 'Full Air Condition', 'Floor Springs', 'Coaching Available'],
        rating: 4.8,
        reviewsCount: 15,
        isDeleted: false,
      },
      {
        name: 'Oasis Sunset Beach Volleyball Arena',
        category: 'volleyball',
        description:
          'Deep-sifted non-compacting silica sand court with tournament-height adjustable nets, boundary antennas, and tropical rinse showers.',
        pricePerHour: 25,
        location: 'Purbachal Express Park, Dhaka',
        image:
          'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80',
        amenities: ['Silica Sand Court', 'Adjustable Nets', 'Rinse Showers', 'Night Lights', 'Chillout Deck'],
        rating: 4.9,
        reviewsCount: 31,
        isDeleted: false,
      },
    ];

    const insertedFacilities = [];
    for (const item of facilitiesList) {
      const existing = await Facility.findOne({ name: item.name });
      if (!existing) {
        const created = await Facility.create(item);
        insertedFacilities.push(created);
      } else {
        await Facility.updateOne({ _id: existing._id }, { $set: item });
        insertedFacilities.push(existing);
      }
    }
    console.log(`Seeded/verified ${insertedFacilities.length} facilities.`);

    // 3. Seed Verified Reviews & Ratings
    if (athleteUser && insertedFacilities.length > 0) {
      console.log('Seeding Player Reviews...');
      const sampleReviews = [
        {
          facility: insertedFacilities[0]._id,
          user: athleteUser._id,
          rating: 5,
          comment:
            'Top tier tennis court! The surface grip is outstanding and the night floodlights have zero blind spots. Will book again every weekend.',
        },
        {
          facility: insertedFacilities[1]._id,
          user: athleteUser._id,
          rating: 5,
          comment:
            'The wooden flooring is gentle on the knees and the high-ceiling lighting is glare-free. Best badminton facility in town!',
        },
        {
          facility: insertedFacilities[2]._id,
          user: athleteUser._id,
          rating: 4,
          comment:
            'Great turf quality with proper cushioning. Ample parking space and clean changing rooms.',
        },
        {
          facility: insertedFacilities[3]._id,
          user: athleteUser._id,
          rating: 5,
          comment:
            'Awesome NBA-style court! The breakaway rims are legit and the ball bounce is super consistent.',
        },
      ];

      for (const rev of sampleReviews) {
        const exists = await Review.findOne({
          facility: rev.facility,
          user: rev.user,
        });
        if (!exists) {
          await Review.create(rev);
        }
      }
      console.log('Seeded player reviews successfully.');
    }

    // 4. Seed Sample Bookings
    if (athleteUser && insertedFacilities.length > 0) {
      console.log('Seeding Sample Bookings...');
      const sampleBookings = [
        {
          facility: insertedFacilities[0]._id,
          user: athleteUser._id,
          date: '2026-08-25',
          startTime: '10:00',
          endTime: '12:00',
          payableAmount: 90,
          isBooked: 'confirmed',
          paymentStatus: 'paid',
          transactionId: 'TXN_TEST_DEMO_01',
        },
        {
          facility: insertedFacilities[1]._id,
          user: athleteUser._id,
          date: '2026-08-26',
          startTime: '16:00',
          endTime: '18:00',
          payableAmount: 60,
          isBooked: 'confirmed',
          paymentStatus: 'paid',
          transactionId: 'TXN_TEST_DEMO_02',
        },
        {
          facility: insertedFacilities[2]._id,
          user: athleteUser._id,
          date: '2026-08-27',
          startTime: '19:00',
          endTime: '21:00',
          payableAmount: 120,
          isBooked: 'confirmed',
          paymentStatus: 'paid',
          transactionId: 'TXN_TEST_DEMO_03',
        },
      ];

      for (const b of sampleBookings) {
        const exists = await Booking.findOne({ transactionId: b.transactionId });
        if (!exists) {
          await Booking.create(b);
        }
      }
      console.log('Seeded sample bookings successfully.');
    }

    console.log('🎉 Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
