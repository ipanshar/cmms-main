import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useBrand } from '../../hooks/useBrand';

function Overview() {
  const navigate = useNavigate();
  const { logo } = useBrand();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [clickLocked, setClickLocked] = useState(false);

  // Показываем лендинг и затем переводим в реальный CMMS
  useEffect(() => {
    const t = setTimeout(() => navigate('/app'), 2000);
    return () => clearTimeout(t);
  }, [navigate]);

  const imgSrc = logo?.dark || '/static/images/logo/logo.jpg';

  const btnBaseStyle: React.CSSProperties = {
    padding: isMobile ? '6px 12px' : '6px 14px',
    background: 'white',
    border: '1px solid #ccc',
    borderRadius: 6,
    cursor: clickLocked ? 'not-allowed' : 'pointer',
    opacity: clickLocked ? 0.7 : 1,
    transition: 'opacity .15s ease'
  };

  const safeNavigate = (path: string) => {
    if (clickLocked) return;
    setClickLocked(true);
    navigate(path);
    setTimeout(() => setClickLocked(false), 700); // небольшой анти-дубль
  };

  return (
    <>
      <Helmet>
        <title>Shin-Line Cargo</title>
      </Helmet>
      <div
        style={{
          backgroundColor: '#fafafa',
          margin: 0,
          minHeight: '100vh',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        {/* Верхняя панель */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: isMobile ? '10px 16px' : '15px 40px'
          }}
        >
          <div>
            <button
              onClick={() => safeNavigate('/account/login')}
              disabled={clickLocked}
              style={{ ...btnBaseStyle, marginRight: 10 }}
            >
              Авторизоваться
            </button>
            <button
              onClick={() => safeNavigate('/account/register')}
              disabled={clickLocked}
              style={{ ...btnBaseStyle, marginRight: 10 }}
            >
              Зарегистрироваться
            </button>
          </div>

          <div>
            <button disabled={clickLocked} style={{ ...btnBaseStyle, marginLeft: 10 }}>
              Рус
            </button>
            <button disabled={clickLocked} style={{ ...btnBaseStyle, marginLeft: 10 }}>
              Каз
            </button>
          </div>
        </div>

        {/* Центральный контейнер */}
        <div
          style={{
            width: isMobile ? '90%' : '60%',
            margin: isMobile ? '20px auto' : '60px auto',
            background: 'white',
            padding: isMobile ? 20 : 40,
            borderRadius: 12,
            boxShadow: '0 0 10px rgba(0,0,0,0.06)',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <img
            src={imgSrc}
            alt="Shin-Line logo"
            style={{ width: isMobile ? '100%' : '80%', borderRadius: 10 }}
          />
        </div>
      </div>
    </>
  );
}

export default Overview;
