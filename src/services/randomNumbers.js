export const generateRandom = () => {

  var stream1 = new Random(1234);
  return  stream1.random().exponential(2)
}