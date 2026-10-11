import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("advisor", "routes/advisor.tsx"),
  route("get", "routes/get.ts"),
] satisfies RouteConfig;
