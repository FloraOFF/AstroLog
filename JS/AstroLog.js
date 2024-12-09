document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();

        const observacao = {
            id: Date.now(),
            autor: document.getElementById('nomeAutor').value,
            objeto: document.getElementById('objeto_Observado').value,
            local: document.getElementById('localizacao').value,
            data: document.getElementById('data').value,
            hora: document.getElementById('hora').value,
            descricao: document.getElementById('descricao').value
        }

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
    });
    
});