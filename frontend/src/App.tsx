import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { ClientesList } from './pages/Clientes/ClientesList';
import { ClienteForm } from './pages/Clientes/ClienteForm';
import { ProdutosList } from './pages/Produtos/ProdutosList';
import { ProdutoForm } from './pages/Produtos/ProdutoForm';
import { UsuariosList } from './pages/Usuarios/UsuariosList';
import { UsuarioForm } from './pages/Usuarios/UsuarioForm';
import { VendasList } from './pages/Vendas/VendasList';
import { VendaForm } from './pages/Vendas/VendaForm';
import { VendaDetalhes } from './pages/Vendas/VendaDetalhes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clientes" element={<ClientesList />} />
          <Route path="clientes/novo" element={<ClienteForm />} />
          <Route path="clientes/:id" element={<ClienteForm />} />
          
          <Route path="produtos" element={<ProdutosList />} />
          <Route path="produtos/novo" element={<ProdutoForm />} />
          <Route path="produtos/:id" element={<ProdutoForm />} />
          
          <Route path="usuarios" element={<UsuariosList />} />
          <Route path="usuarios/novo" element={<UsuarioForm />} />

          <Route path="vendas" element={<VendasList />} />
          <Route path="vendas/nova" element={<VendaForm />} />
          <Route path="vendas/:id" element={<VendaDetalhes />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
