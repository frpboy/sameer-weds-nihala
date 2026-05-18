import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import { AmbientScene, MotionProvider } from './background';
import MouseTrailOverlay from './background/MouseTrailOverlay';

function App() {
  return (
    <BrowserRouter>
      <MotionProvider>
        <AmbientScene />
        <MouseTrailOverlay />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </MotionProvider>
    </BrowserRouter>
  );
}

export default App;
