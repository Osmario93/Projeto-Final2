import "./componentes.css"; // Importa estilos CSS locais para o componente
import axios from "axios"; // Importa Axios para fazer requisições HTTP
import Select from "react-select"; // Importa o componente Select do pacote react-select
import { useState, useEffect } from "react"; // Importa hooks useState e useEffect do React

// Estilos personalizados para o componente Select
const selectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    margin: 0,
    borderRadius: 3,
    borderColor: "gray",
    boxShadow: state.isFocused ? "0 0 0 2px black" : 0,
    ":hover": { borderColor: "black" },
  }),
};

function Sequencias() {
  const [sequencia, setSequencia] = useState(null); // Estado para a sequência sendo editada ou criada
  const [sequencias, setSequencias] = useState([]); // Estado para a lista de sequências
  const [individuo, setIndividuo] = useState(null); // Estado para o indivíduo selecionado no Select
  const [individuos, setIndividuos] = useState([]); // Estado para a lista de indivíduos

  // Função para carregar a lista de sequências do backend
  function getSequencias() {
    axios.get("http://localhost:3005/sequencias").then((resposta) => {
      setSequencias(resposta.data); // Atualiza o estado das sequências com os dados recebidos do backend
    });
  }

  // Função para carregar a lista de indivíduos do backend
  function getIndividuos() {
    axios.get("http://localhost:3005/individuos").then((resposta) => {
      setIndividuos(resposta.data); // Atualiza o estado dos indivíduos com os dados recebidos do backend
    });
  }

  useEffect(() => {
    getIndividuos(); // Carrega a lista de indivíduos quando o componente é montado
    getSequencias(); // Carrega a lista de sequências quando o componente é montado
  }, []);

  // Funções para manipulação da entidade principal (sequência)
  function novaSequencia() {
    setSequencia({
      sequencia: "",
      individuo: null,
    });
    setIndividuo(null); // Limpa o estado do indivíduo selecionado
  }

  function editarSequencia(sequencia) {
    setSequencia(sequencia);
    setIndividuo({
      value: sequencia.individuo._id,
      label: sequencia.individuo.codigo + ", " + sequencia.individuo.nome,
    });
  }

  function alterarSequencia(campo, valor, id) {
    sequencia[campo] = valor;
    setSequencia({
      ...sequencia,
      _id: id,
    });
  }

  function excluirSequencia(id) {
    axios.delete(`http://localhost:3005/sequencias/${id}`).then(() => {
      reiniciarEstadoDosObjetos(); // Após excluir, recarrega a lista de sequências
    });
  }

  function salvarSequencia() {
    if (sequencia._id) {
      axios
        .put(`http://localhost:3005/sequencias/${sequencia._id}`, sequencia)
        .then(() => {
          reiniciarEstadoDosObjetos(); // Após atualizar, recarrega a lista de sequências
        });
    } else {
      axios.post("http://localhost:3005/sequencias", sequencia).then(() => {
        reiniciarEstadoDosObjetos(); // Após criar, recarrega a lista de sequências
      });
    }
  }

  function reiniciarEstadoDosObjetos() {
    setIndividuo(null);
    setSequencia(null);
    getSequencias(); // Recarrega a lista de sequências
  }

  // Função para renderizar o Select de Indivíduos
  function getSelectIndividuos() {
    const options = individuos.map((individuo) => ({
      value: individuo._id,
      label: `${individuo.codigo}, ${individuo.nome}`,
    }));

    return (
      <Select
        isClearable={true}
        value={individuo}
        onChange={onChangeSelectIndividuo}
        options={options}
        styles={selectStyles}
      />
    );
  }

  function onChangeSelectIndividuo(individuoSelecionado) {
    setIndividuo(individuoSelecionado);
    setSequencia((prevSequencia) => ({
      ...prevSequencia,
      individuo: individuoSelecionado.value,
    }));
  }

  // Função para renderizar o formulário de Sequência
  function getFormulario() {
    return (
      <form>
        <label>Indivíduo</label>
        {getSelectIndividuos()}
        <label>Sequência</label>
        <input
          type="text"
          name="sequencia"
          value={sequencia.sequencia}
          onChange={(e) => {
            alterarSequencia(e.target.name, e.target.value, sequencia._id);
          }}
        />
        <button
          type="button"
          onClick={() => {
            salvarSequencia();
          }}
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={() => {
            reiniciarEstadoDosObjetos();
          }}
        >
          Cancelar
        </button>
      </form>
    );
  }

  // Função para gerar uma linha da tabela de Sequências
  function getLinhaDaTabela(sequencia) {
    return (
      <tr key={sequencia._id}>
        <td>{sequencia._id}</td>
        <td>{sequencia.individuo ? `${sequencia.individuo.codigo}, ${sequencia.individuo.nome}` : "Indivíduo não especificado"}</td>
        <td>{sequencia.sequencia}</td>
        <td>
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  `Confirmar a exclusão da sequência ${sequencia.sequencia}?`
                )
              ) {
                excluirSequencia(sequencia._id);
              }
            }}
          >
            Excluir
          </button>
          <button
            type="button"
            onClick={() => {
              editarSequencia(sequencia);
            }}
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }

  // Função para gerar as linhas da tabela de Sequências
  function getLinhasDaTabela() {
    return sequencias.map((sequencia) => getLinhaDaTabela(sequencia));
  }

  // Função para renderizar a tabela de Sequências
  function getTabela() {
    return (
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Indivíduo</th>
            <th>Sequência</th>
            <th>Ações</th>
          </tr>
          {getLinhasDaTabela()}
        </tbody>
      </table>
    );
  }

  // Função do conteúdo principal
  function getConteudo() {
    if (sequencia == null) {
      return (
        <>
          <button
            type="button"
            onClick={() => {
              novaSequencia();
            }}
          >
            Nova sequência
          </button>
          {getTabela()}
        </>
      );
    } else {
      return getFormulario();
    }
  }

  // Renderiza o componente Sequencias
  return (
    <div className="cadastros">
      <div className="conteudo">{getConteudo()}</div>
    </div>
  );
}

export default Sequencias;
