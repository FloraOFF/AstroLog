// atualizacao.js
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const observationId = urlParams.get("id");

    // Verifica se é uma atualização ou uma nova observação
    if (observationId) {
        // Atualização de observação
        const observation = getObservationById(observationId);
        const inputButton = document.getElementById("observationInput");
        inputButton.innerText = 'Atualizar Observação';

        const showLogButton = document.getElementById("log");
        showLogButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Ver Observações';
        showLogButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = "./ShowLog.html";
        })
        // console.log (observationId);
        preencherFormulario(observation);

        const updateForm = document.getElementById("formAstro");
        updateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const updatedObservation = obterDadosFormulario({ observationId });
            atualizarObservacao(updatedObservation);
            window.location.href = "./ShowLog.html";
        });
    } else {
        // Criação de nova observação
        const form = document.getElementById("formAstro");
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const novaObservacao = obterDadosFormulario();
            salvarObservacao(novaObservacao);
            window.location.href = "./ShowLog.html";
        });
    }
});

function preencherFormulario(observacao) {
    document.getElementById("objeto_Observado").value = observacao.objeto;
    document.getElementById("localizacao").value = observacao.local;
    document.getElementById("data").value = observacao.data;
    document.getElementById("hora").value = observacao.hora;
    document.getElementById("descricao").value = observacao.descricao;
    document.getElementById('nomeAutor').value = observacao.autor;
}

function obterDadosFormulario({ observationId = null } = {}) {
    // const observationId = window.observationId || null;

    console.log ("IDDDDDDDD: ",observationId);
    return {
        id: observationId || Date.now(),
        objeto: document.getElementById('objeto_Observado').value,
        local: document.getElementById('localizacao').value,
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value,
        descricao: document.getElementById('descricao').value,
        autor: document.getElementById('nomeAutor').value
    };
}

// Função para obter a observação com base no ID
function getObservationById(id) {
    const valor = localStorage.getItem("log");
    const dados = JSON.parse(valor);

    console.log(dados);
    console.log (id);
    // Procurar a observação com o ID correspondente
    const observation = Object.values(dados).find((log) => log.id === parseInt(id));

    console.log (observation);

    return observation || null;
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

function salvarObservacao (observacao) {
    let log = localStorage.getItem("log");
    
    // Verifica se log existe e é uma string válida
    try {
        log = log ? JSON.parse(log) : [];
    } catch (error) {
        console.error('Erro ao parsear log:', error);
        log = [];
    }
    
    log.push(observacao);

    try {
        localStorage.setItem("log", JSON.stringify(log));   
        window.location.href = "./ShowLog.html";
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
        alert('Não foi possível salvar a observação');
    }

    //arrObserve.add(observacao);

    //console.log(arrObserve,'oi');
    //console.log (objeto,local,data,tempo,image);
    console.log (observacao.objeto, observacao.local, observacao.data, observacao.hora, observacao.img);
    console.log (log);
}







