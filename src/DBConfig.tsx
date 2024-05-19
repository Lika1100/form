export const DBConfig = {
  name: 'MyDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'cart',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'count', keypath: 'count', options: { unique: false } },
        { name: 'image', keypath: 'image', options: { unique: false } },
        { name: 'price', keypath: 'price', options: { unique: false } },
        { name: 'title', keypath: 'title', options: { unique: false } },
        { name: 'id', keypath: 'id', options: { unique: false } },
      ],
    },
  ],
};
