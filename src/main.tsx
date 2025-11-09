import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FavoritesProvider } from "./context/FavoritesContext";
import {SearchProvider} from "./context/SearchContext.tsx";
import {ThemeProvider} from "./context/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <ThemeProvider>
          <SearchProvider>
              <FavoritesProvider>
                <App />
              </FavoritesProvider>
          </SearchProvider>
      </ThemeProvider>
  </StrictMode>
);
