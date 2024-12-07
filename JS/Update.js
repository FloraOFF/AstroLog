// atualizacao.js
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const observationId = urlParams.get("id");
    console.log('Observation ID:', observationId);

    // Obter os dados da observação com base no ID
    const observation = getObservationById(observationId);
    console.log('Observation:', observation);

    // Preencher os campos do formulário com os dados da observação
    document.getElementById("objeto_Observado").value = observation.objeto;
    document.getElementById("localizacao").value = observation.local;
    document.getElementById("data").value = observation.data;
    document.getElementById("hora").value = observation.hora;
    document.getElementById("descricao").value = observation.descricao;

    const updateForm = document.getElementById("updateForm");
    updateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Update form submitted');

        // Obter os valores atualizados do formulário
        const updatedObservation = {
            id: observationId,
            objeto: document.getElementById('objeto_Observado').value,
            local: document.getElementById('localizacao').value,
            data: document.getElementById('data').value,
            hora: document.getElementById('hora').value,
            descricao: document.getElementById('descricao').value,
            autor: observation.autor
        };
        console.log('Updated Observation:', updatedObservation);

        // Lógica para atualizar a observação com os novos valores
        atualizarObservacao(updatedObservation);
        console.log('Observation updated');

        // Redirecionar de volta para a página que mostra todas as observações
        window.location.href = "./ShowLog.html";
    });
});


// Função para obter a observação com base no ID
function getObservationById(id) {
    const valor = localStorage.getItem("log");
    const dados = JSON.parse(valor);

    console.log(dados);
    // Procurar a observação com o ID correspondente
    const observation = Object.values(dados).find((log) => log.id === parseInt(id));

    return observation;
}

// Função para atualizar a observação com os novos valores
function atualizarObservacao(updatedObservation) {
    const valor = localStorage.getItem("log");
    const dados = JSON.parse(valor);

    console.log('Dados antes da atualização:', dados);

    // Encontrar o índice da observação com o ID correspondente
    const index = Object.values(dados).findIndex((log) => log.id === parseInt(updatedObservation.id));

    if (index !== -1) {
        // Atualizar a observação no objeto de dados
        dados[index] = updatedObservation;

        // Atualizar o localStorage com os dados atualizados
        localStorage.setItem("log", JSON.stringify(dados));

        console.log('Observação atualizada:', updatedObservation);
    } else {
        console.log('Observação não encontrada');
    }

    console.log('Dados após a atualização:', dados);

    setTimeout(() => {
        const updatedValue = localStorage.getItem("log");
        console.log('Valor atualizado do localStorage:', updatedValue);
    }, 10); // Aguarda 10 milissegundos antes de acessar novamente o localStorage
}







