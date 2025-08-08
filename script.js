AOS.init();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const presensiForm = document.querySelector('form[name="presensi-form"]');
if (presensiForm) {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz4ILz8bRbadkZbFJ4gNfZgujZJerntXq-HLR4TspW3vJKMLkiHppgBUyxpU5SLltVeDw/exec';

    presensiForm.addEventListener('submit', e => {
        e.preventDefault();

        const nama = presensiForm.elements['NamaLengkap'].value.trim();
        const alamat = presensiForm.elements['Alamat'].value.trim();
        const kegiatan = presensiForm.elements['NamaKegiatan'].value;
        const kehadiran = presensiForm.elements['StatusKehadiran'].value;

        if (!/^[A-Za-z\s]{3,}$/.test(nama)) {
            alert('Nama harus minimal 3 huruf dan hanya mengandung huruf dan spasi.');
            return;
        }
        if (alamat.length < 5) {
            alert('Alamat harus minimal 5 karakter.');
            return;
        }
        if (!kegiatan) {
            alert('Silahkan pilih kegiatan.');
            return;
        }
        if (!kehadiran) {
            alert('Silahkan pilih status kehadiran.');
            return;
        }

        const submitButton = presensiForm.querySelector('button[type="submit"]');
        const btnText = submitButton.querySelector('.btn-text');
        const loader = submitButton.querySelector('.loader');

        submitButton.disabled = true;
        btnText.textContent = 'Mengirim...';
        loader.classList.remove('hidden');

        fetch(scriptURL, { method: 'POST', body: new FormData(presensiForm) })
            .then(response => {
                alert('Terima kasih! Presensi Anda telah berhasil direkam.');
                btnText.textContent = 'Terkirim!';
                loader.classList.add('hidden');
                submitButton.disabled = false;
                presensiForm.reset();

                setTimeout(() => {
                    btnText.textContent = 'Kirim Presensi';
                }, 2000);
            })
            .catch(error => {
                alert('Maaf, terjadi kesalahan. Silahkan coba lagi.');
                btnText.textContent = 'Kirim Ulang';
                loader.classList.add('hidden');
                submitButton.disabled = false;
            });
    });
}

// Show bottom navbar only after user scroll down a bit
document.addEventListener('DOMContentLoaded', function() {
  const bottomNav = document.querySelector('.mobile-bottom-nav');
  let lastScrollY = window.scrollY;

  function showHideBottomNav() {
    // Muncul jika sudah scroll 60px ke bawah
    if (window.scrollY > 60) {
      bottomNav.classList.add('mobile-bottom-nav--show');
    } else {
      bottomNav.classList.remove('mobile-bottom-nav--show');
    }
  }

  // Jalankan saat scroll dan saat pertama kali load
  window.addEventListener('scroll', showHideBottomNav);
  showHideBottomNav();
});
