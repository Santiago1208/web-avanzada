import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.js'
import 'bootstrap/dist/css/bootstrap.min.css';

Meteor.startup(() => {
  // Renderiza componente ppal en un div con id=’principal’
  render(<App />, document.getElementById('main'));
});
