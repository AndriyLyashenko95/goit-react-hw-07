import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { persistor, store  } from './redux/store';
import { PersistGate } from "redux-persist/integration/react";
import App from './App';
createRoot(document.getElementById("root")).render(
  <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
 </StrictMode>
);
