import ReactDOM from 'react-dom/client';
import {
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query';

import './index.css';
import App from './App';

import store from './store';
import { Provider } from 'react-redux';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>
);
