$(function() {

  $('#results').html("<h1>Enter City or Zip for Current Temps</h1>");

  $('#weather_data').submit(function() {
    updateResultsContainer();
    return false;
  });
  
  var updateResultsContainer = function() {
	var zipcode = document.getElementById('zipcode').value;
    if (isNaN(zipcode) || isNaI(zipcode) || zipcode.length != 5) {
		resetAndAddToResults("Please enter a valid 5 digit zip code");
	} else {
		var weatherinfo = weatherData(zipcode);
	}
	
  };
  
  var weatherData = function(zip) {
	
    apiKey = "e2dbaf95fd927995";
    url = "http://weather-api.herokuapp.com/weather/" + apiKey + "/conditions/z/" + zip + "/";
    $.ajax({
      url: url,
      success: function(data) {
        var jData = JSON.parse(data);
		resetAndAddToHeader(jData.current_observation.display_location.city);
		addToResults("Current Temperature: " + jData.current_observation.temp_f);
		addToResults("Feels Like: " + jData.current_observation.feelslike_string);
      },
      error: function() {
        console.log("Error");
      }
    });
  };
  var resetAndAddToResults = function(data) {
	$('#results').html("");
	addToResults(data);
  };
  
  var resetAndAddToHeader = function(data) {
	$('#results').html("<h1>Current Results For " + data + "</h1>");
  };
  var addToResults = function(temp) {
    
	$('#results').append("<h2>" + temp + "</h2>");
  };
  
  var isNaI = function(n) {
	return n % 1 !== 0;
  };
  
  var input = document.getElementById('city');
  var options = {
    types: ['(cities)'],
    componentRestrictions: {country: 'us'}
  };

  autocomplete = new google.maps.places.Autocomplete(input, options);

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      resetAndAddToResults("Please enter a valid 5 digit zip code");
      return;
    }
	lat = place.geometry.location.kb;
	lon = place.geometry.location.lb;
    apiKey = "e2dbaf95fd927995";
    url = "http://weather-api.herokuapp.com/weather/" + apiKey + "/conditions/g/" + lat + "/" + lon + "/";
    $.ajax({
      url: url,
      success: function(data) {
        var jData = JSON.parse(data);
		resetAndAddToHeader(jData.current_observation.display_location.city);
		addToResults("Current Temperature: " + jData.current_observation.temp_f);
		addToResults("Feels Like: " + jData.current_observation.feelslike_string);
      },
      error: function() {
        console.log("Error");
      }
    });
  });


});