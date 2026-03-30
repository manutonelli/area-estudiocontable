import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "./components/ui/sonner";
import { ScrollToTop } from "./components/ScrollToTop";
import { AppShell } from "./components/AppShell";
import HomePage from "./pages/HomePage";
import ResourcesPage from "./pages/ResourcesPage";
import MonotributoPage from "./pages/MonotributoPage";
import GananciasPage from "./pages/GananciasPage";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/recursos-gratuitos" element={<ResourcesPage />} />
          <Route path="/recursos-gratuitos/monotributo" element={<MonotributoPage />} />
          <Route path="/recursos-gratuitos/ganancias" element={<GananciasPage />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
