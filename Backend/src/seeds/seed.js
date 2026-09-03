import mongoose from 'mongoose';
import env from '../config/env.js';
import connectDB from '../config/db.js';
import { User } from '../models/user.model.js';
import { Service } from '../models/service.model.js';
import { Product } from '../models/product.model.js';
import { Gallery } from '../models/gallery.model.js';
import { Testimonial } from '../models/testimonial.model.js';
import { Setting } from '../models/setting.model.js';
import { Enquiry } from '../models/enquiry.model.js';
import { slugify } from '../utils/slugify.js';

const seedData = async () => {
  try {
    await connectDB();
    console.log('[Seeder] Connected to database. Beginning seed process...');

    // Clear existing collections
    await Promise.all([
      User.deleteMany({}),
      Service.deleteMany({}),
      Product.deleteMany({}),
      Gallery.deleteMany({}),
      Testimonial.deleteMany({}),
      Setting.deleteMany({}),
      Enquiry.deleteMany({})
    ]);
    console.log('[Seeder] Cleared existing data.');

    // 1. Seed Users (Admin & Sample Customer)
    console.log('[Seeder] Seeding Users...');
    const adminUser = await User.create({
      name: 'Prem Admin',
      email: 'admin@premAtoZ.com',
      mobile: '9454107810',
      password: 'AdminPassword@123',
      role: 'admin',
      isActive: true
    });

    const customerUser = await User.create({
      name: 'Ramesh Kumar',
      email: 'ramesh@example.com',
      mobile: '9876543210',
      password: 'Customer@123',
      role: 'customer',
      isActive: true
    });

    console.log(`[Seeder] Seeded Admin (${adminUser.email}) and Customer (${customerUser.email}).`);

    // 2. Seed Services
    console.log('[Seeder] Seeding Services...');
    const servicesData = [
      {
        title: 'Doors',
        slug: slugify('Doors'),
        description:
          'Custom luxury wooden and flush doors, decorative veneer doors, and sturdy security doors designed to match your interior architecture.',
        shortDescription: 'Custom wooden, flush, and decorative doors tailored for durability and elegance.',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        features: [
          'Solid teak & flush wood options',
          'Premium veneer & laminate finishes',
          'Precision CNC carving & glass inserts',
          'Heavy-duty hardware and locking systems'
        ],
        isActive: true
      },
      {
        title: 'Kitchen',
        slug: slugify('Kitchen'),
        description:
          'Modern modular kitchen solutions with smart storage, soft-close hardware, premium quartz countertops, and water-resistant boiling-water-proof (BWP) ply.',
        shortDescription: 'Ergonomic, modern modular kitchens with premium hardware and smart storage.',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
        features: [
          'L-shaped, U-shaped, and Island designs',
          'Tandem boxes with soft-close mechanisms',
          'Waterproof Marine/BWP plywood carcass',
          'Acrylic, PU, and membrane shutter finishes'
        ],
        isActive: true
      },
      {
        title: 'POP & False Ceiling',
        slug: slugify('POP & False Ceiling'),
        description:
          'Artistic gypsum and POP false ceilings, cove lighting grids, acoustic insulation, and contemporary architectural patterns for living rooms and bedrooms.',
        shortDescription: 'Artistic gypsum & POP false ceilings with designer cove lighting.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        features: [
          'Seamless Gyproc gypsum boards',
          'Indirect ambient LED cove lighting',
          'Custom geometric and layered patterns',
          'Thermal insulation and acoustic damping'
        ],
        isActive: true
      },
      {
        title: 'Electrical Work',
        slug: slugify('Electrical Work'),
        description:
          'Complete concealed electrical wiring, designer lighting fixtures, smart switch integrations, MCB distribution boxes, and safety certification.',
        shortDescription: 'Turnkey concealed electrical installation, designer fixtures, and safety switchboards.',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
        features: [
          'Concealed FR fire-retardant wiring',
          'Modular switch plates and smart automation',
          'Accent profiles, spotlights, and chandeliers',
          'Safe load distribution and earthing'
        ],
        isActive: true
      },
      {
        title: 'Complete Furniture Work',
        slug: slugify('Complete Furniture Work'),
        description:
          'End-to-end turnkey woodwork including custom sliding wardrobes, ergonomic beds, floating TV units, crockery display cabinets, and study workstations.',
        shortDescription: 'Custom wardrobes, beds, TV units, and bespoke woodwork built to perfection.',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        features: [
          'Full-height sliding and openable wardrobes',
          'Hydraulic storage beds with upholstered headboards',
          'Sleek floating TV entertainment units',
          'Premium hardware with 10-year warranty'
        ],
        isActive: true
      }
    ];

    await Service.insertMany(servicesData);
    console.log('[Seeder] Seeded 5 core services.');

    // 3. Seed Products
    console.log('[Seeder] Seeding Products...');
    const productsData = [
      {
        name: 'Teak Finish Solid Wooden Door',
        slug: slugify('Teak Finish Solid Wooden Door'),
        category: 'Doors',
        description: 'Handcrafted solid teak wooden door with intricate groove details and weatherproof coating.',
        images: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'],
        features: ['Natural Teak Grain', 'Weather-resistant PU polish', 'Standard 7x3.5 ft'],
        isActive: true
      },
      {
        name: 'L-Shaped Acrylic Modular Kitchen',
        slug: slugify('L-Shaped Acrylic Modular Kitchen'),
        category: 'Kitchen',
        description: 'Contemporary L-shaped modular kitchen with high-gloss anti-scratch acrylic shutters and quartz countertop.',
        images: ['https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'],
        features: ['Hettich soft-close channels', 'Built-in cutlery and thali trays', 'Concealed profile handles'],
        isActive: true
      },
      {
        name: 'Modern Gypsum False Ceiling with LED Profiles',
        slug: slugify('Modern Gypsum False Ceiling with LED Profiles'),
        category: 'POP & False Ceiling',
        description: 'Minimalist living room ceiling layout featuring recessed COB lights and continuous warm white profile channels.',
        images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
        features: ['Fire-resistant Gyproc', 'Dual-circuit lighting control', 'Smooth matte paint finish'],
        isActive: true
      },
      {
        name: 'Full Height Sliding Wardrobe with Mirror Panel',
        slug: slugify('Full Height Sliding Wardrobe with Mirror Panel'),
        category: 'Complete Furniture Work',
        description: 'Space-saving 8-foot sliding wardrobe featuring bronze tinted mirror panels and interior sensor LED lights.',
        images: ['https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80'],
        features: ['Smooth anti-jump rollers', 'Dedicated locker and saree organizer', 'Soft-cushion bumpers'],
        isActive: true
      }
    ];

    await Product.insertMany(productsData);
    console.log('[Seeder] Seeded sample products.');

    // 4. Seed Gallery
    console.log('[Seeder] Seeding Gallery Items...');
    const galleryData = [
      {
        title: 'Luxury Living Room Interior',
        category: 'Living Room',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        description: 'Warm lighting paired with Italian marble flooring, custom TV unit, and POP ceiling.',
        isPublished: true
      },
      {
        title: 'Modern Minimalist Island Kitchen',
        category: 'Kitchen',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
        description: 'High-gloss dual-tone modular kitchen with breakfast counter in Gorakhpur residence.',
        isPublished: true
      },
      {
        title: 'Designer Bedroom False Ceiling',
        category: 'Ceiling',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
        description: 'Cove lighting and geometric grid ceiling enhancing cozy bedroom ambiance.',
        isPublished: true
      },
      {
        title: 'Master Bedroom Wardrobe & Headboard',
        category: 'Bedroom',
        image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
        description: 'Custom fluted panel bed back with matching sliding wardrobe.',
        isPublished: true
      },
      {
        title: 'Solid Teak Double Entrance Door',
        category: 'Doors',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        description: 'Monumental pivot door engineered in genuine Burma teak with brass accents.',
        isPublished: true
      },
      {
        title: 'Turnkey Penthouse Interior',
        category: 'Complete Interior',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        description: 'Comprehensive 4BHK interior covering woodwork, false ceilings, lighting and furniture.',
        isPublished: true
      }
    ];

    await Gallery.insertMany(galleryData);
    console.log('[Seeder] Seeded sample gallery items.');

    // 5. Seed Testimonials
    console.log('[Seeder] Seeding Testimonials...');
    const testimonialsData = [
      {
        customerName: 'Sunil Verma',
        location: 'Gorakhpur',
        rating: 5,
        message:
          'Prem A to Z transformed our newly built home completely. The modular kitchen and false ceiling work are world class. Very prompt and disciplined team in Gorakhpur!',
        isPublished: true
      },
      {
        customerName: 'Pooja Srivastava',
        location: 'Gorakhpur',
        rating: 5,
        message:
          'Exceptional carpentry and electrical work! They delivered the complete wardrobe and doors within the committed timeframe without compromising quality.',
        isPublished: true
      },
      {
        customerName: 'Rajesh Pandey',
        location: 'Gorakhpur',
        rating: 5,
        message:
          'Best interior contractor in Gorakhpur. Honest pricing, premium materials, and transparent communication throughout the project.',
        isPublished: true
      }
    ];

    await Testimonial.insertMany(testimonialsData);
    console.log('[Seeder] Seeded sample testimonials.');

    // 6. Seed Site Settings (Exact Business Information)
    console.log('[Seeder] Seeding Site Settings...');
    await Setting.create({
      businessName: 'PREM A TO Z INTERIOR DESIGN',
      phones: ['9454107810'],
      whatsAppNumbers: ['7458905073', '9454107810'],
      address: 'BAHARAMPUR URF PIPRAPUR, GORAKHPUR',
      email: '', // Not provided
      instagram: '', // Not provided
      homepage: {
        heroTitle: 'Transform Your Space with Prem A to Z Interior Design',
        heroSubtitle: 'Expert Doors, Modular Kitchens, POP & False Ceilings, Electrical and Complete Furniture Work',
        ctaText: 'Book a Free Consultation',
        ctaLink: '#contact',
        aboutText:
          'PREM A TO Z INTERIOR DESIGN brings your dream spaces to life with expert craftsmanship, premium materials, and tailored turnkey interior solutions in Gorakhpur.'
      },
      workingHours: 'Monday - Saturday: 9:00 AM - 8:00 PM'
    });
    console.log('[Seeder] Seeded exact business settings.');

    // 7. Seed Sample Enquiry
    console.log('[Seeder] Seeding Sample Enquiry...');
    await Enquiry.create({
      name: 'Ramesh Kumar',
      email: 'ramesh@example.com',
      phone: '9876543210',
      service: 'Kitchen',
      message: 'Hello, I want to renovate my kitchen into an L-shaped modular kitchen. Please share estimate.',
      status: 'new',
      userId: customerUser._id
    });
    console.log('[Seeder] Seeded sample enquiry.');

    console.log('\n====================================================');
    console.log(' DATABASE SEEDING COMPLETED SUCCESSFULLY!          ');
    console.log('====================================================');
    console.log(' Development Admin Credentials:');
    console.log(' Email:    admin@premAtoZ.com (or mobile: 9454107810)');
    console.log(' Password: AdminPassword@123');
    console.log('----------------------------------------------------');
    console.log(' Development Customer Credentials:');
    console.log(' Email:    ramesh@example.com (or mobile: 9876543210)');
    console.log(' Password: Customer@123');
    console.log('====================================================\n');

    process.exit(0);
  } catch (error) {
    console.error(`[Seeder] Error during seeding: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
};

seedData();
