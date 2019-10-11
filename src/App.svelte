<script>
  import Header from './components/Header.svelte';
  import {generateRandom} from './services/randomNumbers.js'

  // let tempoDoSistema = 0;
  let clienteCorrente = 1;
  let numeroDeServicos;
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

  $: indiceDoUltimoServicoConcluido = servicos.length -1;
  
  const gerarNovoServico = () => {
    const novoCliente = clienteCorrente + 1;
    const novoTempoDesdeUltimaChegada = 20; //Essa parte preciso gerar aleatorio mais pra frente
    const novoTempoChegadaNoRelogio = servicos[indiceDoUltimoServicoConcluido].tempoChegadaNoRelogio + novoTempoDesdeUltimaChegada;
    const novoTempoDeServico = 20; // Essa parte depois vai precisar gerar aleatorio tambem
    const novoTempoInicioServicoNoRelogio = servicos[indiceDoUltimoServicoConcluido].tempoFinalDoServicoNoRelogio;
    const novoTempoClienteNaFila = novoTempoChegadaNoRelogio - servicos[indiceDoUltimoServicoConcluido].tempoFinalDoServicoNoRelogio;
    const novoTempoFinalDoServicoNoRelogio = novoTempoDeServico + novoTempoInicioServicoNoRelogio;
    const novoTempoClienteNoSistema = novoTempoDeServico + novoTempoClienteNaFila;
    const novoTempoLivreDoOperador =  novoTempoInicioServicoNoRelogio - servicos[indiceDoUltimoServicoConcluido].tempoFinalDoServicoNoRelogio

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
    }

    clienteCorrente = clienteCorrente + 1

    return novoServico

  }

	const handleClick = () => {
		const novoServico = gerarNovoServico() 
		servicos = [...servicos, novoServico]
    console.table(servicos)
    // console.log(indiceDoUltimoServicoConcluido)

		
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


<form class="container">
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
  <div class="form-group">
    <label for="inputAddress">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
  </div>
  <div class="form-group">
    <label for="inputAddress2">Address 2</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">City</label>
      <input type="text" class="form-control" id="inputCity">
    </div>
    <div class="form-group col-md-4">
      <label for="inputState">State</label>
      <select id="inputState" class="form-control">
        <option selected>Choose...</option>
        <option>...</option>
      </select>
    </div>
    <div class="form-group col-md-2">
      <label for="inputZip">Zip</label>
      <input type="text" class="form-control" id="inputZip">
    </div>
  </div>
  <div class="form-group">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck">
      <label class="form-check-label" for="gridCheck">
        Check me out
      </label>
    </div>
  </div>
</form>

  <button class="btn btn-large btn-success" on:click={handleClick} > Clicar aqui</button>

<main>
  <table class="table table-striped">
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
