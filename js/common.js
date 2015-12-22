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
			filePath: 'files/cities.json'

		}
	},
	addCity: function() {
		var city = this.refs.city.value;

		// Получпем файл с городами
		// добавить город в файл
		// сравнить есть ли в файле данный город
		this.getCityFile();
	},
	getCityFile:function() {
		$.getJSON(this.state.filePath, function( data ) {
			console.log(data);
		});

		$.ajax({
			url: 'this.state.filePath',
			type: 'POST',
			dataType: 'json',
		})
		.success(function(data) {
			console.log(data);
		});



	},
	render: function() {
		return (
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
		)
	}
});

ReactDOM.render(
	<WeatherComponent />,
	document.getElementById('content')
);


