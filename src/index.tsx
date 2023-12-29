import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App';
import { SupabaseQueryProvider } from './hooks/query/useSupabase';

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
