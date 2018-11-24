import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  console.log("Hola Mundo!!!");
  metodoPersonalizado();
});

var metodoPersonalizado = function () {
	console.log("Hola Mundo desde el server");
}
