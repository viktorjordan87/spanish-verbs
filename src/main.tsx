import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { routes } from "./routes/routes.tsx";
import { PrimeReactProvider } from "primereact/api";
import { ThemeProvider } from "./contexts/index";
import { QueryProvider } from "./providers/QueryProvider";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider>
        <PrimeReactProvider value={{ unstyled: false, pt: {} }}>
          <RouterProvider router={routes} />
        </PrimeReactProvider>
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>
);
