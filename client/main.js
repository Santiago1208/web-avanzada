import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import ReactRouter from '../imports/ui/components/ReactRouter.js';

Meteor.startup(() => {
  render(<ReactRouter />, document.getElementById('main'));
});
