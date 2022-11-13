export const sortByName = (a, b) => a.name.localeCompare(b.name);

export const filterByName = (name, data) =>
  data.filter((entry) => entry.name.toLowerCase().includes(name));
