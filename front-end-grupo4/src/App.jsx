import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import GetProducts from "./pages/GetProducts.jsx";
import Login from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Authprovider } from "./context/AuthContext.jsx";
import Register from "./pages/Register.jsx";
import FormProducts from "./pages/FormProducts.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";

function App() {
  return (
    <Authprovider>
      <ProductProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/products" element={<GetProducts />} />
                <Route path="/add-product" element={<FormProducts />} />
                <Route path="/product/:id" element={<FormProducts />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </ProductProvider>
    </Authprovider>
  );
}

export default App;
