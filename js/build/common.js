var WeatherComponent = React.createClass({displayName: "WeatherComponent",
	getInitialState: function() {
		return {
			// city,
		}
	},
	addCity: function(e) {
		e.preventDefault();
		var cities = React.createElement(CitiesComponent, null)
		console.log(cities);
		// Добавить в json файл
	},
	render: function() {
		return (
			React.createElement("div", null, 
			React.createElement("form", {className: ""}, 
				React.createElement("h2", null, "Add city"), 
				React.createElement("div", {className: "form-group"}, 
					React.createElement("input", {className: "form-control", ref: "city", placeholder: "City"})
				), 
				React.createElement("div", {className: "form-group"}
				)
			), 
					React.createElement("button", {className: "btn btn-default", onClick: this.addCity}, "Add city")
					)
		)
	}
});

var CitiesComponent = React.createClass({displayName: "CitiesComponent",
	addCity: function(city) {
		console.log(city);
		// Добавить в json файл
	},
	render: function() {
		return (
			// Вывод из файла json
			React.createElement("div", {className: "col-md-3"}, "City")
		)
	}
});

ReactDOM.render(
	React.createElement(WeatherComponent, null),
	document.getElementById('content')
);

ReactDOM.render(
	React.createElement(CitiesComponent, null),
	document.getElementById('cities')
);



