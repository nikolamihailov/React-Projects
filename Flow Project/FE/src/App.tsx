import { RouterProvider } from "react-router-dom";
import { appRouter } from "./utils/routes";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./contexts/AuthContext";
import generateCssVariables from "./utils/ThemeColors/generateColors";
import ScrollTop from "./components/UI/ScrollToTop/ScrollToTop";

const queryClient = new QueryClient();

const theme = createTheme({
  typography: {
    htmlFontSize: 10,
  },
  palette: {
    primary: {
      main: "#8B0401",
      light: "#e67700",
      dark: "#572000",
    },
    secondary: {
      main: "#FFF",
      light: "#ffe6bd",
      dark: "#ffe066",
    },
  },
});

generateCssVariables(theme);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <RouterProvider router={appRouter} />
          <ScrollTop />
        </AuthProvider>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
