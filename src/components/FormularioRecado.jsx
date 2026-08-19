import React, { useState }  from "react";

export default function FormularioRecado({onAdicionarRecado}){
    const [autor, setAutor] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [cor, setCor] = useState("#fef09a");
    const [enviando, setEnviando] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        if (!autor.trim() || !mensagem.trim())  return;
        setEnviando(true);
        try{
            await onAdicionarRecado({autor, mensagem, cor});
            setMensagem('');

        }finally{
            setEnviando(false);
        }
    }

    const CORES_CARTAO = ["#fef08a", "#dcfce7", "#dbeafe", "#fbcfe8"];

    return (
        <>
        <form onSubmit={handleSubmit} className="form-card">
             
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
                    style={{ backgroundColor: opcao.valor }}
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

            <button type='submit' className='btn-primary'>
                {enviando ? "Enviando" : "Publicar"}
            </button>
          </form>
       
        </>
    )
}