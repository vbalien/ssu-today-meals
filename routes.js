export const routes = [
  { path: /^\/$/, redirect: "/place/1" },
  { path: /^\/place\/(?<placeId>\d+)$/, component: "meal-app" },
];
