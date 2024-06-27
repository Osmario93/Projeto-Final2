import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Individuos from './paginas/Individuos';
import Sequencias from './paginas/Sequencias';
import Setores from './paginas/Setores';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout><Individuos/></Layout>} />
        <Route path="/sequencias" element={<Layout><Sequencias/></Layout>} />
        <Route path="/setores" element={<Layout><Setores/></Layout>} />
      </Routes>
    </>
  );
}

export default App;

