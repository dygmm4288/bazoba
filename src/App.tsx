import Router from './shared/Router';
import useAuth from './hooks/useAuth';

function App() {
  const { isLogin } = useAuth();
  return <Router isLogin={isLogin} />;
}

export default App;
