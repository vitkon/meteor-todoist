Package.describe({
  name: 'vitkon:todoist',
  summary: 'Todoist API package for meteor server',
  version: '0.2.2',
  git: 'https://github.com/vitkon/meteor-todoist.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use([
  	'underscore',
    'mongo-livedata',
    'http'], ['server']);
  api.addFiles([
    'vitkon:todoist.js',
  ], ['server']);

  if (api.export) {
    api.export('Todoist');
  }
});
Package.onTest(function(api) {
  api.use('tinytest');
  api.use('vitkon:todoist');
  api.addFiles('vitkon:todoist-tests.js');
});