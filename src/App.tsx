import { QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { Toaster } from './components/ui/toaster';
import ContextProvider from './context';
import AppRoutes from './routes/AppRoutes';
import client from './client';

function App() {
  return (
    <ContextProvider>
      <QueryClientProvider client={client}>
        <AppRoutes />
        <Toaster />
      </QueryClientProvider>
    </ContextProvider>
  );
}

export default App;
