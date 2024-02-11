$(document).ready(function () {
  const checkedAmenities = {};
  const checkedStatesCities = {};
  const req = [];

  $('div.amenities input:checkbox').change(function () {
    const id = $(this).data('id');
    const name = $(this).data('name');
    const amn = $(this).data('am');
    if ($(this).is(':checked')) {
      checkedAmenities[id] = name;
      req.push(amn);
    } else {
      delete checkedAmenities[id];
      req.pop(amn);
    }
    const res1 = Object.values(checkedAmenities);
    if (res1.length > 0) {
      $('div.amenities > h4').text(res1.join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });

  $('div.locations input:checkbox').change(function () {
    const id = $(this).data('id');
    const name = $(this).data('name');
    const s = $(this).data('s');
    const c = $(this).data('c');
    if ($(this).is(':checked')) {
      checkedStatesCities[id] = name;
      if (s) { req.push(s); }
      if (c) { req.push(c); }
    } else {
      delete checkedStatesCities[id];
      if (s) { req.pop(s); }
      if (c) { req.push(c); }
    }
    const res = Object.values(checkedStatesCities);
    if (res.length > 0) {
      $('div.locations > h4').text(res.join(', '));
    } else {
      $('div.locations > h4').html('&nbsp;');
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    success: function (data) {
      if (data.status === 'OK') {
        $('header div#api_status').addClass('available');
      } else {
        if ($('header div#api_status').hasClass('available')) {
          $('header div#api_status').removeClass('available');
        }
      }
    }
  });

  $('section.filters button').click(function () {
    console.log(req);
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({ req }),
      contentType: 'application/json; charset=utf-8',
      type: 'POST',
      success: function (data) {
        $.each(data, function (i, obj) {
          $('section.places').append('<article><div class="headline"><h2>' +
          obj.name + '</h2><div class="price_by_night">' +
          obj.price_by_night + '$</div></div>' + '<div class="information">' +
          '<div class="max_guest">' + '<div  class="guest_icon"></div>' + '<p>' +
          obj.max_guest + '</p></div><div class="number_rooms">' + '<div class="bed_icon"></div><p>' +
          obj.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_icon"></div><p>' +
          obj.number_bathrooms + '</p></div></div><div class="description"><p>' +
          obj.description + '| safe' + '</p></div></article>');
        });
      }
    });
  });
});
