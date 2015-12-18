var WeatherComponent = React.createClass({
	addCity: function() {

	},
	render: function() {
		return (
			<form className="" action="#">
				<h2>Add city</h2>
				<div className="form-group">
					<input className="form-control" placeholder="City" />
				</div>
				<div className="form-group">
					<button className="btn btn-default" onClick={this.addCity}>Add city</button>
				</div>
			</form>
		)
	}
});

var CitiesComponent = React.createClass({
	render: function() {

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



