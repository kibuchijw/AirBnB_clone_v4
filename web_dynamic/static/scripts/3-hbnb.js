$(document).ready(function () {
  const dict = {};
  const $amenitiesCheck = $('input[type=checkbox]');
  const $selectedAmenities = $('div.amenities h4');
  const $statusIndicator = $('div#api_status');
  const placesApiUrl = 'http://127.0.0.1:5001/api/v1/places_search/';
  const $placesSection = $('section.places');

  $amenitiesCheck.click(function () {
    if ($(this).is(':checked')) {
      dict[$(this).data('id')] = $(this).data('name');
      $selectedAmenities.text(Object.values(dict).join(', '));
    } else if ($(this).is(':not(:checked)')) {
      delete dict[$(this).data('id')];
      $selectedAmenities.text(Object.values(dict).join(', '));
    }
  });

  // get status of API
  $.getJSON('http://127.0.0.1:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $statusIndicator.addClass('available');

      // Make a POST request to retrieve places data
      $.ajax({
        type: 'POST',
        url: placesApiUrl,
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (placesData) {
          // Loop through the result and create articles for each place
          placesData.forEach(function (place) {
            const articleHTML = createPlaceArticle(place);
            $placesSection.append(articleHTML);
          });
        },
        error: function (error) {
          console.error('Error fetching places:', error);
        }
      });
    } else {
      $statusIndicator.removeClass('available');
    }
  });

  // Function to create HTML for a place article
  function createPlaceArticle (place) {
    return `<article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest${
      place.max_guest !== 1 ? 's' : ''
    }</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${
      place.number_rooms !== 1 ? 's' : ''
    }</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
      place.number_bathrooms !== 1 ? 's' : ''
    }</div>
              </div>
              <div class="description">
                ${place.description}
              </div>
            </article>`;
  }
});
