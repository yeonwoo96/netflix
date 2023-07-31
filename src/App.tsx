import { Route, Routes, HashRouter } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Router/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import Footer from "./Components/Footer";
import TopRated from "./Router/toprated";
import Popular from "./Router/popular";
import Soon from "./Router/Soon";

const App = () => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="movie/:movieId" element={<Home />} />
          </Route>
          <Route path="/toprated" element={<TopRated />}>
            <Route path="movie/:movieId" element={<TopRated />} />
          </Route>
          <Route path="/popular" element={<Popular />}>
            <Route path="movie/:movieId" element={<Popular />} />
          </Route>
          <Route path="/soon" element={<Soon />}>
            <Route path="movie/:movieId" element={<Soon />} />
          </Route>
        </Routes>
        <Footer />
      </HashRouter>
    </QueryClientProvider>
  );
};

export default App;
