// ##Погодное одностраничное веб-приложение

// Приложение должно уметь:

// * Добавлять/удалять города
// * Сохранять локально данные
// * Автоматически запрашивать погода по координатам пользователя - это город/место по умолчанию.

var WeatherComponent = React.createClass({
	getInitialState: function() {
		return {
			// city,
		}
	},
	render: function() {
		return (
			<div>
				<SearchComponent />
			</div>
		)
	}
});

var SearchComponent = React.createClass({
	getInitialState: function() {
		return {
			jsonData: [],
			filePath: 'files/cities.json'
		}
	},
	addCity: function() {
		var city = this.refs.city.value;
		this.getCityFile();
	},
	getCityFile:function() {
		$.getJSON(this.state.filePath, function( data ) {
			// var myArray = Array();
			// $.each(data, function(id, value) {
			// 	myArray.push(value);
			// });



			if(typeof(Storage) !== "undefined") {
			   localJson = localStorage.getItem("cities");
			} else {
			    // Sorry! No Web Storage support..
			}

			// Забиваем МАССИВ в state
			// this.setState({jsonData: myArray});
		}.bind(this));

	},
	render: function() {

		return (
			<div>
			<div className="col-md-6">
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

			<CitiesComponent jsondata={this.state.jsonData} />
			</div>
		)
	}
});


var CitiesComponent = React.createClass({
	render: function() {
		var results = this.props.jsondata;

		return (
			<div className="col-md-6">
				{
					results.map(function(result, i) {
						return <div className="city" key="i">{result.name}</div>;
					})
				}
			</div>
		)
	}
});


/*------------------------------------*\
    Init
\*------------------------------------*/

ReactDOM.render(
	<WeatherComponent />,
	document.getElementById('content')
);
