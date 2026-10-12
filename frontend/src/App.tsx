import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TimetableProvider } from "./context/TimetableContext";
import { HomePage } from "./components/home/HomePage";
import { WorkspaceShell } from "./components/workspace/WorkspaceShell";
import { PageTransition } from "./motion/PageTransition";

export function App() {
  return (
    <BrowserRouter>
      <TimetableProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            }
          />
          <Route
            path="/app"
            element={
              <PageTransition>
                <WorkspaceShell />
              </PageTransition>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </TimetableProvider>
    </BrowserRouter>
  );
}

export default App;
