// ##Погодное одностраничное веб-приложение

// Приложение должно уметь:

// * Добавлять/удалять города
// * Сохранять локально данные
// * Автоматически запрашивать погода по координатам пользователя - это город/место по умолчанию.

/*------------------------------------*\
    Get data from localstorage
\*------------------------------------*/

if(typeof(Storage) !== "undefined") {
	var data = localStorage.getItem("cities");
	if(data) {
		data = JSON.parse(data);
	}
}


var WeatherComponent = React.createClass({displayName: "WeatherComponent",
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
			jsonData: data,
			filePath: 'files/cities.json'
		}
	},
	addCity: function() {
		var city = this.refs.city.value;
		this.getCity();
	},
	getCity:function() {
		var localJson = this.getStorage();
		localJson = JSON.parse(localJson);

		if(localJson) {
			// Если есть совпадения (for потому что в другиз циклах break не работает)
			for (var i = 0; i < localJson.length; i++) {
				if(this.refs.city.value === localJson[i].city) {
					console.log('ok');
					return false;
				}
			}

			//Если совпадения нет добавляем в localstorage
			this.setState({jsonData: localJson});
			this.setStorage(localJson);
		} else {
			var arr = Array();
			this.setState({jsonData: arr});
			this.setStorage(arr);
		}
	},
	getStorage: function() {
		if(typeof(Storage) !== "undefined") {
			var localJson = localStorage.getItem("cities");
			return localJson;
		}
	},
	setStorage: function(localJson) {
		if(typeof(Storage) !== "undefined") {
			var arr = {
				city: this.refs.city.value,
				weather: '12C',
			};

			localJson.push(arr);
			storageString = JSON.stringify(localJson);
			localStorage.setItem("cities", storageString);
		}
	},
	delStorage: function(aa) {
		// Получаем из файла города
		var localJson = this.getStorage();
		console.log(aa);
		if(localJson) {
			// Если есть совпадения (for потому что в другиз циклах break не работает)
			// for (var i = 0; i < localJson.length; i++) {
			// 	if(this.refs.city.value === localJson[i].city) {
			// 		console.log('ok del him');
			// 		return false;
			// 	}
			// }
		}
	},
	render: function() {
		var exposeClick = this.delStorage; // Передаем этот метод в другой компонент
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

				React.createElement(CitiesComponent, {onClick: exposeClick, jsondata: this.state.jsonData})
			)
		)
	}
});


var CitiesComponent = React.createClass({displayName: "CitiesComponent",
	render: function() {
		var results = this.props.jsondata;

		// В <button onClick={this.props.onClick} принимаем меод их другого компонента
		return (
			React.createElement("div", {className: "col-md-6"}, 
				React.createElement("div", {className: "row cities"}, 
					
						results.map(function(result, i) {
							return (
								React.createElement("div", {key: i, className: "col-md-4"}, 
									React.createElement("div", {className: "city"}, 
										React.createElement("button", {onClick: this.props.onClick.bind(null, result.city), className: "del-city"}), 
										React.createElement("p", null, result.city)
									)
								));
						},this)
					
				)
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

