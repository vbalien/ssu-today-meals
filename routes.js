export const routes = [
  { path: /^\/$/, redirect: () => `/w/${new Date().getDay()}` },
  { path: /^\/w\/(?<week>\d+)$/, component: "study-app" },
];
