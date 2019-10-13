


<script>
import { afterUpdate } from 'svelte';
export let data;
export let numeroDeIteracoes;
export let titulo;
export let backgroundColor;
let canvas;

function createChart(){
  var chartTMNF = new Chart(canvas, {
      type: 'line',
      data: {
          labels: [...new Array(numeroDeIteracoes).fill(0).map((it,i) => ++i)],
          datasets: [{
              label: titulo,
              data,
              backgroundColor,
              borderWidth: 1
          }]
      }
  });
}

afterUpdate( () => {
  createChart()
}) 

</script>

<canvas id="chartTMNF" bind:this={canvas} width="400" height="400"></canvas>

