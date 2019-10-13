<script>
  import Header from './components/Header.svelte';

  import ChartTMNF from './components/ChartTMNF.svelte'; //chart tempo Medio na fila

  import {generateRandom} from './services/randomNumbers.js';

  let tempoTotalDeSimulacao = 240;
  let numeroDeClientesAcumulados = 1;
  let listaDeTemposMediosNafila = []
  let intervalReference;
  let temposEntreTodasChegadas = [ 17.5, 7.5, 12.5, 2.5, 2.5, 2.5, 2.5, 37.5, 17.5, 17.5, 32.5, 37.5, 7.5, 12.5, 12.5];
  let temposDeTodosOsServicos = [ 11.5, 12.6, 12.0, 11.5, 12, 10.4, 11.5, 13.1, 10.4, 11.5, 11.5, 9.8, 10.9, 11.5, 10.4];
  let numeroDeServicos = 15
  
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
  
  
  const gerarNovoServico = (NTDUC, NTSNR) => {
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

  const simularProblema = () => {
      let novoServico;

      for(let i = 0; i < numeroDeServicos; i++ ){
        if(servicos.length != 0)
          novoServico = gerarNovoServico(temposEntreTodasChegadas[i],temposDeTodosOsServicos[i]);
        else
          novoServico = gerarPrimeiroServico(temposEntreTodasChegadas[0],temposDeTodosOsServicos[0] )
        

        servicos = [...servicos, novoServico];
        listaDeTemposMediosNafila = [...listaDeTemposMediosNafila, tempoMedioDeEsperaNaFila() ]
      
      }
  }

  
	const iniciarSimulacao = (event) => {
    event.preventDefault()
    simularProblema()
  }

  const pararSimulacao = () => {
    event.preventDefault()
    clearInterval(intervalReference)
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
  <button class="btn btn-large btn-danger" on:click|preventDefault|once={pararSimulacao}> Parar</button>
</form>

<hr>

<div class="container">
  <div class="row">
    <div class="col-md-4">
      <ChartTMNF data={listaDeTemposMediosNafila} numeroDeIteracoes={15} />
    </div>

    <div class="col-md-4">
      
    </div>

    <div class="col-md-4">
    
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
      <tr>
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

<hr>
{#if servicos.length != 0}
  <p>Número de clientes que entraram no sistema: {numeroDeClientesAcumulados}</p>
  <p>Tempo médio de espera na fila: { tempoMedioDeEsperaNaFila().toFixed(2)}</p>
  <p>Probabilidade de um cliente esperar na fila: {probabilidadeDeEspera().toFixed(2)}</p>
  <p>Probabilidade do operador livre: {probabilidadeDeOperadorLivre().toFixed(2)}</p>
  <p>Tempo médio de serviço: {tempoMedioDeServicos().toFixed(2)}</p>
{/if}

</main>






