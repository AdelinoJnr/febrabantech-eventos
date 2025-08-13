import type { Route } from "./+types/home";
import Sobre from '../../src/pages/sobre/Sobre';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sobre" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Sobre />;
}
