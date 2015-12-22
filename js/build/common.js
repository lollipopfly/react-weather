// ##Погодное одностраничное веб-приложение

// Приложение должно уметь:

// * Добавлять/удалять города
// * Сохранять локально данные
// * Автоматически запрашивать погода по координатам пользователя - это город/место по умолчанию.

var WeatherComponent = React.createClass({displayName: "WeatherComponent",
	getInitialState: function() {
		return {
			// city,
		}
	},
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement(SearchComponent, null)
			)
		)
	}
});

var SearchComponent = React.createClass({displayName: "SearchComponent",
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
			React.createElement("div", {className: "col-md-6"}, 
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

ReactDOM.render(
	React.createElement(WeatherComponent, null),
	document.getElementById('content')
);


