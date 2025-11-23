import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner@2.0.3";
import { LoginScreen } from "./components/LoginScreen";
import { Dashboard } from "./components/Dashboard";
import { Inventory } from "./components/Inventory";
import { Sales } from "./components/Sales";
import { Reports } from "./components/Reports";
import { Settings } from "./components/Settings";
import { Sidebar } from "./components/Sidebar";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />
        <Route
          path="/inventory"
          element={
            <AppLayout>
              <Inventory />
            </AppLayout>
          }
        />
        <Route
          path="/sales"
          element={
            <AppLayout>
              <Sales />
            </AppLayout>
          }
        />
        <Route
          path="/reports"
          element={
            <AppLayout>
              <Reports />
            </AppLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <AppLayout>
              <Settings />
            </AppLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
