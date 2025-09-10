import {
  type RouteConfig,
  index,
  route,
} from "@react-router/dev/routes";

export default [
  // route("", "routes/home.tsx"),
  route("sobre", "routes/sobre/Sobre.tsx"),
  route("trilhas", "routes/trilhas/Trilhas.tsx"),

  // route("*", "routes/notFound.tsx"),
] satisfies RouteConfig;
