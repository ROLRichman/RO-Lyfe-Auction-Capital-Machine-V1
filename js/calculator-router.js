window.ROLyfeCalculatorRouter = (() => {
  function available() {
    return Object.keys(window.ROLyfeCalculators || {});
  }
  function calculate(id, inputs) {
    const calc = window.ROLyfeCalculators?.[id];
    if (!calc || typeof calc.calculate !== "function") {
      throw new Error(`Calculator not registered: ${id}`);
    }
    return calc.calculate(inputs || {});
  }
  return { available, calculate };
})();
