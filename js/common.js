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
		console.log(data);

		var myArray = Array();
		// $.map(data., function(id, value) {
		// 	myArray.push(value);
		// 	// console.log(id);
		// });


		console.log(typeof myArray);
	}
}





var WeatherComponent = React.createClass({
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

		// console.log(this.state.jsonData);
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
	delStorage: function() {
		console.log('deleted');
	},
	render: function() {
		var results = this.props.jsondata;

		return (
			<div className="col-md-6">
				<div className="row cities">
					{
						results.map(function(result, i) {
							return (
								<div key={i} className="col-md-4">
									<div className="city">
										<button onClick={this.delStorage.bind(this, i)} className="del-city">wqw</button>
										<p>{result.city}</p>
									</div>
								</div>);
						},this)
					}
				</div>
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

