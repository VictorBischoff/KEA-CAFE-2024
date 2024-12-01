const { Op } = require('sequelize');
const { Cafe, Review, Amenity, OpeningHours } = require('../models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllCafes = catchAsync(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    city,
    priceRange,
    rating,
    status,
    hasWifi,
    sortBy = 'createdAt'
  } = req.query;

  const offset = (page - 1) * limit;
  const where = {};

  // Build filters
  if (city) where.city = city;
  if (priceRange) where.priceRange = priceRange;
  if (rating) where.avgRating = { [Op.gte]: parseFloat(rating) };
  if (status) where.status = status;
  if (hasWifi) where.wifi = true;

  const cafes = await Cafe.findAndCountAll({
    where,
    limit: parseInt(limit),
    offset: offset,
    order: [[sortBy, 'DESC']],
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

  res.json({
    status: 'success',
    results: cafes.rows.length,
    totalPages: Math.ceil(cafes.count / limit),
    currentPage: parseInt(page),
    data: cafes.rows
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

  res.json({
    status: 'success',
    data: cafe
  });
});

exports.createCafe = catchAsync(async (req, res) => {
  const cafe = await Cafe.create(req.body);

  if (req.body.amenities) {
    await cafe.setAmenities(req.body.amenities);
  }

  if (req.body.openingHours) {
    await OpeningHours.bulkCreate(
      req.body.openingHours.map(hours => ({
        ...hours,
        cafeId: cafe.id
      }))
    );
  }

  res.status(201).json({
    status: 'success',
    data: cafe
  });
});

exports.updateCafe = catchAsync(async (req, res) => {
  const cafe = await Cafe.findByPk(req.params.id);

  if (!cafe) {
    throw new AppError('Cafe not found', 404);
  }

  await cafe.update(req.body);

  if (req.body.amenities) {
    await cafe.setAmenities(req.body.amenities);
  }

  res.json({
    status: 'success',
    data: cafe
  });
});

exports.deleteCafe = catchAsync(async (req, res) => {
  const cafe = await Cafe.findByPk(req.params.id);

  if (!cafe) {
    throw new AppError('Cafe not found', 404);
  }

  await cafe.destroy();

  res.json({
    status: 'success',
    data: null
  });
});

exports.searchCafes = catchAsync(async (req, res) => {
  const { query, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const cafes = await Cafe.findAndCountAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${query}%` } },
        { description: { [Op.like]: `%${query}%` } },
        { city: { [Op.like]: `%${query}%` } }
      ]
    },
    limit: parseInt(limit),
    offset: offset,
    include: ['amenities']
  });

  res.json({
    status: 'success',
    results: cafes.rows.length,
    totalPages: Math.ceil(cafes.count / limit),
    currentPage: parseInt(page),
    data: cafes.rows
  });
});