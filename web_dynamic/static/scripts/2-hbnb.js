$(document).ready(function () {
  // initializing an empty dictionary
  const dict = {};

  // selecting the checkboxe and the h4 tag inside the div with class "amenities"
  const $amenitiesCheck = $('input[type=checkbox]');
  const $selectedAmenities = $('div.amenities h4');

  // listen for click events on checkboxes
  $amenitiesCheck.click(function () {
    // if the checbox is checked
    if ($(this).is(':checked')) {
      // store Amenity ID in the dictionary
      dict[$(this).data('id')] = $(this).data('name');
      $selectedAmenities.text(Object.values(dict).join(', '));
    } else if ($(this).is(':not(:checked)')) {
      // remove Amenity ID from the dictionary
      delete dict[$(this).data('id')];

      // Finally update the h4 tag with selected ammenities
      $selectedAmenities.text(Object.values(dict).join(', '));
    }
  });

  // get status of API
  $.getJSON('http://127.0.0.1:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});
