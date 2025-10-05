import { RouterProvider } from "react-router-dom";
import { appRouter } from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

function App() {
    return (
        <>
            <QueryClientProvider client={client}>
                <RouterProvider router={appRouter} />
            </QueryClientProvider>
        </>
    );
}

export default App;
