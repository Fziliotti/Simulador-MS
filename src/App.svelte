<script>
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';

  import ChartSimulacao from './components/Chart.svelte'; //chart tempo Medio na fila

  import {generateRandom} from './services/randomNumbers.js';

  import { fade } from 'svelte/transition';

  //VARIAVEIS DO SISTEMA
  let tempoTotalDeSimulacao = 240;
  let numeroDeClientesAcumulados = 1;
  let temposEntreTodasChegadas = [ 17.5, 7.5, 12.5, 2.5, 2.5, 2.5, 2.5, 37.5, 17.5, 17.5, 32.5, 37.5, 7.5, 12.5, 12.5];
  let temposDeTodosOsServicos = [ 11.5, 12.6, 12.0, 11.5, 12, 10.4, 11.5, 13.1, 10.4, 11.5, 11.5, 9.8, 10.9, 11.5, 10.4];
  let numeroDeServicos = 15

  // VARIAVEIS PARA GERAÇÃO DINAMICA DOS GRAFICOS
  let listaDeTemposMediosNafila = []
  let listaDeTemposMediosDeServico = []
  let listaDeProbabilidadesDeOperadoresLivre = []
  let listaDeProbDeClienteEsperarNaFila = []
  let listaDeTemposMediosDespendidoNoSistema = []
  
  let servicos = [];

  $: ultimoServico = () => servicos[servicos.length - 1];

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

  const alimentarDadosDosGraficos = () => {
    listaDeTemposMediosNafila = [...listaDeTemposMediosNafila, tempoMedioDeEsperaNaFila() ]
    listaDeTemposMediosDeServico = [...listaDeTemposMediosDeServico, tempoMedioDeServicos() ]
    listaDeProbabilidadesDeOperadoresLivre = [...listaDeProbabilidadesDeOperadoresLivre, probabilidadeDeOperadorLivre() ]
    listaDeProbDeClienteEsperarNaFila = [...listaDeProbDeClienteEsperarNaFila, probabilidadeDeEspera() ]
    listaDeTemposMediosDespendidoNoSistema = [...listaDeTemposMediosDespendidoNoSistema, tempoMedioDespendidoNoSistema() ]
  }


  const simularProblema = () => {
      for(let i = 0; i < numeroDeServicos; i++ ){
        setTimeout(() => {
          let novoServico = gerarServico(temposEntreTodasChegadas[i],temposDeTodosOsServicos[i])
          servicos = [...servicos, novoServico];
          alimentarDadosDosGraficos()
        },1000 * i)
        
      }
  }

  
  // Funções 
	const iniciarSimulacao = (event) => {
    event.preventDefault()
    simularProblema()
  }

 
  
</script>

<style>
  :global(*,*::after,*::before) {
    padding: 0;
    margin: 0;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    background: #4d5382;
  }

  .header__title {
		font-size: 24px;
		text-transform: uppercase;
    color: white;
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
    <div class="form-group col-md-6">
      <label for="inputEmail4">Email</label>
      <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Password</label>
      <input type="password" class="form-control" id="inputPassword4" placeholder="Password">
    </div>
  </div>
  <button class="btn btn-large btn-primary" on:click|preventDefault|once={iniciarSimulacao}> Simular</button>
  <!-- <button class="btn btn-large btn-danger" on:click|preventDefault|once={pararSimulacao}> Parar</button> -->
</form>

<hr>

<div class="container">
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
      <ChartSimulacao  data={listaDeProbabilidadesDeOperadoresLivre} backgroundColor='#466365' numeroDeIteracoes={numeroDeServicos} titulo="Tempo médio na fila de espera" />
    </div>

    <div class="col-md-4">
      <ChartSimulacao  data={listaDeProbDeClienteEsperarNaFila} backgroundColor='#ABFAA9' numeroDeIteracoes={numeroDeServicos} titulo="Tempo médio de serviço" />
    </div>

     <div class="col-md-4">
      <ChartSimulacao  data={listaDeTemposMediosDespendidoNoSistema} backgroundColor='#C6B9CD' numeroDeIteracoes={numeroDeServicos} titulo="Tempo médio de serviço" />
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





