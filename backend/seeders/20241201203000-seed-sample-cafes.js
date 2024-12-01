'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Insert Cafes
      await queryInterface.bulkInsert(
        'Cafes',
        [
          {
            name: 'Cozy Coffee',
            description: 'A cozy little coffee shop with great ambiance.',
            address: '123 Coffee Lane',
            city: 'Copenhagen',
            postalCode: '2200',
            country: 'Denmark',
            phone: '+45 1234 5678',
            email: 'contact@cozycoffee.dk',
            website: 'http://cozycoffee.dk',
            latitude: 55.676098,
            longitude: 12.568337,
            avgRating: 4.5,
            priceRange: '$$',
            isVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'Espresso Express',
            description: 'Fast and fresh coffee on the go.',
            address: '456 Java Ave',
            city: 'Aarhus',
            postalCode: '8000',
            country: 'Denmark',
            phone: '+45 8765 4321',
            email: 'info@espressoexpress.dk',
            website: 'http://espressoexpress.dk',
            latitude: 56.162939,
            longitude: 10.203921,
            avgRating: 4.0,
            priceRange: '$',
            isVerified: false,
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'Brew & Chill',
            description: 'Relax with a freshly brewed cup of coffee.',
            address: '789 Brew Street',
            city: 'Odense',
            postalCode: '5000',
            country: 'Denmark',
            phone: '+45 4567 8910',
            email: 'hello@brewchill.dk',
            website: 'http://brewchill.dk',
            latitude: 55.403756,
            longitude: 10.40237,
            avgRating: 4.7,
            priceRange: '$$$',
            isVerified: true,
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'Nordic Beans',
            description: 'Scandinavian coffee at its finest.',
            address: '321 Bean Boulevard',
            city: 'Aalborg',
            postalCode: '9000',
            country: 'Denmark',
            phone: '+45 9876 5432',
            email: 'contact@nordicbeans.dk',
            website: 'http://nordicbeans.dk',
            latitude: 57.048819,
            longitude: 9.921747,
            avgRating: 4.3,
            priceRange: '$$',
            isVerified: true,
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'The Daily Grind',
            description: 'Your daily dose of caffeine.',
            address: '654 Grind Lane',
            city: 'Esbjerg',
            postalCode: '6700',
            country: 'Denmark',
            phone: '+45 6543 2109',
            email: 'support@dailygrind.dk',
            website: 'http://dailygrind.dk',
            latitude: 55.467564,
            longitude: 8.452061,
            avgRating: 4.1,
            priceRange: '$',
            isVerified: false,
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'Café Hygge',
            description: 'Experience true Danish hygge with great coffee.',
            address: '987 Hygge Way',
            city: 'Roskilde',
            postalCode: '4000',
            country: 'Denmark',
            phone: '+45 7890 1234',
            email: 'hygge@cafehygge.dk',
            website: 'http://cafehygge.dk',
            latitude: 55.64191,
            longitude: 12.087845,
            avgRating: 4.8,
            priceRange: '$$$',
            isVerified: true,
            status: 'active',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      );

      const cafes = await queryInterface.sequelize.query(
        `SELECT id, name FROM Cafes;`,
        { type: Sequelize.QueryTypes.SELECT }
      );

      // Insert Amenities
      await queryInterface.bulkInsert('Amenities', [
        { name: 'WiFi', category: 'tech', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Power Outlets', category: 'tech', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Parking', category: 'comfort', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Outdoor Seating', category: 'comfort', createdAt: new Date(), updatedAt: new Date() },
      ]);

      // Get amenity IDs
      const amenities = await queryInterface.sequelize.query(
        `SELECT id, name FROM Amenities;`,
        { type: Sequelize.QueryTypes.SELECT }
      );

      // Create CafeAmenities associations
      const cafeAmenitiesData = [];
      cafes.forEach(cafe => {
        amenities.slice(0, 2).forEach(amenity => {
          cafeAmenitiesData.push({
            CafeId: cafe.id,
            AmenityId: amenity.id,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        });
      });

      await queryInterface.bulkInsert('CafeAmenities', cafeAmenitiesData);

      // Insert Reviews
      const reviewsData = cafes.map((cafe, index) => ({
        rating: [5, 3, 4, 4, 2, 5][index],
        content: [
          'Fantastic place to relax and enjoy a cup of coffee!',
          'Good for a quick coffee, but lacks seating space.',
          'Great coffee, but the parking can be a hassle.',
          'Love the Scandinavian vibe and the coffee is great!',
          'Not a fan of the coffee here, but the WiFi is good.',
          'Hygge at its best! Love the atmosphere and the coffee.'
        ][index],
        noise_level: ['quiet', 'loud', 'moderate', 'quiet', 'moderate', 'quiet'][index],
        wifi_quality: [5, 3, 4, 4, 4, 5][index],
        power_outlets: ['plenty', 'limited', 'plenty', 'plenty', 'none', 'plenty'][index],
        cafeId: cafe.id,
        userId: (index % 5) + 1, // Assuming you have users 1-5
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      await queryInterface.bulkInsert('Reviews', reviewsData);

      // Insert Opening Hours
      const openingHoursData = cafes.map(cafe => ({
        dayOfWeek: 'monday',
        openTime: '09:00:00',
        closeTime: '17:00:00',
        cafeId: cafe.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      await queryInterface.bulkInsert('OpeningHours', openingHoursData);

      // Insert Favorites
      const favoritesData = cafes.map((cafe, index) => ({
        userId: (index % 5) + 1,
        cafeId: cafe.id,
        notes: [
          'Love this place!',
          'Great coffee on the go.',
          'Best place to work!',
          'Love the Scandinavian vibe!',
          'Good coffee, but no power outlets.',
          'My favorite spot for hygge!'
        ][index],
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      await queryInterface.bulkInsert('Favorites', favoritesData);

    } catch (error) {
      console.error('Seeding error:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Delete in reverse order of dependencies
    await queryInterface.bulkDelete('Favorites', null, {});
    await queryInterface.bulkDelete('OpeningHours', null, {});
    await queryInterface.bulkDelete('Reviews', null, {});
    await queryInterface.bulkDelete('CafeAmenities', null, {});
    await queryInterface.bulkDelete('Amenities', null, {});
    await queryInterface.bulkDelete('Cafes', null, {});
  }
};