import "@testing-library/jest-dom";

const emptyFunction = () => {};
Object.defineProperty(window, "scrollTo", {
  value: emptyFunction,
  writable: true,
});
