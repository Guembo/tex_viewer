document.addEventListener('DOMContentLoaded', function() {
  const inputEl = document.getElementById('latex-input');
  const btn = document.getElementById('render-btn');
  const resultEl = document.getElementById('result');

  btn.addEventListener('click', () => {
    const code = inputEl.value.trim();
    if (code === '') {
      resultEl.innerHTML = '<p style="color:#666;">(No input)</p>';
      return;
    }
    // Wrap in display math environment:
    // You can choose \[...\] or $$...$$, here we use \[ \]
    const wrapped = '\\[' + code + '\\]';
    // Set as text so MathJax can parse
    resultEl.textContent = wrapped;
    // Ask MathJax to typeset this element
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise([resultEl]).catch((err) => {
        console.error('MathJax typeset error:', err);
      });
    }
  });

  // Optionally: render on Ctrl+Enter in textarea
  inputEl.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      btn.click();
    }
  });
});
