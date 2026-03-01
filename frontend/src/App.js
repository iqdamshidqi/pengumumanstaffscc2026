  import React, { useState, useRef } from 'react';
  import './App.css';
  import logoScc from './assets/logo.png';
  import dataStaff from './data_lolos.json';
  import Confetti from 'react-confetti';

  const WHATSAPP_LINK = 'https://forms.gle/iwqXRaWjSesgAdZz7';

  const App = () => {
    const [nrp, setNrp] = useState('');
    const [status, setStatus] = useState('idle');
    const [result, setResult] = useState(null);
    const inputRef = useRef(null);

    const handleCheck = () => {
      if (!nrp.trim()) {
        alert('Mohon masukkan NRP terlebih dahulu!');
        return;
      }
      
      setStatus('loading');
      setResult(null);

      setTimeout(() => {
        const foundUser = dataStaff.find(user => user.nrp === nrp.trim());

        if (foundUser) {
          setResult({
            nama: foundUser.nama,
            posisi: foundUser.posisi,
            dress: foundUser.dress || 'Bebas Sopan & Rapi',
            lolos: true,
            nrp: foundUser.nrp,
            time: new Date().toLocaleTimeString('id-ID')
          });
        } else {
          setResult({
            nama: "NRP Tidak Ditemukan",
            lolos: false,
            nrp: nrp.trim(),
            time: new Date().toLocaleTimeString('id-ID')
          });
        }
        
        setStatus('idle');
        setNrp('');
      }, 800);
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && status !== 'loading') {
        handleCheck();
      }
    };

    const handleClear = () => {
      setNrp('');
      setResult(null);
      inputRef.current?.focus();
    };

    return (
      <div className="main-background">
        {result && status === 'idle' && result.lolos && (
          <Confetti
            recycle={false}
            numberOfPieces={500}
            gravity={0.15}
          />
        )}
        <a
          href = {WHATSAPP_LINK} 
          target = '_blank'
          rel = 'noopener noreferrer'
          className = "whatsapp-fab"
          title = "Join Grup Komunal SCC 2026">
        </a>
        <div className="logo-container">
          <img src={logoScc} alt="Logo SCC" className="main-logo" />
        </div>

        <div className="glass-container">
          <header>
            <h1 className="title">SCC 2026</h1>
            <p className="subtitle">Cek Status Penerimaan Staff</p>
          </header>

          <div className="input-box">
            <input 
              ref={inputRef}
              type="text" 
              placeholder="Ketik NRP Anda..." 
              value={nrp}
              onChange={(e) => setNrp(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={status === 'loading'}
              autoComplete="off"
              maxLength="20"
            />
            <button 
              onClick={handleCheck} 
              className="btn-glow" 
              disabled={status === 'loading'}
              aria-label="Cek Status"
            >
              {status === 'loading' ? "Memproses..." : "Cek Sekarang"}
            </button>
          </div>

          <div className="display-area">
            {status === 'loading' && <div className="spinner"></div>}

            {result && status === 'idle' && (
              <>
                <div className={`card-announcement ${result.lolos ? 'lolos' : 'gagal'} scale-in`}>
                  <div className="msg-content">
                    {result.lolos ? (
                      <>
                        <h3 className="congrats">SELAMAT!</h3>
<h2 className="name-display">{result.nama}</h2>
<p className="nrp-info">NRP: <strong>{result.nrp}</strong></p>
<p className="caption">Kamu resmi menjadi bagian dari Staff SCC 2026! 🥳</p>
<p className="caption">Terima kasih telah memilih SCC. Mari kita bertumbuh, berkontribusi, dan berkolaborasi bersama keluarga besar ini.</p>

{/* Seksie Pengumuman BUBAR */}
<div className="bubar-announcement" style={{ marginTop: '20px', padding: '15px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
    <h4 style={{ color: '#FFFFFF', marginBottom: '8px', fontSize: '1.1rem' }}>AGENDA SELANJUTNYA: SCC BUBAR</h4>
    <p style={{ fontSize: '14px', marginBottom: '10px', color: '#E0E0E0' }}>
        Gak perlu nunggu lama buat kenalan! Yuk hadir di acara <strong style={{ color: '#FFFFFF' }}>Buka Bersama SCC</strong>:
    </p>
    <ul style={{ textAlign: 'left', fontSize: '14px', listStyleType: 'none', padding: 0 }}>
        <li>📍 <strong>Lokasi:</strong> <a href="https://maps.app.goo.gl/RHyptX2ErPqvgGdX8" target="_blank" rel="noopener noreferrer">Uptown</a></li>
        <li>⏰ <strong>Waktu:</strong> 14:30 WIB - Selesai</li>
        <li>👕 <strong>Dress Code:</strong> {result.dress}</li>
    </ul>
</div>

<a 
    href={WHATSAPP_LINK}
    target='_blank'
    rel='noopener noreferrer'
    className="btn-whatsapp"
    style={{ marginTop: '20px' }}
>
    Link RSVP
</a>
                      </>
                    ) : (
                      <>
                        <h3 style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', marginBottom: '12px' }}> 💓 Mohon maaf, kamu belum berhasil menjadi bagian dari Staf SCC 2026 💓</h3>
                        <p className="caption">Terima kasih atas antusiasme selama proses seleksi.</p>
                        <p className="caption">Kami percaya masih banyak tempat di luar sana untuk kamu bertumbuh dan bersinar, tetap semangat. 🌱✨</p>
                      </>
                    )}
                  </div>
                </div>
                <button 
                  onClick={handleClear}
                  style={{
                    marginTop: '16px',
                    padding: '10px 20px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-light)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    fontWeight: '500',
                    fontFamily: 'Helvetica'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.color = 'var(--text-main)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.target.style.color = 'var(--text-secondary)';
                  }}
                >
                  Cek Lagi
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default App;