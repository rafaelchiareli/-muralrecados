import React from "react";
import CartaoRecado from "./CartaoRecado";

export default function Mural({ recados, loading, onCurtir, onDeletar }) {
    if (loading && recados.length === 0) {
        return <p className="status-msg">Carregando dados da API...</p>
    }
    if (recados?.length === 0) {
        <p className="status-msg">Nenhum recado criado...</p>
    }
    return (
        <div className="mural">
            {recados.map((recado) => (
                <CartaoRecado
                    key={recado.id}
                    recado={recado}
                    onCurtir={onCurtir}
                    onDeletar={onDeletar}
                />
            ))}
        </div>
    )
}