'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'glimmer_eats',
    environment
  };

  if (environment === 'production') {
    ENV.rootURL = '/glimmer_eats/';
    ENV.locationType = 'hash';
  }

  return ENV;
};
