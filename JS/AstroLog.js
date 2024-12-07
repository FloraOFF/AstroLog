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

        let log = JSON.parse(localStorage.getItem("log"));

        if(log == null){
            log = [];
        }
            log.push(observacao);
    
            localStorage.setItem("log", JSON.stringify(log));   

            window.location.href = "./ShowLog.html";

        //arrObserve.add(observacao);

        //console.log(arrObserve,'oi');
        //console.log (objeto,local,data,tempo,image);
        console.log (observacao.objeto, observacao.local, observacao.data, observacao.hora, observacao.img);
        console.log (log);
    });
    
});