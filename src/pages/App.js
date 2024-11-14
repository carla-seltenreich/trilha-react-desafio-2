import { useState } from 'react';
import gitLogo from '../assets/github.png';
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api';

import { Container } from './styles';

function App() {
  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    try {
      const { data } = await api.get(`/users/${currentRepo}/repos`);
      console.log(data);
      
      if (Array.isArray(data)) {
        setRepos(data); 
      }

      setCurrentRepo("");

    } catch (error) {
      console.error('Erro ao buscar repositórios:', error);
      alert('Erro ao buscar repositórios. Verifique o nome do usuário.');
    }
  };

  const handleRemoveRepo = (id) => {
    console.log('Removendo repositório com ID:', id);
    const updatedRepos = repos.filter((repo) => repo.id !== id);
    setRepos(updatedRepos); 
  };

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="GitHub logo" />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo}>Buscar</Button>
      
      {repos.length === 0 ? (
        <p>Nenhum repositório encontrado.</p>
      ) : (
        repos.map((repo) => (
          <ItemRepo
            key={repo.id} 
            repo={repo}
            handleRemoveRepo={handleRemoveRepo}
          />
        ))
      )}
    </Container>
  );
}

export default App;
