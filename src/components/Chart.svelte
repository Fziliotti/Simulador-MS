


<script>
import { afterUpdate } from 'svelte';
export let data;
export let numeroDeIteracoes;
export let titulo;
let canvas;

function createChart(){
  var chartTMNF = new Chart(canvas, {
      type: 'line',
      data: {
          labels: [...new Array(numeroDeIteracoes).fill(0).map((it,i) => ++i)],
          datasets: [{
              label: titulo,
              data,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      }
  });
}

afterUpdate( () => {
  createChart()
}) 

</script>
<style>
  /* your styles go here */
</style>

<canvas id="chartTMNF" bind:this={canvas} width="400" height="400"></canvas>

