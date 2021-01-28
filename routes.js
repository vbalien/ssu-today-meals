export const routes = [
  { path: /^\/$/, redirect: () => `/${new Date().getDay()}` },
  { path: /^\/w\/(\d+)$/, component: "study-app" },
];
