import {
  type RouteConfig,
  index,
  route,
} from "@react-router/dev/routes";

export default [
  // route("", "routes/home.tsx"),
  route("sobre", "routes/sobre/Sobre.tsx"),
  route("trilhas", "routes/trilhas/Trilhas.tsx"),
  route("palestrante", "routes/palestrantes/Palestrantes.tsx"),
  route("patrocinadores", "routes/patrocinadores/Patrocinadores.tsx"),

  // route("*", "routes/notFound.tsx"),
] satisfies RouteConfig;
