import './App.css';
import { Toaster } from './components/ui/toaster';
import ContextProvider from './context';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ContextProvider>
      <AppRoutes />
      <Toaster />
    </ContextProvider>
  );
}

export default App;
