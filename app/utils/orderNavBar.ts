import { INavbar } from "@/@types/appConfig";

const arryOrder = [
  "ao-vivo",
  "home",
  "destaque",
  "sobre",
  "trilhas",
  "agenda",
  "palestrante",
  "noticias",
  "videos",
  "dicas",
  "expositores",
  "patrocinadores",
];

export const orderNavBar = (listNav: INavbar[]) => {
  return listNav.sort((a, b) => {
    const indexA = arryOrder.indexOf(a.value.toLowerCase());
    const indexB = arryOrder.indexOf(b.value.toLowerCase());

    return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
  });
};
