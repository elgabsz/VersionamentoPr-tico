import React, { useState } from 'react';
import './App.css';

function App() {
  const diasDaSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

  const [estudos, setEstudos] = useState({
    'Segunda-feira': { manha: '', tarde: '', noite: '' },
    'Terça-feira': { manha: '', tarde: '', noite: '' },
    'Quarta-feira': { manha: '', tarde: '', noite: '' },
    'Quinta-feira': { manha: '', tarde: '', noite: '' },
    'Sexta-feira': { manha: '', tarde: '', noite: '' },
    'Sábado': { manha: '', tarde: '', noite: '' },
    'Domingo': { manha: '', tarde: '', noite: '' },
  });

  const [atividade, setAtividade] = useState('');
  const [diaSelecionado, setDiaSelecionado] = useState('Segunda-feira');
  const [periodoSelecionado, setPeriodoSelecionado] = useState('manha');
  const [descricao, setDescricao] = useState('');

  const adicionarAtividade = () => {
    if (!atividade) return;

    setEstudos((prevEstudos) => ({
      ...prevEstudos,
      [diaSelecionado]: {
        ...prevEstudos[diaSelecionado],
        [periodoSelecionado]: atividade,
      },
    }));

    // Limpar os campos após adicionar
    setAtividade('');
  };
const removerAtividade = (dia, periodo) => {
    setEstudos(prevEstudos => ({
      ...prevEstudos,
      [dia]: {
        ...prevEstudos[dia],
        [periodo]: ''
      }
    }));
  };
  return (
    <div className="app-container">
      <h1>Gerenciador de Estudos 2024</h1>

      <div className="input-container">
        <div className="input-group">
          <label>Dia:</label>
          <select value={diaSelecionado} onChange={(e) => setDiaSelecionado(e.target.value)}>
            {diasDaSemana.map(dia => (
              <option key={dia} value={dia}>{dia}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Período:</label>
          <select value={periodoSelecionado} onChange={(e) => setPeriodoSelecionado(e.target.value)}>
            <option value="manha">Manhã</option>
            <option value="tarde">Tarde</option>
            <option value="noite">Noite</option>
          </select>
        </div>

        <div className="input-group">
          <label>O que estudar:</label>
          <input
            type="text"
            value={atividade}
            onChange={(e) => setAtividade(e.target.value)}
            placeholder="Ex: Matemática"
          />
        </div>

        <div className="input-group">
          <label>Descrição do Dia:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Adicione uma descrição para o dia"
          />
        </div>

        <div className="button-container">
          <button onClick={adicionarAtividade}>Adicionar Estudo</button>
        </div>
      </div>

      <div className="agenda-container">
        {diasDaSemana.map(dia => (
          <div key={dia} className="day-card">
            <h2>{dia}</h2>
            <div className="period">
              <strong>Manhã:</strong> {estudos[dia].manha || ''}
              {estudos[dia].manha && (
                <button onClick={() => removerAtividade(dia, 'manha')} className="remove-btn">Excluir</button>
              )}
            </div>
            <div className="period">
              <strong>Tarde:</strong> {estudos[dia].tarde || ''}
              {estudos[dia].tarde && (
                <button onClick={() => removerAtividade(dia, 'tarde')} className="remove-btn">Excluir</button>
              )}
            </div>
            <div className="period">
              <strong>Noite:</strong> {estudos[dia].noite || ''}
              {estudos[dia].noite && (
                <button onClick={() => removerAtividade(dia, 'noite')} className="remove-btn">Excluir</button>
              )}
            </div>
            <div className="description-box">
              <strong>Descrição:</strong>
              <p>{estudos[dia].descricao || 'Nenhuma descrição fornecida'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;