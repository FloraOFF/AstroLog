const valor = localStorage.getItem("log");
const dados = JSON.parse(valor);

const showElement = document.getElementById("show");
const authorSearchInput = document.getElementById("authorSearchInput");
const objectSearchInput = document.getElementById("objectSearchInput");

authorSearchInput.addEventListener("input", handleSearchInput);
objectSearchInput.addEventListener("input", handleSearchInput);

if (dados === null || Object.keys(dados).length === 0) {
  const messageElement = document.createElement("p");
  messageElement.textContent = "Nenhuma observação encontrada.";
  messageElement.classList.add("mensagem");

  showElement.appendChild(messageElement);
} else {
  renderObservations(dados, "", "");
}

function renderObservations(observations, authorSearchTerm, objectSearchTerm) {
  const showElement = document.getElementById("show");
  // Limpar o conteúdo existente no elemento "show"
  showElement.innerHTML = "";

  for (const log of Object.values(observations)) {
    const obj = log.objeto;
    const local = log.local;
    const data = log.data;
    const hora = log.hora;
    const descricao = log.descricao;
    const id = log.id;
    const nome = log.autor;

    // Verificar se os campos de pesquisa estão vazios ou se a observação corresponde aos termos de pesquisa
    if (!authorSearchTerm && !objectSearchTerm) {
      // Exibir todos os logs quando os campos de pesquisa estão vazios
      const logElement = document.createElement("div");
      logElement.classList.add("observacao");
      logElement.innerHTML = `
        <h3>Objeto: ${obj}</h3>
        <p>Nome Autor: ${nome}</p>
        <p>Local: ${local}</p>
        <p>Data: ${data}</p>
        <p>Hora: ${hora}</p>
        <p>Descricao: ${descricao}</p>
        <p>Código: ${id}`;

      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Deletar";
      deleteButton.classList.add("delete");
      deleteButton.addEventListener("click", () => {
        deletarObservacao(id);
      });

      const updateButton = document.createElement("button");
      updateButton.innerText = "Atualizar";
      updateButton.classList.add("update");
      updateButton.addEventListener("click", () => {
        window.location.href = "./AstroLog.html?id=" + id;
      });

      logElement.appendChild(deleteButton);
      logElement.appendChild(updateButton);

      showElement.appendChild(logElement);
    } else {
      // Verificar se o autor ou objeto da observação correspondem aos termos de pesquisa
      if (
        (authorSearchTerm && nome.includes(authorSearchTerm)) ||
        (objectSearchTerm && obj.includes(objectSearchTerm))
      ) {
        const logElement = document.createElement("div");
        logElement.classList.add("observacao");
        logElement.innerHTML = `
          <h3>Objeto: ${obj}</h3>
          <p>Nome Autor: ${nome}</p>
          <p>Local: ${local}</p>
          <p>Data: ${data}</p>
          <p>Hora: ${hora}</p>
          <p>Descricao: ${descricao}</p>
          <p>Código: ${id}`;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Deletar";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", () => {
          deletarObservacao(id);
        });

        const updateButton = document.createElement("button");
        updateButton.innerText = "Atualizar";
        updateButton.classList.add("update");
        updateButton.addEventListener("click", () => {
          window.location.href = "./AstroLog.html?id=" + id;
        });

        logElement.appendChild(deleteButton);
        logElement.appendChild(updateButton);

        showElement.appendChild(logElement);
      }
    }
  }
}


function deletarObservacao(id) {
  let log = JSON.parse(localStorage.getItem("log"));

  // Encontrar o índice da observação com o ID correspondente
  const index = log.findIndex((observacao) => observacao.id === id);

  if (index !== -1) {
    // Remover a observação do array
    log.splice(index, 1);

    // Atualizar o localStorage com o array modificado
    localStorage.setItem("log", JSON.stringify(log));

    // Recarregar a página para exibir a lista atualizada
    location.reload();
  }
}

function handleSearchInput() {
  const authorSearchTerm = authorSearchInput.value;
  const objectSearchTerm = objectSearchInput.value;

  renderObservations(dados, authorSearchTerm, objectSearchTerm);
}
