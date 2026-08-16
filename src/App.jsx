import {useState, useEffect } from 'react';
import './App.css';

//url da nossa api
const API_URL = 'http://177.190.80.28:4000/api/recados';

const CORES_CARTAO = [
  { valor: '#e8dcc7', nome: 'Areia' },
  { valor: '#8b9d83', nome: 'Sálvia' },
  { valor: '#c08e3a', nome: 'Ocre' },
  { valor: '#c66b3d', nome: 'Terracota' },
];

export default function App(){
  //estado para a lista de recados
  const [recados,setRecados] = useState([]);
  //estado para fazer o loading
  const [loading, setLoading] = useState(true);
  //estados para o formulário
  const [autor, setAutor] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [cor, setCor] = useState(CORES_CARTAO[0].valor);
  
  useEffect(() => {
    async function carregarRecados(){
      try{
        const res = await fetch(API_URL);
        const data = await res.json();
        console.log('dados', data);
        setRecados(data);
      }catch(error) {
        console.error('erro ao carregar os recados', error);
      }finally{
        setLoading(false);
      }
    }

    carregarRecados();
  },[]);
  //função para postar uma mensagem
  async function handleSubmit(e){
    e.preventDefault();
    if (!autor.trim() || !mensagem.trim()) return;
    try{
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({autor, mensagem, cor})
      });
      if (res.ok) {
        const novoRecado = await res.json();
        //atualiza a lista localmente
        setRecados([novoRecado, ...recados]);
        setMensagem('');
      }
    }catch(error){
      console.error('erro ao criar o recado', error);
    }
  }  


  return (
    <div className='container'>
      <header className='page-header'>
        <p className='page-label'>Espaço da turma</p>
        <h1>Mural de Recados</h1>
      </header>
      <div className='layout'>
        <aside className='composer-column'>
          <form className='form-card' onSubmit={handleSubmit}>
            <h2>Novo recado</h2>

            <label htmlFor='autor'>Seu nome</label>
            <input
              id='autor'
              type='text'
              placeholder='Digite seu nome'
              value={autor}
              required
              onChange={(e) => setAutor(e.target.value)}
            />

            <label htmlFor='mensagem'>Mensagem</label>
            <textarea
              id='mensagem'
              placeholder='Escreva sua mensagem'
              value={mensagem}
              rows={5}
              required
              onChange={(e) => setMensagem(e.target.value)}
            />

            <fieldset className='color-fieldset'>
              <legend>Cor do cartão</legend>
              <div className='color-picker'>
                {CORES_CARTAO.map((opcao) => (
                  <button
                    type='button'
                    className={`color-option${cor === opcao.valor ? ' is-selected' : ''}`}
                    key={opcao.valor}
                    style={{backgroundColor: opcao.valor}}
                    aria-label={`Usar a cor ${opcao.nome}`}
                    aria-pressed={cor === opcao.valor}
                    title={opcao.nome}
                    onClick={() => setCor(opcao.valor)}
                  >
                    <span className='color-check' aria-hidden='true'>✓</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <button type='submit' className='btn-primary'>Publicar recado</button>
          </form>
        </aside>

        <main className='mural-column'>
          <div className='mural-heading'>
            <h2>Recados publicados</h2>
            {!loading && <span>{recados.length}</span>}
          </div>

          <div className='mural'>
            {loading ? (<p className='empty-state'>Carregando recados...</p>)
            : recados.length === 0 ? (<p className='empty-state'>Nenhum recado ainda. Seja o primeiro a publicar.</p>)
            : (recados.map((item) => (
              <article key={item.id} className='recado-card' style={{backgroundColor : item.cor}}>
                <div className='card-header'>
                  <strong>{item.autor}</strong>
                </div>
                <p className='card-body'>{item.mensagem}</p>
                <div className='card-footer'>
                  <span className='like-count'>Curtidas: {item.curtidas ?? 0}</span>
                </div>
              </article>
            )))
            }
          </div>
        </main>
      </div>
    </div>
  )
}

