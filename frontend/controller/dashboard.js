const api = 'http://localhost:3000/api/v1/users/profile';

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      alert('Please log in first.');
      window.location.href = '/login.html';
      return; // Stop further execution
    }
  
    fetch('https://your-api.com/user/dashboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.status === 401) {
          throw new Error('Unauthorized');
        }
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        renderDashboard(data);
      })
      .catch(error => {
        console.error('Error fetching dashboard data:', error);
        if (error.message === 'Unauthorized') {
          alert('Session expired or invalid. Please log in again.');
          localStorage.removeItem('token');
          window.location.href = '/login.html';
        } else {
          alert('An error occurred. Please try again later.');
        }
      });
  
    // Logout functionality
    document.getElementById('logout-button').addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = '/login.html';
    });
  });


  function renderDashboard(data) {
    const dashboardContent = document.getElementById('dashboard-content');
    
    // Display basic user info
    let htmlContent = `
      <h2>Hello, ${data.name}</h2>
      <p><strong>Email:</strong> ${data.email}</p>
    `;
  
    // Display Favorite Cafes
    if (data.favoriteCafes && data.favoriteCafes.length > 0) {
      htmlContent += '<h3>Your Favorite Cafes:</h3><ul>';
      data.favoriteCafes.forEach(cafe => {
        htmlContent += `<li>
          <strong>${cafe.name}</strong>
          <ul>
            ${cafe.amenities.map(amenity => `<li>${amenity}</li>`).join('')}
          </ul>
        </li>`;
      });
      htmlContent += '</ul>';
    } else {
      htmlContent += '<p>You have no favorite cafes.</p>';
    }
  
    // Display Reviews
    if (data.reviews && data.reviews.length > 0) {
      htmlContent += '<h3>Your Reviews:</h3><ul>';
      data.reviews.forEach(review => {
        htmlContent += `<li>
          <p><strong>Cafe:</strong> ${review.cafe.name}</p>
          <p><strong>Review:</strong> ${review.content}</p>
        </li>`;
      });
      htmlContent += '</ul>';
    } else {
      htmlContent += '<p>You have not written any reviews.</p>';
    }
  
    dashboardContent.innerHTML = htmlContent;
  }