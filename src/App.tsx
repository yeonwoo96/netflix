import { Route, Routes, HashRouter } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Router/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import Footer from "./Components/Footer";

const App = () => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <HashRouter>
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
        <Footer />
      </HashRouter>
    </QueryClientProvider>
  );
};

export default App;
