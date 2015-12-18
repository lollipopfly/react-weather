var WeatherComponent = React.createClass({
	getInitialState: function() {
		return {
			// city,
		}
	},
	addCity: function(e) {
		e.preventDefault();
		var cities = <CitiesComponent />
		console.log(cities);
		// Добавить в json файл
	},
	render: function() {
		return (
			<div>
			<form className="">
				<h2>Add city</h2>
				<div className="form-group">
					<input className="form-control" ref="city" placeholder="City" />
				</div>
				<div className="form-group">
				</div>
			</form>
					<button className="btn btn-default" onClick={this.addCity}>Add city</button>
					</div>
		)
	}
});

var CitiesComponent = React.createClass({
	addCity: function(city) {
		console.log(city);
		// Добавить в json файл
	},
	render: function() {
		return (
			// Вывод из файла json
			<div className="col-md-3">City</div>
		)
	}
});

ReactDOM.render(
	<WeatherComponent />,
	document.getElementById('content')
);

ReactDOM.render(
	<CitiesComponent />,
	document.getElementById('cities')
);



