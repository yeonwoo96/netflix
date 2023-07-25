import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { theme } from "./Theme/theme.ts";
import { GlobalStyle } from "./Globalstyle.tsx";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>
);
