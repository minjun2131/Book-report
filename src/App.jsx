import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./routes/Router";
import GlobalStyle from "./styles/reset";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Router />
      </QueryClientProvider>
    </>
  );
};

export default App;

// 위에 import Router from "react-router-dom"; 으로 되어있었음
// Router는 ./routes/Router로 사용하니까 찾지 못함
