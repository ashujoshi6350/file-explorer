const data = {
  id: 1,
  name: 'Files',
  isFolder: true,
  isRoot: true,
  items: [
    {
      id: 2,
      name: 'index.js',
      isFolder: false,
      items: []
    },
    {
      id: 3,
      name: 'src',
      isFolder: true,
      items: [
        {
          id: 4,
          name: 'Hooks',
          isFolder: false,
          items: []
        },
        {
          id: 5,
          name: 'notes.doc',
          isFolder: false,
          items: []
        }
      ]
    }
  ]
}

export default data;
