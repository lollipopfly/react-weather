// ##Погодное одностраничное веб-приложение

// Приложение должно уметь:

// * Добавлять/удалять города
// * Сохранять локально данные
// * Автоматически запрашивать погода по координатам пользователя - это город/место по умолчанию.

/*------------------------------------*\
    Get data from localstorage
\*------------------------------------*/

if(typeof(Storage) !== "undefined") {
	var storageData = localStorage.getItem("cities");
	if(storageData) {
		storageData = JSON.parse(storageData);
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
			jsonData: storageData,
			filePath: 'files/cities.json',
			weatherTemp: ''
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
			// Если записи в localstorage не существует
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
			var myCity = this.refs.city.value,
				that = this;

			$.simpleWeather({
			    location: myCity,
			    woeid: '',
			    unit: 'c',
			    success: function(weather) {
			    	var arr = {
						city: myCity,
						temp: weather.temp+'°C',
						thumbnail: weather.thumbnail,
					};
					console.log(weather);
					localJson.push(arr);

					// Обновляем список городов
					that.setState({jsonData: localJson});

					// Записываем в localstorage
					storageString = JSON.stringify(localJson);
					localStorage.setItem("cities", storageString);

			    },
			    error: function(error) {
			    	console.log(error);
			      $("#weather").html('<p>'+error+'</p>');
			    }
			  });
		}
	},
	updateStorage: function() {
		object = JSON.stringify(this.state.jsonData);
		localStorage.setItem("cities", object);
	},
	delStorage: function(city) {
		// Получаем из файла города
		var localJson = this.state.jsonData;
		if(localJson) {
			//Если есть совпадения (for потому что в другиз циклах break не работает)
			for ( var i in localJson ) {
				if(city === localJson[i].city) {
					delete localJson[i];
					localJson.splice(i,1); // Хак (при удалении появляется null)

					// Обновляем список городов
					this.setState({jsonData: localJson});
					this.updateStorage();
					break;
				}
			}
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

		if(results) {
			// В <button onClick={this.props.onClick} принимаем меод их другого компонента
			return (
				React.createElement("div", {className: "col-md-6"}, 
					React.createElement("div", {className: "row cities"}, 
						
							results.map(function(result, i) {
								return (
									React.createElement("div", {key: i, className: "col-md-4"}, 
										React.createElement("div", {className: "city"}, 
											React.createElement("button", {onClick: this.props.onClick.bind(null, result.city), className: "del-city"}), 
											React.createElement("p", null, result.city), 
											React.createElement("p", null, result.temp), 
											React.createElement("p", null, React.createElement("img", {src: result.thumbnail}))
										)
									));
							},this)
						
					)
				)
			)
		} else {
			return (
				React.createElement("div", null)
			)
		}
	}
});


/*------------------------------------*\
    Init
\*------------------------------------*/

ReactDOM.render(
	React.createElement(WeatherComponent, null),
	document.getElementById('content')
);

