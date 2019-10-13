<script>
  import { fade } from 'svelte/transition';
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import ChartSimulacao from './components/Chart.svelte'; //chart tempo Medio na fila
  import {SIMULATION_EXAMPLE} from './constants/mockSimulacoes.js';
  import {generateRandom, nextExponential, nextNormal} from './services/randomNumbers.js';


  //VARIAVEIS DO SISTEMA
  let numeroDeClientesAcumulados = 1;
  let tempoTotalDeSimulacao = 240;
  let temposEntreTodasChegadas = [];
  let temposDeTodosOsServicos = [];
  let numeroDeServicos =15
  let servicos = [];


  // VARIAVEIS PARA GERAÇÃO DINAMICA DOS GRAFICOS
  let listaDeTemposMediosNafila = []
  let listaDeTemposMediosDeServico = []
  let listaDeProbabilidadesDeOperadoresLivre = []
  let listaDeProbDeClienteEsperarNaFila = []
  let listaDeTemposMediosDespendidoNoSistema = []
  
  
  

  $: ultimoServico = () => servicos[servicos.length - 1];


  // FUNÇÕES PARA GERAÇÃO DINAMICA DO RELATORIO (GRAFICOS E INFORMAÇÕES)
  $: tempoMedioDeServicos = () => {
    let numeroTotalDeClientes = numeroDeClientesAcumulados
    let listaDeTemposDeServicos = servicos.map( item => item.tempoServico);
    let tempoTotalDeServicos = listaDeTemposDeServicos.reduce((acc, atual) => acc += atual);
    return tempoTotalDeServicos / numeroTotalDeClientes;
  }

  $: tempoMedioDeEsperaNaFila = () => {
    let numeroTotalDeClientes = numeroDeClientesAcumulados
    let listaDeTemposDeEspera = servicos.map( item => item.tempoClienteNaFila);
    let tempoDeEsperaTotal = listaDeTemposDeEspera.reduce((acc, atual) => acc += atual);
    return tempoDeEsperaTotal / numeroDeClientesAcumulados;
  }

  $: probabilidadeDeEspera = () => {
    let numeroTotalDeClientes = numeroDeClientesAcumulados
    let listaDeEsperasPelosClientes= servicos.map(servico => servico.tempoClienteNaFila);
    let numeroDeClientesQueEsperaram = listaDeEsperasPelosClientes.filter( tempo => tempo > 0 && tempo !== undefined).length;
    return numeroDeClientesQueEsperaram / numeroTotalDeClientes;
  }

  $: probabilidadeDeOperadorLivre = () => {
    let listaDeTemposLivresDosOperadores= servicos.map(servico => servico.tempoLivreDoOperador);
    let totalDeTempoLivreDosOperadores = listaDeTemposLivresDosOperadores.reduce((acc, atual) => acc += atual);
    return totalDeTempoLivreDosOperadores / tempoTotalDeSimulacao;
  }
  
  $: tempoMedioDespendidoNoSistema = () => {
    let numeroTotalDeClientes = numeroDeClientesAcumulados
    let listaDeTemposNoSistema= servicos.map(servico => servico.tempoClienteNoSistema);
    let totalDeTemposNoSistema = listaDeTemposNoSistema.reduce((acc, atual) => acc += atual);
    return totalDeTemposNoSistema / numeroTotalDeClientes;
  }

  const alimentarDadosDosGraficos = () => {
    listaDeTemposMediosNafila = [...listaDeTemposMediosNafila, tempoMedioDeEsperaNaFila() ]
    listaDeTemposMediosDeServico = [...listaDeTemposMediosDeServico, tempoMedioDeServicos() ]
    listaDeProbabilidadesDeOperadoresLivre = [...listaDeProbabilidadesDeOperadoresLivre, probabilidadeDeOperadorLivre() ]
    listaDeProbDeClienteEsperarNaFila = [...listaDeProbDeClienteEsperarNaFila, probabilidadeDeEspera() ]
    listaDeTemposMediosDespendidoNoSistema = [...listaDeTemposMediosDespendidoNoSistema, tempoMedioDespendidoNoSistema() ]
  }


  // FUNÇÕES DA SIMULAÇÃO
  const gerarNaoPrimeiroServico = (NTDUC, NTSNR) => {
    const novoCliente = numeroDeClientesAcumulados + 1;
    const novoTempoDesdeUltimaChegada = NTDUC; //Essa parte preciso gerar aleatorio mais pra frente
    const novoTempoChegadaNoRelogio = ultimoServico().tempoChegadaNoRelogio + novoTempoDesdeUltimaChegada;
    const novoTempoDeServico = NTSNR; // Essa parte depois vai precisar gerar aleatorio tambem

    const novoTempoInicioServicoNoRelogio = () => {
      const tempoDoUltimoServicoJaConcluido = ultimoServico().tempoFinalDoServicoNoRelogio;
      if (tempoDoUltimoServicoJaConcluido > novoTempoChegadaNoRelogio)
        return tempoDoUltimoServicoJaConcluido
      else
         return novoTempoChegadaNoRelogio
    }
  
    const novoTempoClienteNaFila = () => {
      const diferencaEntreTempos = ultimoServico().tempoFinalDoServicoNoRelogio - novoTempoChegadaNoRelogio;
      if (diferencaEntreTempos > 0)
        return diferencaEntreTempos
      else
        return 0
    }

    const novoTempoFinalDoServicoNoRelogio = novoTempoDeServico + novoTempoInicioServicoNoRelogio();
    const novoTempoClienteNoSistema = novoTempoDeServico + novoTempoClienteNaFila();
    const novoTempoLivreDoOperador =  novoTempoInicioServicoNoRelogio() - ultimoServico().tempoFinalDoServicoNoRelogio;

    const novoServico = {
      cliente: novoCliente,
			tempoDesdeUltimaChegada: novoTempoDesdeUltimaChegada,
			tempoChegadaNoRelogio: novoTempoChegadaNoRelogio,
			tempoServico: novoTempoDeServico,
			tempoInicioServicoNoRelogio: novoTempoInicioServicoNoRelogio(),
			tempoClienteNaFila: novoTempoClienteNaFila(),
			tempoFinalDoServicoNoRelogio: novoTempoFinalDoServicoNoRelogio,
			tempoClienteNoSistema: novoTempoClienteNoSistema,
			tempoLivreDoOperador: novoTempoLivreDoOperador
    };

    numeroDeClientesAcumulados = numeroDeClientesAcumulados + 1;

    return novoServico;

  }

  const gerarPrimeiroServico = (NTDUC, NTSNR) => {

    const novoTempoFinalDoServicoNoRelogio = NTDUC + NTSNR;
    const novoTempoClienteNoSistema = NTSNR ;

    const novoServico = {
      cliente: 1,
			tempoDesdeUltimaChegada: NTDUC,
			tempoChegadaNoRelogio: NTDUC,
			tempoServico: NTSNR,
			tempoInicioServicoNoRelogio: NTDUC,
			tempoClienteNaFila: 0,
			tempoFinalDoServicoNoRelogio: novoTempoFinalDoServicoNoRelogio,
			tempoClienteNoSistema: novoTempoClienteNoSistema,
			tempoLivreDoOperador: NTDUC
    };

    return novoServico;
  }

  const gerarServico = (NTDUC, NTSNR) => {
    let novoServico;

    let naoEhPrimeiroServico = servicos.length != 0
    
    if(naoEhPrimeiroServico)
      novoServico = gerarNaoPrimeiroServico(NTDUC, NTSNR);
    else
      novoServico = gerarPrimeiroServico(NTDUC, NTSNR);

    return novoServico
  }

  

  // let temposEntreTodasChegadas = [ 17.5, 7.5, 12.5, 2.5, 2.5, 2.5, 2.5, 37.5, 17.5, 17.5, 32.5, 37.5, 7.5, 12.5, 12.5];
  // let temposDeTodosOsServicos = [ 11.5, 12.6, 12.0, 11.5, 12, 10.4, 11.5, 13.1, 10.4, 11.5, 11.5, 9.8, 10.9, 11.5, 10.4];


  // const gerarTemposEntreTodasAsChegadas = () => {
  //   for(let i = 0; i < numeroDeServicos; i++ ){
  //     let novoTempo = nextExponential(0.4)
  //     temposEntreTodasChegadas = [...temposEntreTodasChegadas, novoTempo]
  //   }
  // }

  // const gerarTemposDeTodosOsServicos = () => {
  //    for(let i = 0; i < numeroDeServicos; i++ ){
  //     let novoTempo = nextExponential(0.4) * 2;
  //     temposDeTodosOsServicos = [...temposDeTodosOsServicos, novoTempo]
    
  //   }
  // }


  const simularProblema = () => {
      // gerarTemposEntreTodasAsChegadas()
      // gerarTemposDeTodosOsServicos()
      for(let i = 0; i < numeroDeServicos; i++ ){
        setTimeout(() => {
          let novoServico = gerarServico(temposEntreTodasChegadas[i],temposDeTodosOsServicos[i])
          servicos = [...servicos, novoServico];
          alimentarDadosDosGraficos()
        },600 * i)
      
      }
  }

  // FUNÇÕES DISPARADAS PELOS BOT~E
	const handleSimularClick = (event) => {
    event.preventDefault()
    simularProblema()
  }

  const handleSimularSlideClick = () => {
    let tempoSimulacao = SIMULATION_EXAMPLE.tempoTotalDeSimulacao;
    
    for(let i = 0; i < numeroDeServicos; i++ ){
      setTimeout(() => {
        let novoServico = gerarServico(SIMULATION_EXAMPLE.temposEntreTodasChegadas[i],SIMULATION_EXAMPLE.temposDeTodosOsServicos[i])
        servicos = [...servicos, novoServico];
        alimentarDadosDosGraficos()
      },600 * i)
    }
  }


  // CONTROLE FORMULÁRIO
  let tecOpcoes = [
		{ id: 1, text: `Determinístico` },
		{ id: 2, text: `Aleatório Exponencial` }
  ];

  let tsOpcoes = [
		{ id: 1, text: `Determinístico` },
		{ id: 2, text: `Aleatório Exponencial` }
  ];

  let tecSelecionado = "";
  let tsSelecionado = "";

 


</script>

<style>
  :global(*,*::after,*::before) {
    padding: 0;
    margin: 0;
  }

  @media print {
    header, footer, form, .btn-imprimir{
      display: none;
      visibility: hidden;
    }
  }


	
	main{
		margin-top:2rem;
		max-width: 1400px;
		margin: 0 auto;
		padding: 1rem;
	}
</style>



<Header/>

<form class="container my-3">
  <div class="form-row">
    <div class="form-group col-md-3">
      <label for="inputTS">Tempo da simulação</label>
      <input type="number" min="1" max="9999" class="form-control" id="inputTS" placeholder="tempo da simulação">
    </div>
  </div>
  
  <!-- Tempo entre chegadas -->
   <div class="form-row">
    <div class="form-group col-md-3">
      <label for="inputTEC">Tempo entre chegadas</label>
      <select class="form-control" value={tecSelecionado} id="inputTEC"  bind:value={tecSelecionado}>
        <option value={0}>
          Selecione alguma...
        </option>
        {#each tecOpcoes as option}
          <option value={option}>
            {option.text}
          </option>
        {/each}
      </select>
    </div>

  {#if tecSelecionado.id === 1 }
     <div in:fade  class="form-group col-md-4">
      <label for="inputTEC">Quantos minutos o serviço demora?</label>
      <input type="number" class="form-control" id="inputTEC" min="1" max="999" placeholder="tempo em minutos">
    </div>
  {:else if tecSelecionado.id === 2}
    <div in:fade class="form-group col-md-2">
      <label for="inputLambdaExponencial">Valor do Lambda</label>
      <input type="number" class="form-control" id="inputLambdaExponencial" placeholder="">
    </div>
  {/if}

  </div>

 
  <!-- Tempo de serviços -->
  <div class="form-row">
    <div class="form-group col-md-3">
      <label for="inputTS">Tempo dos serviços</label>
      <select class="form-control" value={tsSelecionado} id="inputTS"  bind:value={tsSelecionado}>
        <option value={0}>
          Selecione alguma...
        </option>
        {#each tsOpcoes as option}
          <option value={option}>
            {option.text}
          </option>
        {/each}
      </select>
    </div>

  {#if tsSelecionado.id === 1 }
     <div in:fade  class="form-group col-md-4">
      <label for="inputNumeroDeServicos">Quantos minutos o serviço demora?</label>
      <input type="number" class="form-control" id="inputNumeroDeServicos" min="1" max="999" placeholder="tempo em minutos">
    </div>
  {:else if tsSelecionado.id === 2}
    <div in:fade class="form-group col-md-2">
      <label for="inputNumeroDeServicos">Valor do Lambda</label>
      <input type="number" class="form-control" id="inputNumeroDeServicos" placeholder="">
    </div>
  {/if}

  </div>
  
  <button class="btn btn-large btn-primary" on:click|preventDefault|once={handleSimularClick}> Simular</button>
  <button class="btn btn-large btn-secondary" on:click|preventDefault|once={handleSimularSlideClick}> Simular Exemplo Slide</button>
</form>

<hr>

<div class="container">
  <div class="d-flex justify-content-end text-right">
    <button class="btn-imprimir btn btn-secondary" on:click="{() => window.print()}">Imprimir</button>
  </div>

  <div class="row">
    <div class="col-md-4">
      <ChartSimulacao  data={listaDeTemposMediosNafila} backgroundColor='#EF5B5B' numeroDeIteracoes={numeroDeServicos} titulo="Tempo médio na fila de espera" />
    </div>

    <div class="col-md-4">
      <ChartSimulacao  data={listaDeTemposMediosDeServico} backgroundColor='#BAA5FF' numeroDeIteracoes={numeroDeServicos} titulo="Tempo médio de serviço" />
    </div>

    <div class="col-md-4">
      {#if servicos.length != 0}
        <div transition:fade="{{duration:1000}}" class="pt-4">
          <p>Número total de clientes: <span class="bg-primary p-1 text-light rounded">{numeroDeClientesAcumulados}</span></p>
          <p>Tempo médio de espera na fila: <span class="bg-primary p-1 text-light rounded">{ tempoMedioDeEsperaNaFila().toFixed(2)}</span></p>
          <p>Probabilidade de um cliente esperar na fila: <span class="bg-primary p-1 text-light rounded">{probabilidadeDeEspera().toFixed(2)}</span></p>
          <p>Probabilidade do operador livre: <span class="bg-primary p-1 text-light rounded">{probabilidadeDeOperadorLivre().toFixed(2)}</span></p>
          <p>Tempo médio de serviço: <span class="bg-primary p-1 text-light rounded">{tempoMedioDeServicos().toFixed(2)}</span></p>
          <p>Tempo médio despendido no sistema: <span class="bg-primary p-1 text-light rounded">{tempoMedioDespendidoNoSistema().toFixed(2)}</span></p>
        </div>
      {/if}
    </div>

  </div>

  <div class="row">
   <div class="col-md-4">
      <ChartSimulacao  data={listaDeProbabilidadesDeOperadoresLivre} backgroundColor='#466365' numeroDeIteracoes={numeroDeServicos} titulo="Probabilidade de operador livre" />
    </div>

    <div class="col-md-4">
      <ChartSimulacao  data={listaDeProbDeClienteEsperarNaFila} backgroundColor='#ABFAA9' numeroDeIteracoes={numeroDeServicos} titulo="Probabilidade do cliente esperar" />
    </div>

     <div class="col-md-4">
      <ChartSimulacao  data={listaDeTemposMediosDespendidoNoSistema} backgroundColor='#C6B9CD' numeroDeIteracoes={numeroDeServicos} titulo="Tempos Médios despendido no sistema" />
    </div>
  </div>

</div>

<hr>

<main>
  <table class="table table-striped table-hover my-4">
    <thead class="bg-secondary text-light">
      <tr>
        <th scope="col">Cliente</th>
        <th scope="col">Tempo desde ultima chegada</th>
        <th scope="col">Tempo de chegada no relogio</th>
        <th scope="col">Tempo de serviço</th>
        <th scope="col">Tempo de início do serviço no relógio</th>
        <th scope="col">Tempo de cliente na fila</th>
        <th scope="col">Tempo final do serviço no relógio</th>
        <th scope="col">Tempo do cliente no sistema</th>
        <th scope="col">Tempo livre do operador</th>
      </tr>
    </thead>
    <tbody>
  {#if servicos.length != 0}
    {#each servicos as servico}
      <tr transition:fade="{{duration: 1000}}">
        <th scope="row">{servico.cliente}</th>
        <td>{servico.tempoDesdeUltimaChegada.toFixed(2)}</td>
        <td>{servico.tempoChegadaNoRelogio.toFixed(2)}</td>
        <td>{servico.tempoServico.toFixed(2)}</td>
        <td>{servico.tempoInicioServicoNoRelogio.toFixed(2)}</td>
        <td>{servico.tempoClienteNaFila.toFixed(2)}</td>
        <td>{servico.tempoFinalDoServicoNoRelogio.toFixed(2)}</td>
        <td>{servico.tempoClienteNoSistema.toFixed(2)}</td>
        <td>{servico.tempoLivreDoOperador.toFixed(2)}</td>
      </tr>

    {/each}
  {/if}
      

    </tbody>
  </table>


</main>

<Footer/>





