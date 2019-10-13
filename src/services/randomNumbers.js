
// Uso da biblioteca que o higão indicou, vai ter que usar ela pra gerar o tempo entre chegada e o tempo de serviçõ, 
export const generateRandom = () => {

  // var stream1 = new Random(1234);
  // return  stream1.random().exponential(2)
}



const getNormalGenerator = function() {

  return (function() {

      var oldMu, oldSigma;
      var x2, multiplier, genReady;

      return function normal(mu, sigma) {

          var x1, u1, u2, v1, v2, s;

          if ('number' !== typeof mu) {
              throw new TypeError('nextNormal: mu must be number.');
          }
          if ('number' !== typeof sigma) {
              throw new TypeError('nextNormal: sigma must be number.');
          }

          if (mu !== oldMu || sigma !== oldSigma) {
              genReady = false;
              oldMu = mu;
              oldSigma = sigma;
          }

          if (genReady) {
              genReady = false;
              return (sigma * x2) + mu;
          }

          u1 = Math.random();
          u2 = Math.random();

          v1 = (2 * u1) - 1;
          v2 = (2 * u2) - 1;

          s = (v1 * v1) + (v2 * v2);


          if (s >= 1) {
              return normal(mu, sigma);
          }

          multiplier = Math.sqrt(-2 * Math.log(s) / s);

          x1 = v1 * multiplier;
          x2 = v2 * multiplier;

          genReady = true;

          return (sigma * x1) + mu;

      };
  })();
};



export const nextExponential = function(lambda) {
  if (typeof lambda !== 'number') 
      throw new TypeError('nextExponential: lambda must be number.')
  
  if (lambda <= 0)
      throw new TypeError('nextExponential: ' + 'lambda must be greater than 0.');
  
  return - Math.log(1 - Math.random()) / lambda;
};

// for(let i = 0; i<30; i++){
//   console.log(nextExponential(0.4) * 3)
// }



 export const nextNormal = getNormalGenerator();