import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LazyMotion, domAnimation } from "framer-motion";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "@/routes/routes";

const client = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={client}>
            {/* components use the lightweight <m.*> elements; only the DOM animation features are loaded.
                strict throws if a full <motion.*> component sneaks back in and undoes the saving */}
            <LazyMotion features={domAnimation} strict>
                <RouterProvider router={appRouter} />
            </LazyMotion>
        </QueryClientProvider>
    );
}

export default App;
