import React from 'react'
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useAppCompany } from '@/providers/AppCompanyProvider';
import { Link } from "react-router-dom";

import styles from '@/components/footer/footer.module.scss';

export default function Footer() {
  const { dataFooter } = useAppCompany();

  return (
    <footer>
      <div className={styles.redeSocialFooter}>
        <div className='container flex flex-col gap-6'>
          <div className='flex justify-center gap-[40px]'>
            <a
              aria-label="Linkedin"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/showcase/febrabantech/"
              className='icon'
            >
              <FaLinkedinIn />
            </a>

            <a
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/febrabantech"
              className='icon'
            >
              <FaFacebookF className='text-white text-[30px]' />
            </a>

            <a
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/febrabantech"
              className='icon'
            >
              <FaXTwitter className='text-white text-[30px]' />
            </a>

            <a
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/febrabantech/"
              className='icon'
            >
              <FaInstagram className='text-white text-[30px]' />
            </a>
          </div>
          <div className='flex justify-center'>
            <a
              href="https://portal.febraban.org.br"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Logo Febraban"
            >
              <img
                src="app/assets/logo/febraban-branco.png"
                alt="Febraban"
                width={145}
                className="imagemlogoFebraban"
              />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.linkFooter}>
        <div className='container flex gap-6'>
          <div className='flex flex-wrap gap-6 lg:gap-8 mb-4'>
            <Link to="/sobre">
              Sobre
            </Link>

            <Link to="/termos-privacidade">
              Termos & Privacidade
            </Link>

            <Link to="/fale-conosco">
              Fale com a <strong>organização</strong>
            </Link>

            <a href={`mailto:${dataFooter?.emailImprensa}`}>
              Imprensa
            </a>

            <a href="mailto:comercial.febrabantech@febraban.org.br">
              Fale com a equipe comercial
            </a>
          </div>
          <div>
            <p>© FEBRABAN TECH 2025 Todos os direitos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
