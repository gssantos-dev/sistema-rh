// script.js - Versão com seletor de data funcional

window.onload = function() {

    // Pegando os elementos do HTML
    const selectFuncionario = document.getElementById('selecionarFuncionario');
    const dataInput = document.getElementById('selecionarData');
    const nomeEl = document.getElementById('nomeFuncionario');
    const cargoEl = document.getElementById('cargoFuncionario');
    const cpfEl = document.getElementById('cpfFuncionario');
    const setorEl = document.getElementById('setorFuncionario');
    const admissaoEl = document.getElementById('admissaoFuncionario');
    const corpoTabela = document.getElementById('corpoTabelaEPI');
    const dataPorExtensoEl = document.getElementById('dataPorExtenso');
    const nomeAssinaturaEl = document.getElementById('nomeAssinatura');

    // --- FUNÇÕES DE ATUALIZAÇÃO ---

    // 1. Gera a data por extenso no rodapé
    function gerarDataPorExtenso(dataString) {
        if (!dataString) return; // Se a data for inválida, não faz nada
        // Adicionar 'T00:00:00' previne problemas de fuso horário que podem mudar o dia
        const dataObj = new Date(dataString + 'T00:00:00');
        const opcoes = { day: 'numeric', month: 'long', year: 'numeric' };
        const dataFormatada = dataObj.toLocaleDateString('pt-BR', opcoes);
        dataPorExtensoEl.textContent = `Atibaia, ${dataFormatada}.`;
    }
    
    // 2. Gera as linhas da tabela de EPIs com a data selecionada
    function gerarTabelaEPIs(dataString) {
        corpoTabela.innerHTML = '';
        if (!dataString) return; // Se a data for inválida, a tabela fica vazia

        const [ano, mes, dia] = dataString.split('-');
        const dataFormatada = `${dia}/${mes}/${ano}`;

        listaDeEPIs.forEach(epi => {
            const linha = document.createElement('tr');
            const celulaData = document.createElement('td');
            const celulaNome = document.createElement('td');
            const celulaCA = document.createElement('td');
            const celulaAssinatura = document.createElement('td');
            
            celulaData.textContent = dataFormatada; // <--- USA A DATA SELECIONADA
            celulaNome.textContent = epi.nome;
            celulaCA.textContent = epi.ca;
            
            linha.appendChild(celulaData);
            linha.appendChild(celulaNome);
            linha.appendChild(celulaCA);
            linha.appendChild(celulaAssinatura);
            
            corpoTabela.appendChild(linha);
        });
    }

    // 3. Atualiza os dados do funcionário
    function atualizarInfoFuncionario(idSelecionado) {
        const funcionarioSelecionado = funcionarios.find(func => func.id === idSelecionado);
        if (funcionarioSelecionado) {
            nomeEl.textContent = funcionarioSelecionado.nome;
            cargoEl.textContent = funcionarioSelecionado.cargo;
            cpfEl.textContent = funcionarioSelecionado.cpf;
            setorEl.textContent = funcionarioSelecionado.departamento;
            admissaoEl.textContent = funcionarioSelecionado.dataAdmissao;
            nomeAssinaturaEl.textContent = funcionarioSelecionado.nome;
        } else {
            nomeEl.textContent = '';
            cargoEl.textContent = '';
            cpfEl.textContent = '';
            setorEl.textContent = '';
            admissaoEl.textContent = '';
            nomeAssinaturaEl.textContent = '';
        }
    }

    // --- FUNÇÃO CENTRAL E INICIALIZAÇÃO ---

    // 4. FUNÇÃO MESTRE: Orquestra todas as atualizações
    function atualizarFichaCompleta() {
        const idFuncionario = parseInt(selectFuncionario.value);
        const dataSelecionada = dataInput.value; // Pega a data no formato 'YYYY-MM-DD'

        atualizarInfoFuncionario(idFuncionario);
        gerarTabelaEPIs(dataSelecionada);
        gerarDataPorExtenso(dataSelecionada);
    }
    
    // 5. Função para popular a lista de funcionários (executa apenas uma vez)
    function popularSelectFuncionarios() {
        funcionarios.forEach(func => {
            const option = document.createElement('option');
            option.value = func.id;
            option.textContent = func.nome;
            selectFuncionario.appendChild(option);
        });
    }

    // 6. INICIALIZAÇÃO DO SISTEMA
    function init() {
        // Define a data de hoje como padrão no seletor
        dataInput.value = new Date().toISOString().split('T')[0];
        
        popularSelectFuncionarios();
        atualizarFichaCompleta(); // Executa uma vez para carregar a ficha com os valores padrão

        // Adiciona os "escutadores" de eventos
        selectFuncionario.addEventListener('change', atualizarFichaCompleta);
        dataInput.addEventListener('change', atualizarFichaCompleta);
    }
    
    init(); // Inicia tudo!
};