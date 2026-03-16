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

    // Require Name, Message, and at least one of Phone or Email
    const hasContact = !!(phone || email);
    if (!name || !message) {
      setStatus('Please enter your Name and Message.', 'error');
      return;
    }
    if (!hasContact) {
      setStatus('Please enter at least one of Phone or Email.', 'error');
      return;
    }

    function setStatus(text, type) {
      if (statusEl) {
        statusEl.textContent = text;
        const base = type === 'success' ? 'mt-2 text-base font-medium' : 'mt-2 text-sm';
        const color = type === 'error' ? 'text-error' : type === 'success' ? 'text-success' : 'text-info';
        statusEl.className = base + ' ' + color;
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

    const successMessage = 'Message sent successfully. I will contact you as soon as possible.';

    const onIframeLoad = () => {
      hiddenForm.remove();
      setStatus(successMessage, 'success');
      form.reset();
      iframe.removeEventListener('load', onIframeLoad);
    };

    iframe.addEventListener('load', onIframeLoad);
    setTimeout(() => {
      if (hiddenForm.parentNode) {
        hiddenForm.remove();
        setStatus(successMessage, 'success');
        form.reset();
      }
    }, 3000);

    hiddenForm.submit();
  });
});

