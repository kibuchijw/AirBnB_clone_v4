// Wait for the DOM to be fully loaded before executing the script
$(document).ready(function () {
  // Initialize an empty object to store selected amenities
  const amenities = {};

  // Function to update the status of div#api_status based on the API response
  function updateApiStatus () {
    // Make a GET request to the API endpoint
    $.get(
      'http://' + window.location.hostname + ':5001/api/v1/status/',
      function (data) {
        // Check if the status is "OK"
        if (data.status === 'OK') {
          // Add the class "available" to div#api_status
          $('#api_status').addClass('available');
        } else {
          // Remove the class "available" from div#api_status
          $('#api_status').removeClass('available');
        }
      }
    );
  }

  // Function to update places based on the API response
  function updatePlaces () {
    // Make a POST request to the places_search API endpoint
    $.ajax({
      type: 'POST',
      url: 'http://' + window.location.hostname + ':5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function (data) {
        // Clear existing articles in the section.places
        $('.places article').remove();

        // Loop through the result and create article tags representing Places
        for (const place of data) {
          const article = $('<article>');

          // Build the HTML structure for the Place
          article.append(
            `<div class="title_box"><h2>${place.name}</h2><div class="price_by_night">$${place.price_by_night}</div></div>`
          );
          article.append(
            `<div class="information"><div class="max_guest">${place.max_guest
            } Guest${place.max_guest !== 1 ? 's' : ''
            }</div><div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''
            }</div><div class="number_bathrooms">${place.number_bathrooms
            } Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div></div>`
          );
          article.append(`<div class="description">${place.description}</div>`);

          // Append the article to the section.places
          $('.places').append(article);
        }
      },
      error: function (error) {
        console.error('Error fetching places:', error);
      }
    });
  }

  // Initial update of API status and places when the page loads
  updateApiStatus();
  updatePlaces();

  // Set up a timer to periodically update the API status and places after 30 seconds
  setInterval(function () {
    updateApiStatus();
    updatePlaces();
  }, 30000);

  // Listen for changes on each checkbox
  $('input[type="checkbox"]').change(function () {
    // Check if the checkbox is checked
    if ($(this).is(':checked')) {
      // Add the Amenity ID and name to the amenities object
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      // Remove the Amenity ID from the amenities object when unchecked
      delete amenities[$(this).attr('data-id')];
    }

    // Update the text inside the H4 tag with the list of selected amenities
    $('.amenities h4').text(Object.values(amenities).join(', '));
  });
});
