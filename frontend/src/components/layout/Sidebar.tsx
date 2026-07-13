import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { LayoutDashboard, Users, ShoppingBag, Contact, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Clientes', href: '/clientes', icon: Contact },
  { name: 'Produtos', href: '/produtos', icon: ShoppingBag },
  { name: 'Usuários', href: '/usuarios', icon: Users },
];

export function Sidebar() {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900 text-white transition-all duration-300">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 font-bold text-white shadow-sm">
            E
          </div>
          <span className="text-lg font-semibold tracking-tight">ERP System</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  isActive
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-300 hover:bg-slate-800/50 hover:text-white',
                  'group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors'
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? 'text-primary-400' : 'text-slate-400 group-hover:text-slate-300',
                    'mr-3 h-5 w-5 flex-shrink-0 transition-colors'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-800 p-4">
        <button
          onClick={logout}
          className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="mr-3 h-5 w-5 text-slate-400 transition-colors group-hover:text-red-400" />
          Sair do sistema
        </button>
      </div>
    </div>
  );
}
