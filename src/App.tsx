import { RecoilRoot } from 'recoil';
import { SupabaseQueryProvider } from './hooks/useSupabase';
import Router from './shared/Router';

function App() {
  return (
    <SupabaseQueryProvider>
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </SupabaseQueryProvider>
  );
}

export default App;
