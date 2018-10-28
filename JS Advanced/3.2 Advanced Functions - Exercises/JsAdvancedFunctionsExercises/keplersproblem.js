function solveEquation(m, ec) {
  let pi = Math.PI;
  let K = pi / 180.0;
  let maxIter = 30;
  let i = 0;
  let delta = Math.pow(10, -9);
  let E, F;
  m = m / 360.0;
  m = (m * 180) / pi;
  m = 2.0 * pi * (m - Math.floor(m));
  if (ec < 0.8) E = m;
  else E = pi;
  F = E - ec * Math.sin(m) - m;
  while (Math.abs(F) > delta && i < maxIter) {
    E = E - F / (1.0 - ec * Math.cos(E));
    F = E - ec * Math.sin(E) - m;
    i = i + 1;
  }
  E = E / K;
  E = (E * pi) / 180;
  return (E * 1000000000) / 1000000000;
}

console.log(solveEquation(3.1415926535, 0.75));
