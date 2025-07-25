import {
  type RouteConfig,
  index,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("sobre", "routes/sobre.tsx"),
] satisfies RouteConfig;
