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
			React.createElement("div", null, 
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
			), 

			React.createElement(CitiesComponent, {jsondata: this.state.jsonData})
			)
		)
	}
});


var CitiesComponent = React.createClass({displayName: "CitiesComponent",
	render: function() {
		var results = this.props.jsondata;

		return (
			React.createElement("div", {className: "col-md-6"}, 
				
					results.map(function(result, i) {
						return React.createElement("div", {className: "city", key: "i"}, result.name);
					})
				
			)
		)
	}
});


/*------------------------------------*\
    Init
\*------------------------------------*/

ReactDOM.render(
	React.createElement(WeatherComponent, null),
	document.getElementById('content')
);
