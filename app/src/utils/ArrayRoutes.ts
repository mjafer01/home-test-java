const ArrayRoutes = (pageRoutes: any) => {
  const routeObject = pageRoutes as object;
  let elements = [];
  for (const data of Object.entries(routeObject)) {
    elements.push(data[1]);
  }
  return elements;
};
export default ArrayRoutes;
