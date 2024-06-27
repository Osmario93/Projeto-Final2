import "./componentes.css"; // Importa estilos CSS locais para o componente
import axios from "axios"; // Importa Axios para fazer requisições HTTP
import { useState, useEffect } from "react"; // Importa hooks useState e useEffect do React

function Setores() {
  // Entidades e listas utilizadas na página
  const [setor, setSetor] = useState(null); // Estado para o setor sendo editado ou criado
  const [setores, setSetores] = useState([]); // Estado para a lista de setores

  // Funções de carregamento de dados do backend
  function getSetores() {
    axios.get("http://localhost:3005/setores")
      .then((resposta) => {
        console.log('Dados recebidos:', resposta.data); // Verifica o que está sendo recebido
        setSetores(resposta.data);
      })
      .catch((error) => {
        console.error('Erro ao carregar setores:', error);
      });
  }

  useEffect(() => {
    getSetores(); // Carrega a lista de setores quando o componente é montado
  }, []);

  // Funções para manipulação da entidade principal (setor)
  function novoSetor() {
    setSetor({
      codigo: "",
      nome: "",
    });
  }

  function editarSetor(setor) {
    setSetor({
      ...setor, // Copia todos os campos do setor para o estado
    });
  }

  function alterarSetor(campo, valor) {
    setSetor((prevSetor) => ({
      ...prevSetor,
      [campo]: valor, // Altera dinamicamente o campo do setor em edição
    }));
  }

  function excluirSetor(id) {
    axios.delete(`http://localhost:3005/setores/${id}`).then(() => {
      reiniciarEstadoDosObjetos(); // Após excluir, recarrega a lista de setores
    });
  }

  function salvarSetor() {
    if (setor._id) {
      // Se o setor já tem um ID, faz uma requisição PUT para atualizar
      axios.put(`http://localhost:3005/setores/${setor._id}`, setor).then(() => {
          reiniciarEstadoDosObjetos(); // Após atualizar, recarrega a lista de setores
        });
    } else {
      // Se o setor não tem ID, faz uma requisição POST para criar um novo setor
      axios.post("http://localhost:3005/setores", setor).then(() => {
        reiniciarEstadoDosObjetos(); // Após criar, recarrega a lista de setores
      });
    }
  }

  function reiniciarEstadoDosObjetos() {
    setSetor(null); // Limpa o estado do setor em edição
    getSetores(); // Recarrega a lista de setores
  }

  // Função para geração do formulário de setor
  function getFormulario() {
    return (
      <form>
        <label>Código</label>
        <input
          type="text"
          name="codigo"
          value={setor.codigo}
          onChange={(e) => {
            alterarSetor(e.target.name, e.target.value);
          }}
        />
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={setor.nome}
          onChange={(e) => {
            alterarSetor(e.target.name, e.target.value);
          }}
        />
        <button
          type="button"
          onClick={() => {
            salvarSetor();
          }}
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={() => {
            setSetor(null); // Cancela a edição ou criação de setor, limpando o estado
          }}
        >
          Cancelar
        </button>
      </form>
    );
  }

  // Função para geração da linha da tabela de setores
  function getLinhaDaTabela(setor) {
    return (
      <tr key={setor._id}>
        <td>{setor._id}</td>
        <td>{setor.codigo}</td>
        <td>{setor.nome}</td>
        <td>
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  `Confirmar a exclusão do setor ${setor.nome}?`
                )
              ) {
                excluirSetor(setor._id);
              }
            }}
          >
            Excluir
          </button>
          <button
            type="button"
            onClick={() => {
              editarSetor(setor); // Define o setor para edição ao clicar no botão Editar
            }}
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }

  // Função para gerar as linhas da tabela de setores
  function getLinhasDaTabela() {
    return setores.map((setor) => getLinhaDaTabela(setor));
  }

  // Função para renderizar a tabela de setores
  function getTabela() {
    return (
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
          {getLinhasDaTabela()}
        </tbody>
      </table>
    );
  }

  // Função do conteúdo principal
  function getConteudo() {
    if (setor === null) {
      // Se não há setor selecionado para edição, mostra a lista de setores
      return (
        <>
          <button
            type="button"
            onClick={() => {
              novoSetor(); // Ao clicar em Novo Setor, define um novo setor para edição
            }}
          >
            Novo Setor
          </button>
          {getTabela()}
        </>
      );
    } else {
      // Se há um setor selecionado para edição, mostra o formulário desse setor
      return getFormulario();
    }
  }

  // Renderiza o componente Setores
  return (
    <div className="cadastros">
      <div className="conteudo">{getConteudo()}</div>
    </div>
  );
}

export default Setores;
