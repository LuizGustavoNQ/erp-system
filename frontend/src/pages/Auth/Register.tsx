import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { api } from '../../lib/api';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cargo, setCargo] = useState('VENDEDOR');
  const passwordErrorMessage = 'A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial';
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    if (!passwordPattern.test(senha)) {
      setError(passwordErrorMessage);
      setIsLoading(false);
      return;
    }

    try {
      await api.post('/usuarios', { nome, email, senha, cargo });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2500);
    } catch (err: any) {
      setError(err.response?.data?.senha || err.response?.data?.message || 'Ocorreu um erro ao criar a conta. Verifique os dados e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatSelectClass = "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm">
              <Building2 className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
              ERP System
            </h2>
          </div>

          <div className="mt-8">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Crie sua conta
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Preencha os dados abaixo para se cadastrar no sistema.
            </p>
          </div>

          <div className="mt-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium leading-6 text-gray-900">
                  Nome completo
                </label>
                <Input
                  type="text"
                  required
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium leading-6 text-gray-900">
                  E-mail corporativo
                </label>
                <Input
                  type="email"
                  required
                  placeholder="voce@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium leading-6 text-gray-900">
                  Senha de acesso
                </label>
                <Input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  error={error === passwordErrorMessage ? error : ''}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium leading-6 text-gray-900">
                  Cargo
                </label>
                <select 
                  className={formatSelectClass}
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  required
                >
                  <option value="VENDEDOR">Vendedor</option>
                  <option value="ESTOQUISTA">Estoquista</option>
                  <option value="GERENTE">Gerente</option>
                  <option value="ADMIN">Administrador</option>
                </select>
              </div>
              
              {success && (
                <div className="rounded-md bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-800">Conta criada com sucesso! Redirecionando para o login...</p>
                </div>
              )}

              <Button type="submit" className="w-full" isLoading={isLoading} size="lg" disabled={success}>
                Cadastrar
              </Button>
            </form>
            
            <p className="mt-8 text-center text-sm text-gray-500">
              Já possui uma conta?{' '}
              <Link to="/login" className="font-semibold leading-6 text-primary-600 hover:text-primary-500">
                Fazer login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-slate-900">
          <div className="flex h-full flex-col justify-center px-20">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Bem-vindo ao time
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
              Junte-se à nossa plataforma de gestão ERP e comece a otimizar 
              as operações da sua empresa agora mesmo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
