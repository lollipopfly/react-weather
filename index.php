<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"/>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"/>
	<link rel="stylesheet" href="css/style.css">
</head>
<body>
	<div class="container">
		<div class="row" id="content"></div>
	</div>


	<div id="weather"></div>
	<script src="https://fb.me/react-0.14.3.js"></script>
	<script src="https://fb.me/react-dom-0.14.3.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src='bower_components/simpleWeather/jquery.simpleWeather.min.js'></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
	<script src='js/build/common.js'></script>


	<script>
		$(document).ready(function() {
		  $.simpleWeather({
		    location: 'penza',
		    woeid: '',
		    unit: 'c',
		    success: function(weather) {
		      html = weather.temp+'&deg;'+weather.units.temp;

		      $("#weather").html(html);
		    },
		    error: function(error) {
		      $("#weather").html('<p>'+error+'</p>');
		    }
		  });
		});
	</script>
</body>
</html>