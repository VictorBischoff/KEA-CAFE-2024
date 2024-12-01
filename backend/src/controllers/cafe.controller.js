const { Op } = require('sequelize');
const { Cafe, Review, Amenity, OpeningHours } = require('../models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const ResponseHandler = require('../utils/responseHandler');
const ValidationUtils = require('../utils/validationUtils');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllCafes = catchAsync(async (req, res) => {
  const features = new APIFeatures(Cafe, req.query)
    .filter()
    .sort()
    .paginate();

  const { rows: cafes, count: total } = await Cafe.findAndCountAll({
    ...features.getQuery(),
    include: [
      {
        model: Amenity,
        as: 'amenities',
        through: { attributes: [] }
      },
      {
        model: OpeningHours,
        as: 'openingHours'
      }
    ]
  });

  return ResponseHandler.paginated(res, {
    data: cafes,
    page: req.query.page,
    limit: req.query.limit,
    total
  });
});

exports.getCafe = catchAsync(async (req, res) => {
  const cafe = await Cafe.findByPk(req.params.id, {
    include: [
      {
        model: Review,
        as: 'reviews',
        include: ['user']
      },
      {
        model: Amenity,
        as: 'amenities'
      },
      {
        model: OpeningHours,
        as: 'openingHours'
      }
    ]
  });

  if (!cafe) {
    throw new AppError('Cafe not found', 404);
  }

  return ResponseHandler.success(res, cafe);
});

exports.createCafe = catchAsync(async (req, res) => {
  const { name, address, city, ...otherData } = req.body;

  // Sanitize input
  const sanitizedData = {
    name: ValidationUtils.sanitizeString(name),
    address: ValidationUtils.sanitizeString(address),
    city: ValidationUtils.sanitizeString(city),
    ...otherData
  };

  // Create cafe
  const cafe = await Cafe.create(sanitizedData);

  // Handle amenities
  if (req.body.amenities) {
    await cafe.setAmenities(req.body.amenities);
  }

  // Handle opening hours
  if (req.body.openingHours) {
    await OpeningHours.bulkCreate(
      req.body.openingHours.map(hours => ({
        ...hours,
        cafeId: cafe.id
      }))
    );
  }

  // Fetch complete cafe data with relations
  const completeData = await Cafe.findByPk(cafe.id, {
    include: ['amenities', 'openingHours']
  });

  return ResponseHandler.created(res, completeData);
});

exports.updateCafe = catchAsync(async (req, res) => {
  const cafe = await Cafe.findByPk(req.params.id);

  if (!cafe) {
    throw new AppError('Cafe not found', 404);
  }

  // Sanitize input
  const sanitizedData = Object.keys(req.body).reduce((acc, key) => {
    if (typeof req.body[key] === 'string') {
      acc[key] = ValidationUtils.sanitizeString(req.body[key]);
    } else {
      acc[key] = req.body[key];
    }
    return acc;
  }, {});

  await cafe.update(sanitizedData);

  if (req.body.amenities) {
    await cafe.setAmenities(req.body.amenities);
  }

  const updatedCafe = await Cafe.findByPk(cafe.id, {
    include: ['amenities', 'openingHours']
  });

  return ResponseHandler.success(res, updatedCafe);
});

exports.deleteCafe = catchAsync(async (req, res) => {
  const cafe = await Cafe.findByPk(req.params.id);

  if (!cafe) {
    throw new AppError('Cafe not found', 404);
  }

  await cafe.destroy();
  return ResponseHandler.success(res, null, 204);
});

exports.searchCafes = catchAsync(async (req, res) => {
  const { query, page = 1, limit = 10 } = req.query;

  if (!query) {
    throw new AppError('Search query is required', 400);
  }

  const features = new APIFeatures(Cafe, { page, limit })
    .paginate();

  const searchQuery = ValidationUtils.sanitizeString(query);
  
  const { rows: cafes, count: total } = await Cafe.findAndCountAll({
    ...features.getQuery(),
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${searchQuery}%` } },
        { description: { [Op.like]: `%${searchQuery}%` } },
        { city: { [Op.like]: `%${searchQuery}%` } }
      ]
    },
    include: ['amenities']
  });

  return ResponseHandler.paginated(res, {
    data: cafes,
    page,
    limit,
    total
  });
});

exports.getCafeAmenities = catchAsync(async (req, res) => {
  const cafe = await Cafe.findByPk(req.params.cafeId, {
    include: ['amenities']
  });

  if (!cafe) {
    throw new AppError('Cafe not found', 404);
  }

  return ResponseHandler.success(res, cafe.amenities);
});

exports.addCafeAmenities = catchAsync(async (req, res) => {
  const cafe = await Cafe.findByPk(req.params.cafeId);

  if (!cafe) {
    throw new AppError('Cafe not found', 404);
  }

  const { amenityIds } = req.body;

  // Verify amenities exist
  const amenities = await Amenity.findAll({
    where: { id: amenityIds }
  });

  if (amenities.length !== amenityIds.length) {
    throw new AppError('One or more amenities not found', 404);
  }

  await cafe.addAmenities(amenityIds);

  const updatedCafe = await Cafe.findByPk(cafe.id, {
    include: ['amenities']
  });

  return ResponseHandler.success(res, updatedCafe.amenities);
});

exports.removeCafeAmenity = catchAsync(async (req, res) => {
  const { cafeId, amenityId } = req.params;

  const cafe = await Cafe.findByPk(cafeId);
  if (!cafe) {
    throw new AppError('Cafe not found', 404);
  }

  await cafe.removeAmenity(amenityId);
  return ResponseHandler.success(res, null, 204);
});