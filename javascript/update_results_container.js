$(function() {

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
        var jData = JSON.parse(data)
        resetAndAddToResults(jData.current_observation.display_location.city);
		addToResults(jData.current_observation.temp_f);
		addToResults(jData.current_observation.feelslike_string);
		
		console.log(jData.current_observation.feelslike_string);
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
  
  var addToResults = function(data) {
    
    $('#results').append(data + "<br />");
  };
  
  var isNaI = function(n) {
	return n % 1 !== 0;
  };

});