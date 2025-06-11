document.addEventListener('DOMContentLoaded', function () {
  const inputEl = document.getElementById('latex-input');
  const btn = document.getElementById('render-btn');
  const resultEl = document.getElementById('result');
  const incFontBtn = document.getElementById('increase-font');
  const decFontBtn = document.getElementById('decrease-font');

  let fontSize = 1.5;

  function renderLatex() {
    const code = inputEl.value.trim();
    if (code === '') {
      resultEl.innerHTML = '<p style="color:#666;">(No input)</p>';
      return;
    }
    const wrapped = '\\[' + code + '\\]';
    resultEl.textContent = wrapped;
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise([resultEl]).catch((err) => {
        console.error('MathJax error:', err);
      });
    }
  }

  btn.addEventListener('click', renderLatex);

  inputEl.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') btn.click();
  });

  incFontBtn.addEventListener('click', () => {
    fontSize += 0.2;
    resultEl.style.fontSize = `${fontSize}em`;
  });

  decFontBtn.addEventListener('click', () => {
    fontSize = Math.max(0.6, fontSize - 0.2);
    resultEl.style.fontSize = `${fontSize}em`;
  });
});
