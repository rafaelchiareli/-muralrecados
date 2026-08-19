const API_URL = '177.190.80.28:4000/api/recados';

export async function buscarRecados(){
    const res = await fetch(API_URL);
    if(!res.ok)
         throw new Error('Erro ao buscar os recados');c
    return res.json();
}

export async function criarRecado(dados){
    const res = await fetch(API_URL, {
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(dados),
    });
    if (!res.ok)
        throw new Error("Erro ao criar um novo recado");
}

//função para curtir a postagem
export async function curtirRecado(id){
  
    const res = await fetch(`${API_URL}/${id}/curtir`, 
      {method : 'POST'}
    );
    if (!res.ok){
     throw new Error("Erro ao curtir um recado");
    }  
}

//funçao que deleta o recado
export async function deletarRecado(id){
    const res = await fetch(`${API_URL}/${id}`, {method: 'DELETE'});
    if (res.ok){
          throw new Error("Erro ao excluir um recado");
      
    }
  }
