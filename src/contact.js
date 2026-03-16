const API_URL = 'https://script.google.com/macros/s/AKfycbxbuYWIwTx8fRMRNv--qc484v3FXxXjCLOo9yoXMnq8SnfpcfcykWjJebXVN2e8u_-MCw/exec';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('contact-status');

  if (!form) return;

  // Hidden iframe to receive response from Google Apps Script (avoid CORS issues with fetch)
  let iframe = document.getElementById('contact-form-iframe');
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.id = 'contact-form-iframe';
    iframe.name = 'contact-form-iframe';
    iframe.setAttribute('style', 'position:absolute;width:0;height:0;border:0;visibility:hidden');
    document.body.appendChild(iframe);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.elements['name']?.value?.trim();
    const phone = form.elements['phone']?.value?.trim();
    const email = form.elements['email']?.value?.trim();
    const message = form.elements['message']?.value?.trim();

    // Only require Name and Message, allow Phone / Email to be empty
    if (!name || !message) {
      setStatus('Please enter at least your Name and Message.', 'error');
      return;
    }

    function setStatus(text, type) {
      if (statusEl) {
        statusEl.textContent = text;
        statusEl.className = 'mt-2 text-sm ' + (type === 'error' ? 'text-error' : type === 'success' ? 'text-success' : 'text-info');
      } else {
        alert(text);
      }
    }

    setStatus('Sending, please wait...', 'info');

    // Create a hidden form to POST to Google Apps Script (send via iframe to avoid CORS)
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('message', message);

    const hiddenForm = document.createElement('form');
    hiddenForm.method = 'POST';
    hiddenForm.action = API_URL;
    hiddenForm.target = 'contact-form-iframe';
    hiddenForm.style.display = 'none';

    const names = ['name', 'phone', 'email', 'message'];
    const values = [name, phone, email, message];
    names.forEach((n, i) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = n;
      input.value = values[i];
      hiddenForm.appendChild(input);
    });

    document.body.appendChild(hiddenForm);

    // Google Apps Script usually returns a redirect or HTML; can't be read from iframe due to cross-origin
    // Treat as success once the form has been submitted
    const onIframeLoad = () => {
      hiddenForm.remove();
      setStatus('Message sent successfully. Thank you for reaching out!', 'success');
      form.reset();
      iframe.removeEventListener('load', onIframeLoad);
    };

    iframe.addEventListener('load', onIframeLoad);
    // Fallback: if iframe doesn't fire load in some environments, still show success after 3s
    setTimeout(() => {
      if (hiddenForm.parentNode) {
        hiddenForm.remove();
        setStatus('Message sent successfully. Thank you for reaching out!', 'success');
        form.reset();
      }
    }, 3000);

    hiddenForm.submit();
  });
});

