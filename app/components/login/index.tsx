import React, { useRef, useState } from 'react'
import { useAuth } from '@/providers/AuthProvider';
import { useLoginModal } from '@/providers/LoginModalProvider';
import { IoMdMail } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { getUser, signIn } from '@/services/authUser';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isOpen, closeModal } = useLoginModal();
  const { login, tokenAuth } = useAuth();

  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleLogin = async () => {
    setLoading(true);
    
    const userData = {
      email,
      password,
      mantain_connected: connected
    };

    try {
      const resultToken = await signIn(userData);
      if (resultToken) tokenAuth(resultToken.Authorization);

      const resultUser = await getUser();

      login(resultUser);
      closeModal();
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    } finally {
      setLoading(false);
    }
    
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      closeModal();
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={handleOverlayClick}
      className='fixed inset-0 flex items-center justify-center z-50 bg-black/70'>
      <div className="bg-white w-[450px] max-w-[90%] rounded-[8px] shadow-lg flex flex-col p-5 overflow-hidden">
        
        <h3 className="text-[32px] font-semibold">Olá, boas-vindas</h3>
        <p className='text-[14px] text-[#757575] mb-[40px]'>Insira seus dados cadastrados para acessar.</p>

        <div className="flex flex-col mb-5">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <div className="relative">
            <IoMdMail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              className="w-full pl-10 pr-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col mb-5">
          <label htmlFor="password" className="text-sm font-medium">
            Senha
          </label>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Senha / Password"
              className="w-full pl-10 pr-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showPassword ? (
              <FaEyeSlash
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEye
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
        </div>

        <div className='mb-5'>
          <label className='flex items-center text-[14px] cursor-pointer select-none'>
            <input
              className='cursor-pointer'
              type="checkbox"
              checked={connected}
              onChange={(e) => setConnected(e.target.checked)}
            />
            <span className='ps-1 text-[14px]'>Manter conectado</span>
          </label>
        </div>

        <div className='text-center text-[#00f] text-[14px] font-semibold mb-3 cursor-pointer hover:underline'>Esqueceu sua senha?</div>

        <button
          type='submit'
          onClick={handleLogin}
          className="bg-blue-700 text-white px-4 py-2 rounded w-full cursor-pointer hover:bg-blue-800 transition-colors font-semibold mb-4"
        >
          Entrar
        </button>

        <div className='text-[14px] text-[#757575] text-center mt-4'>
          Não tem uma conta? <span className='text-[#00f] font-semibold cursor-pointer hover:underline'>Registre-se agora</span>
        </div>

        {/* <button onClick={closeModal} className="mt-2 text-sm text-gray-600 w-full">
          Cancelar
        </button> */}
      </div>
    </div>
  )
}
