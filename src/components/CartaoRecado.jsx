import React from "react";

export default function CartaoRecado({recado, onCurtir, onDeletar}){
    return (
        <>
          <article key={recado.id} className='recado-card' style={{ backgroundColor: item.cor }}>
                    <div className='card-header'>
                      <strong>&#128100;{recado.autor}</strong>
                      <button onClick={() => onDeletar(recado.id)} className='btn-delete'
                      >&#128465;</button>
                    </div>
                    <p className='card-body'>{recado.mensagem}</p>
                    <div className='card-footer'>
                      <button onClick={() => onCurtir(recado.id)} className='btn-like'>
                        &#10084;{recado.curtidas}
                      </button>
                    </div>
                  </article>
        </>
    )
}