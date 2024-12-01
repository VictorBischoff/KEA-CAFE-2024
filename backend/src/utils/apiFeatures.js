const { Op } = require('sequelize');

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(field => delete queryObj[field]);

    // Handle specific filters
    const where = {};
    Object.keys(queryObj).forEach(key => {
      if (queryObj[key]) {
        if (key === 'name' || key === 'city') {
          where[key] = { [Op.like]: `%${queryObj[key]}%` };
        } else if (key === 'minPrice') {
          where.price = { ...where.price, [Op.gte]: queryObj[key] };
        } else if (key === 'maxPrice') {
          where.price = { ...where.price, [Op.lte]: queryObj[key] };
        } else {
          where[key] = queryObj[key];
        }
      }
    });

    this.query.where = where;
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortByArray = this.queryString.sort.split(',').map(field => {
        if (field.startsWith('-')) {
          return [field.substring(1), 'DESC'];
        }
        return [field, 'ASC'];
      });
      this.query.order = sortByArray;
    } else {
      // Default sort by createdAt DESC
      this.query.order = [['createdAt', 'DESC']];
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',');
      this.query.attributes = fields;
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 10;
    const offset = (page - 1) * limit;

    this.query.limit = limit;
    this.query.offset = offset;

    return this;
  }

  getQuery() {
    return this.query;
  }
}

module.exports = APIFeatures;