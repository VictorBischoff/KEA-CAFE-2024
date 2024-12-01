class ResponseHandler {
    static success(res, data = null, statusCode = 200) {
      return res.status(statusCode).json({
        status: 'success',
        data
      });
    }
  
    static error(res, message, statusCode = 500) {
      return res.status(statusCode).json({
        status: 'error',
        message
      });
    }
  
    static created(res, data) {
      return this.success(res, data, 201);
    }
  
    static notFound(res, message = 'Resource not found') {
      return this.error(res, message, 404);
    }
  
    static badRequest(res, message = 'Bad request') {
      return this.error(res, message, 400);
    }
  
    static unauthorized(res, message = 'Unauthorized') {
      return this.error(res, message, 401);
    }
  
    static forbidden(res, message = 'Forbidden') {
      return this.error(res, message, 403);
    }
  
    static paginated(res, {
      data,
      page = 1,
      limit = 10,
      total,
      message = null
    }) {
      return res.status(200).json({
        status: 'success',
        message,
        pagination: {
          total,
          totalPages: Math.ceil(total / limit),
          currentPage: parseInt(page),
          perPage: parseInt(limit),
          hasMore: page * limit < total
        },
        data
      });
    }
  }
  
  module.exports = ResponseHandler;