exports.up = (pgm) => {
  pgm.createTable('comments', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    content: {
      type: 'TEXT',
      notNull: true,
    },
    owner: {
      type: 'VARCHAR(50)',
    },
    thread_id: {
      type: 'VARCHAR(50)',
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
    deleted_at: {
      type: 'TEXT',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('comments');
};
