AOS.init();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

    if (!/^[A-Za-z\s]{3,}$/.test(nama)) { alert('Nama harus minimal 3 huruf dan hanya mengandung huruf dan spasi.'); return; }
    if (alamat.length < 5) { alert('Alamat harus minimal 5 karakter.'); return; }
    if (!kegiatan) { alert('Silahkan pilih kegiatan.'); return; }
    if (!kehadiran) { alert('Silahkan pilih status kehadiran.'); return; }

    const submitButton = presensiForm.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const loader = submitButton.querySelector('.loader');

    submitButton.disabled = true;
    btnText.textContent = 'Mengirim...';
    loader.classList.remove('hidden');

    fetch(scriptURL, { method: 'POST', body: new FormData(presensiForm) })
      .then(() => {
        alert('Terima kasih! Presensi Anda telah berhasil direkam.');
        btnText.textContent = 'Terkirim!';
        loader.classList.add('hidden');
        submitButton.disabled = false;
        presensiForm.reset();
        setTimeout(() => { btnText.textContent = 'Kirim Presensi'; }, 2000);
      })
      .catch(() => {
        alert('Maaf, terjadi kesalahan. Silahkan coba lagi.');
        btnText.textContent = 'Kirim Ulang';
        loader.classList.add('hidden');
        submitButton.disabled = false;
      });
  });
}

// Tampilkan bottom navbar hanya setelah user scroll 60px
document.addEventListener('DOMContentLoaded', function() {
  const bottomNav = document.querySelector('.mobile-bottom-nav');

  function showHideBottomNav() {
    if (!bottomNav) return;
    if (window.scrollY > 60) {
      bottomNav.classList.add('mobile-bottom-nav--show');
    } else {
      bottomNav.classList.remove('mobile-bottom-nav--show');
    }
  }

  window.addEventListener('scroll', showHideBottomNav);
  showHideBottomNav();
});


function toggleMobileMenu() {
}
document.addEventListener('DOMContentLoaded', () => {
  const links = [...document.querySelectorAll('.mobile-bottom-nav .nav-btn')];
  const map = new Map(links.map(a => [a.getAttribute('href'), a]));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(a => a.classList.remove('is-active'));
        const key = '#' + entry.target.id;
        const active = map.get(key);
        if (active) active.classList.add('is-active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  ['beranda','kelas','pojok-literasi','galeri','lokasi-desa','kontak']
    .forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
});
