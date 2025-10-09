import React from 'react'
import { Route } from '../detalheNoticias/+types/DetalheNoticias';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Notícias Destaque" },
    { name: "description", content: "Notícias Destaque" },
  ];
}

export default function DetalheNoticias() {
  return (
    <section>
      
    </section>
  )
}
