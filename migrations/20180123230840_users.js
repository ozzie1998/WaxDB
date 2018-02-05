exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table.string("username");
    table.string("password");
    table.string("salt");
  });
};

exports.down = function(knex, Promise) {};
