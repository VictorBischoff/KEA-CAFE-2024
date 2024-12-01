class DateUtils {
    static now() {
      return new Date();
    }
  
    static formatDate(date, format = 'YYYY-MM-DD') {
      const d = new Date(date);
      
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      const seconds = String(d.getSeconds()).padStart(2, '0');
  
      const formats = {
        'YYYY-MM-DD': `${year}-${month}-${day}`,
        'DD-MM-YYYY': `${day}-${month}-${year}`,
        'YYYY-MM-DD HH:mm': `${year}-${month}-${day} ${hours}:${minutes}`,
        'YYYY-MM-DD HH:mm:ss': `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
        'HH:mm': `${hours}:${minutes}`,
        'HH:mm:ss': `${hours}:${minutes}:${seconds}`
      };
  
      return formats[format] || d.toISOString();
    }
  
    static addDays(date, days) {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
  
    static subtractDays(date, days) {
      return this.addDays(date, -days);
    }
  
    static isDateValid(date) {
      const d = new Date(date);
      return d instanceof Date && !isNaN(d);
    }
  
    static getDateDifference(startDate, endDate, unit = 'days') {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diff = end - start;
  
      const units = {
        days: 1000 * 60 * 60 * 24,
        hours: 1000 * 60 * 60,
        minutes: 1000 * 60,
        seconds: 1000
      };
  
      return Math.floor(diff / units[unit]);
    }
  
    static getBusinessDays(startDate, endDate) {
      let count = 0;
      const curDate = new Date(startDate);
      const end = new Date(endDate);
      
      while (curDate <= end) {
        const dayOfWeek = curDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
        curDate.setDate(curDate.getDate() + 1);
      }
      
      return count;
    }
  
    static isWeekend(date) {
      const d = new Date(date);
      return d.getDay() === 0 || d.getDay() === 6;
    }
  
    static getTimeRanges() {
      const ranges = [];
      for (let i = 0; i < 24; i++) {
        const hour = i.toString().padStart(2, '0');
        ranges.push(`${hour}:00`, `${hour}:30`);
      }
      return ranges;
    }
  
    static isBusinessHours(date = new Date()) {
      const hours = date.getHours();
      return hours >= 9 && hours < 17;  // 9 AM to 5 PM
    }
  }
  
  module.exports = DateUtils;