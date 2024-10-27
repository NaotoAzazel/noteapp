/*
  When adding additional options, the schema in "/lib/validation/pages"
  should be updated accordingly. 
*/

const queryConfig = {
  dashboardNotes: {
    sortOptions: [
      { label: "Last edit: Old to new", value: "updatedAt.asc" },
      { label: "Last edit: New to old", value: "updatedAt.desc" },
      { label: "Alphabetical: A to Z", value: "title.asc" },
      { label: "Alphabetical: Z to A", value: "title.desc" },
    ],
  },
}

export { queryConfig }
