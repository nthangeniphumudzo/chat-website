import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { GUIDE_LINKS } from "./guide-links";

export default [
  index("routes/home.tsx"),
  route("advisor", "routes/advisor.tsx"),
  ...GUIDE_LINKS.map(({ slug }) => route(slug, "routes/guide.tsx", { id: `guide-${slug}` })),
  route("get", "routes/get.ts"),
] satisfies RouteConfig;
