const API_URL =
  'https://script.google.com/macros/s/AKfycbwWBVOHruF9r4I_rz9w94irSclWc_khPBa9ABCzg_Xn-heCUB62ouGHLCjDMVr7LAPPKA/exec';

/**
 * Requests current position. Returns `{ ok, location }` with `lat,lng` when successful; otherwise `location` is ''.
 */
function requestLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ ok: false, location: '', reason: 'unsupported' });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const lat = typeof latitude === 'number' ? latitude.toFixed(6) : String(latitude);
        const lng = typeof longitude === 'number' ? longitude.toFixed(6) : String(longitude);
        const location = `${lat},${lng}`;
        resolve({ ok: true, location });
      },
      () => {
        resolve({ ok: false, location: '', reason: 'error' });
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 },
    );
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('contact-status');

  if (!form) return;

  let iframe = document.getElementById('contact-form-iframe');
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.id = 'contact-form-iframe';
    iframe.name = 'contact-form-iframe';
    iframe.setAttribute('style', 'position:absolute;width:0;height:0;border:0;visibility:hidden');
    document.body.appendChild(iframe);
  }

  function setStatus(text, type) {
    if (statusEl) {
      statusEl.textContent = text;
      const base = type === 'success' ? 'mt-2 text-base font-medium' : 'mt-2 text-sm';
      const color =
        type === 'error' ? 'text-error' : type === 'success' ? 'text-success' : 'text-info';
      statusEl.className = base + ' ' + color;
    } else {
      alert(text);
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.elements['name']?.value?.trim();
    const phone = form.elements['phone']?.value?.trim();
    const email = form.elements['email']?.value?.trim();
    const message = form.elements['message']?.value?.trim();

    const hasContact = !!(phone || email);
    if (!name || !message) {
      setStatus('Please enter your Name and Message.', 'error');
      return;
    }
    if (!hasContact) {
      setStatus('Please enter at least one of Phone or Email.', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    const locResult = await requestLocation();
    const location = locResult.ok && locResult.location ? locResult.location : '';

    setStatus('Sending, please wait...', 'info');

    const successMessage = 'Message sent successfully. I will contact you as soon as possible.';

    const hiddenForm = document.createElement('form');
    hiddenForm.method = 'POST';
    hiddenForm.action = API_URL;
    hiddenForm.target = 'contact-form-iframe';
    hiddenForm.style.display = 'none';

    const fields = [
      ['name', name],
      ['phone', phone],
      ['email', email],
      ['message', message],
      ['location', location],
    ];
    fields.forEach(([n, v]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = n;
      input.value = v;
      hiddenForm.appendChild(input);
    });

    document.body.appendChild(hiddenForm);

    const finish = () => {
      if (hiddenForm.parentNode) hiddenForm.remove();
      if (submitBtn) submitBtn.disabled = false;
    };

    const onIframeLoad = () => {
      clearTimeout(fallbackTimer);
      finish();
      setStatus(successMessage, 'success');
      form.reset();
      iframe.removeEventListener('load', onIframeLoad);
    };

    iframe.addEventListener('load', onIframeLoad);
    const fallbackTimer = setTimeout(() => {
      finish();
      setStatus(successMessage, 'success');
      form.reset();
      iframe.removeEventListener('load', onIframeLoad);
    }, 3000);

    hiddenForm.submit();
  });
});
