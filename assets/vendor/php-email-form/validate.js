/**
* Contact Form Handler - WhatsApp & Email Integration
* Developed for Personal Portfolio
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();
      handleFormSubmit(this, 'whatsapp');
    });

    let btnEmail = e.querySelector('#btn-email');
    if (btnEmail) {
      btnEmail.addEventListener('click', function(event) {
        event.preventDefault();
        handleFormSubmit(e, 'email');
      });
    }
  });

  function handleFormSubmit(thisForm, method) {
    let nameInput = thisForm.querySelector('input[name="name"]');
    let emailInput = thisForm.querySelector('input[name="email"]');
    let subjectInput = thisForm.querySelector('input[name="subject"]');
    let messageInput = thisForm.querySelector('textarea[name="message"]');

    let name = nameInput ? nameInput.value.trim() : '';
    let email = emailInput ? emailInput.value.trim() : '';
    let subject = subjectInput ? subjectInput.value.trim() : '';
    let message = messageInput ? messageInput.value.trim() : '';

    if (!name || !email || !subject || !message) {
      displayError(thisForm, 'Harap lengkapi semua kolom formulir.');
      return;
    }

    let loading = thisForm.querySelector('.loading');
    let errorMessage = thisForm.querySelector('.error-message');
    let sentMessage = thisForm.querySelector('.sent-message');

    if (loading) {
      loading.innerHTML = 'Memproses pesan...';
      loading.classList.add('d-block');
    }
    if (errorMessage) errorMessage.classList.remove('d-block');
    if (sentMessage) sentMessage.classList.remove('d-block');

    const phone = '628976398024';
    const targetEmail = 'rikojpr7@gmail.com';

    setTimeout(function() {
      if (loading) loading.classList.remove('d-block');

      if (method === 'email') {
        const mailtoSubject = encodeURIComponent(`${subject} - dari ${name}`);
        const mailtoBody = encodeURIComponent(`Halo Riko,\n\nNama: ${name}\nEmail: ${email}\nSubjek: ${subject}\n\nPesan:\n${message}\n`);
        const mailtoUrl = `mailto:${targetEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

        window.location.href = mailtoUrl;

        if (sentMessage) {
          sentMessage.innerHTML = 'Membuka aplikasi email... Pesan berhasil disiapkan untuk dikirim ke <strong>' + targetEmail + '</strong>. Terima kasih!';
          sentMessage.classList.add('d-block');
        }
      } else {
        // WhatsApp
        const waText = encodeURIComponent(
          `*Pesan Baru dari Portofolio*\n` +
          `----------------------------------\n` +
          `*Nama:* ${name}\n` +
          `*Email:* ${email}\n` +
          `*Subjek:* ${subject}\n\n` +
          `*Pesan:*\n${message}`
        );
        const waUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${waText}`;

        window.open(waUrl, '_blank');

        if (sentMessage) {
          sentMessage.innerHTML = 'Pesan Anda berhasil disiapkan dan diteruskan ke WhatsApp! Terima kasih telah menghubungi saya.';
          sentMessage.classList.add('d-block');
        }
      }

      thisForm.reset();
    }, 400);
  }

  function displayError(thisForm, error) {
    let loading = thisForm.querySelector('.loading');
    let errorMessage = thisForm.querySelector('.error-message');
    if (loading) loading.classList.remove('d-block');
    if (errorMessage) {
      errorMessage.innerHTML = error;
      errorMessage.classList.add('d-block');
    }
  }

})();
