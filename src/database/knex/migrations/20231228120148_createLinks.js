exports.up = knex => knex.schema.createTable("links", table => {
    table.increments("id");
    table.text("url").notNullable();

    // onDelete(CASCADE)se eu deletar a nota que essa tag esta vinculada,automaticamente vai deletar a tag
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
    table.timestamp("created_at").default(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable("links");