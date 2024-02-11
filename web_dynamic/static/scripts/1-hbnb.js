/*
 *Listen for changes on each input checkbox tag:
 *if the checkbox is checked, you must store
 *the Amenity ID in a variable (dictionary or list)
 *if the checkbox is unchecked, you must remove the Amenity ID from the variable
 *update the h4 tag inside the div Amenities with the list of Amenities checked
 */

$(document).ready(function () {
  const checkboxes = $(':checkbox');
  const dict = {};
  $.each(checkboxes, function (i, checkboxe) {
    $(checkboxe).on('change', function () {
      if ($(this).is(':checked')) {
        dict[$(this).data('id')] = $(this).data('name');
      } else {
        delete dict[$(this).data('id')];
      }
      $('.amenities h4').text(Object.values(dict));
    });
  });
});
