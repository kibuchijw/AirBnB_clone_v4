// Wait for the DOM to be fully loaded before executing the script
$('document').ready(function () {
  // Initialize an empty object to store selected amenities
  const amenities = {};

  // Listen for changes on each checkbox
  $('INPUT[type="checkbox"]').change(function () {
    // Check if the checkbox is checked
    if ($(this).is(':checked')) {
      // Add the Amenity ID and name to the amenities object
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      // Remove the Amenity ID from the amenities object when unchecked
      delete amenities[$(this).attr('data-id')];
    }

    // Update the text inside the H4 tag with the list of selected amenities
    $('.amenities H4').text(Object.values(amenities).join(', '));
  });
});
