import { QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { Toaster } from './components/ui/toaster';

import AppRoutes from './routes/AppRoutes';
import client from './client';
import Chart, { CategoryScale } from 'chart.js/auto';

Chart.register(CategoryScale);

function App() {
  return (
    <QueryClientProvider client={client}>
      <AppRoutes />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
