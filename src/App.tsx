import { SupabaseQueryProvider } from './hooks/useSupabase';
import Router from './shared/Router';

function App() {
  return (
    <SupabaseQueryProvider>
      <Router />
    </SupabaseQueryProvider>
  );
}

export default App;
