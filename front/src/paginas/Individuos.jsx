import "./componentes.css"; // Importa estilos CSS locais para o componente
import axios from "axios"; // Importa Axios para fazer requisições HTTP
import { useState, useEffect } from "react"; // Importa hooks useState e useEffect do React

function Individuos() {
  const [individuo, setIndividuo] = useState(null); // Estado para o indivíduo sendo editado ou criado
  const [individuos, setIndividuos] = useState([]); // Estado para a lista de indivíduos

  // Função para carregar a lista de indivíduos do backend
  function getIndividuos() {
    axios.get("http://localhost:3005/individuos").then((resposta) => {
      setIndividuos(resposta.data); // Atualiza o estado dos indivíduos com os dados recebidos do backend
    });
  }

  useEffect(() => {
    getIndividuos(); // Carrega a lista de indivíduos quando o componente é montado
  }, []); // O array vazio [] garante que o useEffect seja executado apenas uma vez após a montagem do componente

  // Função para criar um novo indivíduo
  function novoIndividuo() {
    setIndividuo({
      codigo: "",
      nome: "",
    });
  }

  // Função para editar um indivíduo existente
  function editarIndividuo(individuo) {
    setIndividuo({
      _id: individuo._id,
      codigo: individuo.codigo,
      nome: individuo.nome,
    });
  }

  // Função para alterar um campo do indivíduo em edição
  function alterarIndividuo(campo, valor) {
    setIndividuo((prevIndividuo) => ({
      ...prevIndividuo,
      [campo]: valor,
    }));
  }

  // Função para excluir um indivíduo
  function excluirIndividuo(id) {
    axios.delete(`http://localhost:3005/individuos/${id}`).then(() => {
      reiniciarEstadoDosObjetos(); // Após excluir, recarrega a lista de indivíduos
    });
  }

  // Função para salvar (criar ou atualizar) um indivíduo
  function salvarIndividuo() {
    if (individuo._id) {
      // Se existe _id, faz um PUT para atualizar
      axios.put(`http://localhost:3005/individuos/${individuo._id}`, individuo).then(() => {
        reiniciarEstadoDosObjetos(); // Após atualizar, recarrega a lista de indivíduos
      });
    } else {
      // Caso contrário, faz um POST para criar novo
      axios.post("http://localhost:3005/individuos", individuo).then(() => {
        reiniciarEstadoDosObjetos(); // Após criar, recarrega a lista de indivíduos
      });
    }
  }

  // Função para reiniciar o estado do indivíduo em edição e recarregar a lista de indivíduos
  function reiniciarEstadoDosObjetos() {
    setIndividuo(null);
    getIndividuos();
  }

  // Função para renderizar o formulário de edição ou criação de indivíduo
  function getFormulario() {
    return (
      <form>
        <label>Código</label>
        <input
          type="text"
          name="codigo"
          value={individuo.codigo}
          onChange={(e) => {
            alterarIndividuo(e.target.name, e.target.value);
          }}
        />
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={individuo.nome}
          onChange={(e) => {
            alterarIndividuo(e.target.name, e.target.value);
          }}
        />
        <button
          type="button"
          onClick={() => {
            salvarIndividuo();
          }}
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={() => {
            setIndividuo(null);
          }}
        >
          Cancelar
        </button>
      </form>
    );
  }

  // Função para gerar uma linha da tabela de indivíduos
  function getLinhaDaTabela(individuo) {
    return (
      <tr key={individuo._id}>
        <td>{individuo._id}</td>
        <td>{individuo.codigo}</td>
        <td>{individuo.nome}</td>
        <td>
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  `Confirmar a exclusão do indivíduo ${individuo.nome}?`
                )
              ) {
                excluirIndividuo(individuo._id);
              }
            }}
          >
            Excluir
          </button>
          <button
            type="button"
            onClick={() => {
              editarIndividuo(individuo);
            }}
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }

  // Função para gerar as linhas da tabela de indivíduos
  function getLinhasDaTabela() {
    return individuos.map((individuo) => getLinhaDaTabela(individuo));
  }

  // Função para renderizar a tabela de indivíduos
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

  // Função para renderizar o conteúdo principal da página
  function getConteudo() {
    if (individuo == null) {
      // Se não há indivíduo selecionado para edição, mostra a tabela de indivíduos
      return (
        <>
          <button
            type="button"
            onClick={() => {
              novoIndividuo();
            }}
          >
            Novo indivíduo
          </button>
          {getTabela()}
        </>
      );
    } else {
      // Caso contrário, mostra o formulário de edição/criação de indivíduo
      return getFormulario();
    }
  }

  // Renderiza o componente Individuos
  return (
    <div className="cadastros">
      <div className="conteudo">{getConteudo()}</div>
    </div>
  );
}

export default Individuos;
