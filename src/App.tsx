import { QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { Toaster } from './components/ui/toaster';

import AppRoutes from './routes/AppRoutes';
import client from './client';

function App() {
  return (
    <QueryClientProvider client={client}>
      <AppRoutes />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
