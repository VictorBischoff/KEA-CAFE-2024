class ValidationUtils {
    static isEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    static isPhoneNumber(phone) {
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      return phoneRegex.test(phone);
    }
  
    static isPostalCode(postalCode) {
      // Add specific postal code formats as needed
      const postalRegex = /^[0-9]{5}(-[0-9]{4})?$/;
      return postalRegex.test(postalCode);
    }
  
    static isURL(url) {
      try {
        new URL(url);
        return true;
      } catch (error) {
        return false;
      }
    }
  
    static sanitizeString(str) {
      return str.trim().replace(/[<>]/g, '');
    }
  
    static sanitizeEmail(email) {
      return email.trim().toLowerCase();
    }
  
    static validateLatLong(lat, long) {
      const isValidLat = lat >= -90 && lat <= 90;
      const isValidLong = long >= -180 && long <= 180;
      
      return {
        isValid: isValidLat && isValidLong,
        errors: [
          !isValidLat && 'Invalid latitude',
          !isValidLong && 'Invalid longitude'
        ].filter(Boolean)
      };
    }
  
    static validateRequiredFields(object, requiredFields) {
      const missingFields = requiredFields.filter(field => !object[field]);
      
      return {
        isValid: missingFields.length === 0,
        missingFields
      };
    }
  }
  
  module.exports = ValidationUtils;