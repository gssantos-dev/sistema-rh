window.onload = function() {

    // --- CAPTURA DE ELEMENTOS DO PAINEL ---
    const selectFuncionario = document.getElementById('selecionarFuncionario');
    const dataOcorrenciaInput = document.getElementById('dataOcorrenciaInput');
    const horaOcorrenciaInput = document.getElementById('horaOcorrenciaInput');
    const motivoInput = document.getElementById('motivoInput');

    // --- ELEMENTOS DA FICHA A SEREM PREENCHIDOS ---
    const nomeEl = document.getElementById('nomeFuncionario');
    const cpfEl = document.getElementById('cpfFuncionario');
    const cargoEl = document.getElementById('cargoFuncionario');
    const motivoEl = document.getElementById('motivoAdvertencia');
    const dataOcorrenciaEl = document.getElementById('dataOcorrencia');
    const horaOcorrenciaEl = document.getElementById('horaOcorrencia');
    const dataPorExtensoEl = document.getElementById('dataPorExtenso');
    const nomeAssinaturaEl = document.getElementById('nomeAssinatura');

    // --- FUNÇÕES DE ATUALIZAÇÃO ---

    // Formata a data de YYYY-MM-DD para DD/MM/YYYY
    function formatarData(dataString) {
        if (!dataString) return "[DATA]";
        const [ano, mes, dia] = dataString.split('-');
        return `${dia}/${mes}/${ano}`;
    }
    
    // Função Mestra: Orquestra todas as atualizações em tempo real
    function atualizarFichaCompleta() {
        // Pega valores dos inputs
        const idFuncionario = parseInt(selectFuncionario.value);
        const funcionarioSelecionado = funcionarios.find(func => func.id === idFuncionario);
        const motivoTexto = motivoInput.value;
        const dataOcorrenciaValor = dataOcorrenciaInput.value;
        const horaOcorrenciaValor = horaOcorrenciaInput.value;

        // Atualiza dados do funcionário
        if (funcionarioSelecionado) {
            nomeEl.textContent = funcionarioSelecionado.nome;
            cpfEl.textContent = funcionarioSelecionado.cpf;
            cargoEl.textContent = funcionarioSelecionado.cargo;
            nomeAssinaturaEl.textContent = funcionarioSelecionado.nome;
        } else {
            // Limpa os campos se nenhum funcionário estiver selecionado
            [nomeEl, cpfEl, cargoEl, nomeAssinaturaEl].forEach(el => el.textContent = '');
        }

        // Atualiza dados do evento, com textos padrão caso estejam vazios
        motivoEl.textContent = motivoTexto || "[MOTIVO DA ADVERTÊNCIA]";
        dataOcorrenciaEl.textContent = formatarData(dataOcorrenciaValor);
        horaOcorrenciaEl.textContent = horaOcorrenciaValor || "[HORA]";
    }

    // Função para gerar a data por extenso no rodapé (usa a data ATUAL)
    function gerarDataAtualPorExtenso() {
        const hoje = new Date();
        const opcoes = { day: 'numeric', month: 'long', year: 'numeric' };
        const dataFormatada = hoje.toLocaleDateString('pt-BR', opcoes);
        dataPorExtensoEl.textContent = `Atibaia, ${dataFormatada}.`;
    }

    // Função para popular a lista de funcionários no dropdown
    function popularSelectFuncionarios() {
        funcionarios.forEach(func => {
            const option = document.createElement('option');
            option.value = func.id;
            option.textContent = func.nome;
            selectFuncionario.appendChild(option);
        });
    }

    // --- INICIALIZAÇÃO E EVENTOS ---
    function init() {
        popularSelectFuncionarios();
        gerarDataAtualPorExtenso(); // A data de emissão do documento é sempre a de hoje
        atualizarFichaCompleta(); // Roda uma vez para definir os textos padrão
        
        // Adiciona os "escutadores" que atualizam a ficha em tempo real
        selectFuncionario.addEventListener('input', atualizarFichaCompleta);
        dataOcorrenciaInput.addEventListener('input', atualizarFichaCompleta);
        horaOcorrenciaInput.addEventListener('input', atualizarFichaCompleta);
        motivoInput.addEventListener('input', atualizarFichaCompleta);
    }
    
    init(); // Inicia o sistema!
};