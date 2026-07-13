import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { api } from '../../lib/api';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data } = await api.post('/auth/login', { email, senha });
      if (data.token) {
        login(data.token, email);
        navigate('/');
      }
    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

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
              Acesse sua conta
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Gerencie seus negócios de forma inteligente e integrada.
            </p>
          </div>

          <div className="mt-10">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                />
              </div>

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              )}

              <Button type="submit" className="w-full" isLoading={isLoading} size="lg">
                Entrar no sistema
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-slate-900">
          <div className="flex h-full flex-col justify-center px-20">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Tudo em um só lugar
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
              Nossa plataforma de gestão ERP foi desenvolvida para oferecer uma experiência 
              limpa, rápida e segura para o seu negócio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
