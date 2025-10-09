import {
  type RouteConfig,
  index,
  route,
} from "@react-router/dev/routes";

export default [
  // route("", "routes/home.tsx"),
  route("sobre", "routes/sobre/Sobre.tsx"),
  route("trilhas", "routes/trilhas/Trilhas.tsx"),
  route("dicas", "routes/dicas/Dicas.tsx"),
  route("palestrante", "routes/palestrantes/Palestrantes.tsx"),
  route("patrocinadores", "routes/patrocinadores/Patrocinadores.tsx"),
  route("inscricao", "routes/ingressos/Ingressos.tsx"),
  route("notícias", "routes/noticias/listaNoticias/ListaNoticias.tsx"),
  // route("noticias/:friendly_url", "routes/noticias/detalheNoticia/DetalheNoticia.tsx"),
  // route("agenda", "routes/agenda/Agenda.tsx"),

  // route("*", "routes/notFound.tsx"),
] satisfies RouteConfig;
