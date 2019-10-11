<script>
  import Header from './components/Header.svelte';

  import ChartTMNF from './components/ChartTMNF.svelte'; //chart tempo Medio na fila

  import {generateRandom} from './services/randomNumbers.js';

  // let tempoDoSistema = 0;
  let clienteCorrente = 1;
  // let numeroDeServicos;
  // let tempoChegadaNoRelogio = 0;
  
  let servicos = [
		{
			cliente: 1,
			tempoDesdeUltimaChegada: 17.5,
			tempoChegadaNoRelogio: 17.5,
			tempoServico: 11.5,
			tempoInicioServicoNoRelogio: 17.5,
			tempoClienteNaFila: 0,
			tempoFinalDoServicoNoRelogio: 29,
			tempoClienteNoSistema: 11.5,
			tempoLivreDoOperador: 17.5
		}
  ];

  $: ultimoServico = servicos[servicos.length -1];

  $: tempoMedioDeServicos = () => {
    let numeroTotalDeClientes = clienteCorrente
    let listaDeTemposDeServicos = servicos.map( item => item.tempoServico);
    let tempoTotalDeServicos = listaDeTemposDeServicos.reduce((acc, atual) => acc += atual);
    return tempoTotalDeServicos / numeroTotalDeClientes;
  }

  $: tempoMedioDeEsperaNaFila = () => {
    let numeroTotalDeClientes = clienteCorrente
    let listaDeTemposDeEspera = servicos.map( item => item.tempoClienteNaFila);
    let tempoDeEsperaTotal = listaDeTemposDeEspera.reduce((acc, atual) => acc += atual);
    return tempoDeEsperaTotal / clienteCorrente;
  }

  $: probabilidadeDeEspera = () => {
    let numeroTotalDeClientes = clienteCorrente
    let listaDeEsperasPelosClientes= servicos.map(servico => servico.tempoClienteNaFila);
    let numeroDeClientesQueEsperaram = listaDeEsperasPelosClientes.filter( tempo => tempo > 0 && tempo !== undefined).length;
    return numeroDeClientesQueEsperaram / numeroTotalDeClientes;
  }

  $: probabilidadeDeOperadorLivre = () => {
    let listaDeTemposLivresDosOperadores= servicos.map(servico => servico.tempoLivreDoOperador);
    let totalDeTempoLivreDosOperadores = listaDeTemposLivresDosOperadores.reduce((acc, atual) => acc += atual);
    let tempoTotalDeSimulacao = ultimoServico.tempoFinalDoServicoNoRelogio;
    return totalDeTempoLivreDosOperadores / tempoTotalDeSimulacao;
  }
  
  
  const gerarNovoServico = () => {
    const novoCliente = clienteCorrente + 1;
    const novoTempoDesdeUltimaChegada = 7.5; //Essa parte preciso gerar aleatorio mais pra frente
    const novoTempoChegadaNoRelogio = ultimoServico.tempoChegadaNoRelogio + novoTempoDesdeUltimaChegada;
    const novoTempoDeServico = 12.6; // Essa parte depois vai precisar gerar aleatorio tambem
    const novoTempoInicioServicoNoRelogio = ultimoServico.tempoFinalDoServicoNoRelogio;
    const novoTempoClienteNaFila = ultimoServico.tempoFinalDoServicoNoRelogio - novoTempoChegadaNoRelogio;
    const novoTempoFinalDoServicoNoRelogio = novoTempoDeServico + novoTempoInicioServicoNoRelogio;
    const novoTempoClienteNoSistema = novoTempoDeServico + novoTempoClienteNaFila;
    const novoTempoLivreDoOperador =  novoTempoInicioServicoNoRelogio - ultimoServico.tempoFinalDoServicoNoRelogio;

    const novoServico = {
      cliente: novoCliente,
			tempoDesdeUltimaChegada: novoTempoDesdeUltimaChegada,
			tempoChegadaNoRelogio: novoTempoChegadaNoRelogio,
			tempoServico: novoTempoDeServico,
			tempoInicioServicoNoRelogio: novoTempoInicioServicoNoRelogio,
			tempoClienteNaFila: novoTempoClienteNaFila,
			tempoFinalDoServicoNoRelogio: novoTempoFinalDoServicoNoRelogio,
			tempoClienteNoSistema: novoTempoClienteNoSistema,
			tempoLivreDoOperador: novoTempoLivreDoOperador
    };

    clienteCorrente = clienteCorrente + 1;

    return novoServico;

  }

  let listaDeTemposMediosNafila = []




  let intervalReference;

	const handleSubmit = (event) => {
    event.preventDefault()
    
    intervalReference = setInterval( () => {
      listaDeTemposMediosNafila = [...listaDeTemposMediosNafila, tempoMedioDeEsperaNaFila() ]
      const novoServico = gerarNovoServico();
      servicos = [...servicos, novoServico];

      
      // console.table(servicos);
      // console.log(tempoMedioDeServicos())
      // console.log(tempoMedioDeEsperaNaFila())
      // console.log(probabilidadeDeEspera())
      // console.log(probabilidadeDeOperadorLivre())
      // console.log(indiceDoUltimoServicoConcluido)
    },2000)
  }

  const handleStopClick = () => {
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
  <button class="btn btn-large btn-primary" on:click|preventDefault|once={handleSubmit}> Simular</button>
  <button class="btn btn-large btn-danger" on:click|preventDefault|once={handleStopClick}> Parar</button>
</form>

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


<main>
  <table class="table table-striped my-4">
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

    </tbody>
  </table>
</main>



