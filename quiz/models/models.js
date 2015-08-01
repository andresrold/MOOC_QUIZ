var path = require('path');

// Cargar Módulo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null,
			{ dialect: "sqlite",
			 storage: "quiz.sqlite"}
		);

// Importar la definición de la tabla quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; 	// exportar definición de la tabla Quiz,
			// para que se pueda usar en otros sitios de la aplicación


// Crea e inicializa la tabla preguntas
sequelize.sync().then(function() {
	// Una vez creada con éxito, ejecuta el manejador
	Quiz.count().then(function(count) {
		if(count === 0) { // si la tabla está vacía
			Quiz.create({ 	pregunta: 'Capital de Italia',
					respuesta: 'Roma'
				})
			.then(function() {console.log('Base de datos inicializada')});
		};
	});
});