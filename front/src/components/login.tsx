// src/components/Login.tsx

export default function Login() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Esquerda - Fundo verde + conteúdo */}
      <div className="w-full md:w-1/2 bg-gradient-to-b from-green-700 to-green-800 flex items-center justify-center px-4 text-white relative min-h-screen">

        <div className="w-full max-w-md">
          {/* Título */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 uppercase">
            Acesse o Ambiente de postagem de Notícias
          </h2>

          {/* Card de login */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="mb-6 flex justify-center">
              <img
                src="/images/logo/logo.png"
                alt="Logo"
                className="h-14 md:h-16 object-contain"
              />
            </div>

            <form>
              <input
                type="text"
                placeholder="Usuário"
                className="w-full mb-4 px-4 py-2 border rounded bg-gray-100 text-gray-800 focus:outline-none"
              />
              <input
                type="password"
                placeholder="Senha"
                className="w-full mb-4 px-4 py-2 border rounded bg-gray-100 text-gray-800 focus:outline-none"
              />

              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
              >
                ENTRAR
              </button>

              <p className="text-sm text-center mt-4 text-gray-500">
                Esqueceu sua senha?{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Reenviar senha
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Direita - Imagem (escondida em telas pequenas) */}
      <div className="hidden md:block w-1/2">
        <img
          src="/images/login/garotapc.png"
          alt="Pessoa no computador"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
