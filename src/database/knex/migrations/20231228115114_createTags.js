exports.up = knex => knex.schema.createTable("tags", table => {
    table.increments("id");
    table.text("name").notNullable();

    // onDelete(CASCADE)se eu deletar a nota que essa tag esta vinculada,automaticamente vai deletar a tag, mais por padrao no sqlite é desabilitado vai no arquivo de config do knex e add pool:{afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)}
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");

});

exports.down = knex => knex.schema.dropTable("tags");
