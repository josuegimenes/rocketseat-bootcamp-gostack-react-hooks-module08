import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  const [tech, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  /* O Hook useCallback é semelhante ao useMemo, porém, usado para funções,
  ou seja, só executa quando um estado, propriedade ou qualquer tipo de
  variável sofre alterações. Com isso, gera menos processamento e ajuda
  na performance. */
  const handleAdd = useCallback(() => {
    setTech([...tech, newTech]);
    setNewTech('');
  }, [newTech, tech]);

  /* Equivalente ao componentDidMount */
  useEffect(() => {
    const storageTech = localStorage.getItem('tech');

    if (storageTech) {
      setTech(JSON.parse(storageTech));
    }
  }, []);

  /* Equivalente ao componentDidUpdate */
  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);

  /* O Hook useMemo é usado para realizar cálculos em variáveis, porém, só
  executa quando uma variável ou array sofre alterações. Com isso, gera menos
  requisições e ajuda na performance. */
  const techSize = useMemo(() => tech.length, [tech]);

  return (
    <>
      <ul>
        {tech.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>Você tem {techSize} tecnologias</strong>
      <br />
      <input
        type="text"
        value={newTech}
        onChange={e => setNewTech(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
