import { useAuthStore } from '../../store/authStore';
import { User, Bell } from 'lucide-react';

export function Header() {
  const userEmail = useAuthStore((state) => state.userEmail);

  return (
    <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1"></div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Notificações</span>
            <Bell className="h-5 w-5" aria-hidden="true" />
          </button>

          <div
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
            aria-hidden="true"
          />

          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <div className="flex items-center gap-2 text-sm font-semibold leading-6 text-gray-900">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                <User className="h-4 w-4" />
              </div>
              <span className="hidden lg:block">
                {userEmail || 'Administrador'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
