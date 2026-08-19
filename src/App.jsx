import React from "react";
import { useState, useEffect } from "react";
import FormularioRecado from "./components/FormularioRecado";
import Mural from "./components/Mural";

import { buscarRecados, curtirRecado, criarRecado, deletarRecado } from "./services/api";
import './App.css';

export default function App() {
  const [recados, setRecados] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregarDados() {
    try {
      const dados = await buscarRecados();
      setRecados(dados);

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    carregarDados();
  }, []);

  async function handleCurtir(){

  }
  async function handleDeletar(){

  }
  async function handleAdicionar(novoDado) {
    try {
      const recadoCriado = await criarRecado(novoDado);
      setRecados((prev) => [recadoCriado, ...prev]);
    } catch (error) {
      alert("Falha ao incluir recado" + error);
    }
  }
  return (
    <div className="container">
      <header>Mural de recados
        <p>Acompanhe as mensagens</p>
      </header>
      <div className="layout">
      <FormularioRecado onAdicionarRecado={handleAdicionar} />
      <Mural
        recados={recados}
        loading={loading}
        onCurtir={handleCurtir}
        onDeletar={handleDeletar}
      /> 
      </div>
    </div>
  )

}