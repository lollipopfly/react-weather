var WeatherComponent = React.createClass({displayName: "WeatherComponent",
	addCity: function() {

	},
	render: function() {
		return (
			React.createElement("form", {className: "", action: "#"}, 
				React.createElement("h2", null, "Add city"), 
				React.createElement("div", {className: "form-group"}, 
					React.createElement("input", {className: "form-control", placeholder: "City"})
				), 
				React.createElement("div", {className: "form-group"}, 
					React.createElement("button", {className: "btn btn-default", onClick: this.addCity}, "Add city")
				)
			)
		)
	}
});

var CitiesComponent = React.createClass({displayName: "CitiesComponent",
	render: function() {

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



