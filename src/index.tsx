import { RecoilRoot } from 'recoil';
import { SupabaseQueryProvider } from './hooks/useSupabase';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <SupabaseQueryProvider>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </SupabaseQueryProvider>
);
