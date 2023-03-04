const textarea = document.getElementById('textbox');

textarea.addEventListener('input', () => {
  textarea.style.height = '35px';
  textarea.style.height = `${textarea.scrollHeight}px`;
});
