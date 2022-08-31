const colorSetup = (h, s, b) => {
  const rgb = (col) => {
    const k = (n) => (n + col.h / 60) % 6;
    const f = (n) =>
      col.b - col.b * col.s * Math.max(0, Math.min(k(n), 4 - k(n), 1));

    let r = Math.round(255 * f(5));
    let g = Math.round(255 * f(3));
    let b = Math.round(255 * f(1));

    //#hex string.
    let rH =
      r < 16
        ? '0' + r.toString(16).toUpperCase()
        : r.toString(16).toUpperCase();

    let gH =
      g < 16
        ? '0' + g.toString(16).toUpperCase()
        : g.toString(16).toUpperCase();

    let bH =
      b < 16
        ? '0' + b.toString(16).toUpperCase()
        : b.toString(16).toUpperCase();

    //determine contrast color between black and white. http://alienryderflex.com/hsp.html
    const hsp = 0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b);
    let contrast = hsp > 16256 ? '#000' : '#fff';

    return {
      r: r,
      g: g,
      b: b,
      hex: '#' + rH + gH + bH,
      contrast: contrast,
    };
  };

  const hsb = { h: Math.round(h), s: Math.round(s), b: Math.round(b) };
  const nHsb = { h: Math.round(h), s: s / 100, b: b / 100 }; //normalized hsb.

  const getRange = () => {
    if (h > 345 && h <= 360) {
      return 0;
    }
    for (let i = 0; i < 12; i++) {
      if (h <= 15 + 30 * i) {
        return i;
      }
    }
  };

  return {
    hsb: hsb,
    rgb: rgb(nHsb),
    range: getRange(),
  };
};

export default colorSetup;
