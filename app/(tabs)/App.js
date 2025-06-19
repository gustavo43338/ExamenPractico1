import { registerRootComponent } from 'expo';
import RegistroForm from './RegisterScreen'; // o LoginScreen si se llama así

function App() {
  return <RegistroForm />;
}

registerRootComponent(App);
