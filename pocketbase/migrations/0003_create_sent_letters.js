migrate(
  (app) => {
    try {
      app.findCollectionByNameOrId('sent_letters')
      return // Já existe
    } catch (_) {}

    const collection = new Collection({
      name: 'sent_letters',
      type: 'base',
      system: false,
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        {
          name: 'user',
          type: 'relation',
          required: false,
          presentable: false,
          collectionId: '_pb_users_auth_',
          cascadeDelete: false,
          maxSelect: 1,
        },
        {
          name: 'senderName',
          type: 'text',
          required: true,
          presentable: true,
          min: 1,
          max: 120,
        },
        {
          name: 'recipientEmail',
          type: 'email',
          required: true,
          presentable: true,
        },
        {
          name: 'recipientName',
          type: 'text',
          required: false,
          presentable: false,
          min: 0,
          max: 120,
        },
        {
          name: 'message',
          type: 'text',
          required: true,
          presentable: false,
          min: 1,
          max: 1000,
        },
        {
          name: 'theme',
          type: 'text',
          required: false,
          presentable: false,
          min: 0,
          max: 50,
        },
        {
          name: 'avatarChoice',
          type: 'text',
          required: false,
          presentable: false,
          min: 0,
          max: 50,
        },
        {
          name: 'delivered',
          type: 'bool',
          required: false,
          presentable: false,
        },
      ],
      indexes: [
        'CREATE INDEX idx_sent_letters_recipient ON sent_letters (recipientEmail)',
        'CREATE INDEX idx_sent_letters_user ON sent_letters (user)',
      ],
    })

    app.save(collection)
  },
  (app) => {
    try {
      const collection = app.findCollectionByNameOrId('sent_letters')
      app.delete(collection)
    } catch (_) {}
  },
)
