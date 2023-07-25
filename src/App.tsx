import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Router/Home";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/movie/:movieId" element={<Home />} />
          </Route>
          <Route path="/series" element={<Home />} />
          <Route path="/movie" element={<Home />} />
          <Route path="/hot" element={<Home />} />
          <Route path="/mypick" element={<Home />} />
          <Route path="/language" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
