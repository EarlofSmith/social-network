const { connect, connection } = require('mongoose');

connect('mongodb://localhost/socialstuff', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;