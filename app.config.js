const YAML = require('yaml');
const fs = require('fs');
const { environment } = require('./app.environment');
const { join } = require('path');

const file = fs.readFileSync(join(__dirname, `./env/app.${environment}.yml`), 'utf8');
const env = YAML.parse(file);
console.log(env);

exports.APP = {
  NAME: env.app.name,
  PORT: env.app.port,
  HTTP_FLV: env.app.http_flv,
};
