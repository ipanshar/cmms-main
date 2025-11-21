import {
  Box,
  Container,
  Button,
  styled,
  Typography,
  TextField,
  Paper,
  Tab,
  Tabs
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const AuthWrapper = styled(Box)`
  min-height: 100vh;
  background: linear-gradient(135deg, #dc2626 0%, #ffffff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const AuthPaper = styled(Paper)`
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  max-width: 450px;
  width: 100%;
  background: rgba(255, 255, 255, 0.98);
`;

const Title = styled(Typography)`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 30px;
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 20px;

  & .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: #dc2626;
    }
    &.Mui-focused fieldset {
      border-color: #dc2626;
    }
  }

  & .MuiInputLabel-root.Mui-focused {
    color: #dc2626;
  }
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
  color: white;
  padding: 12px;
  border-radius: 10px;
  font-weight: 600;
  text-transform: none;
  font-size: 16px;
  width: 100%;
  margin-top: 10px;
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);

  &:hover {
    background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%);
    box-shadow: 0 6px 20px rgba(220, 38, 38, 0.4);
  }
`;

const BackButton = styled(Button)`
  color: #dc2626;
  text-transform: none;
  margin-top: 15px;
  width: 100%;

  &:hover {
    background: rgba(220, 38, 38, 0.05);
  }
`;

const StyledTabs = styled(Tabs)`
  margin-bottom: 30px;
  
  & .MuiTabs-indicator {
    background-color: #dc2626;
  }
`;

const StyledTab = styled(Tab)`
  text-transform: none;
  font-size: 16px;
  font-weight: 600;
  color: #6b7280;

  &.Mui-selected {
    color: #dc2626;
  }
`;

function Auth() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', loginData);
    // Здесь добавить логику входа
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register:', registerData);
    // Здесь добавить логику регистрации
  };

  return (
    <AuthWrapper>
      <Helmet>
        <title>Вход / Регистрация - Шинлайн</title>
      </Helmet>
      
      <Container maxWidth="sm">
        <AuthPaper elevation={3}>
          <Title>ШИНЛАЙН</Title>
          
          <StyledTabs value={activeTab} onChange={handleTabChange} centered>
            <StyledTab label="Вход" />
            <StyledTab label="Регистрация" />
          </StyledTabs>

          {activeTab === 0 ? (
            <form onSubmit={handleLogin}>
              <StyledTextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
              <StyledTextField
                fullWidth
                label="Пароль"
                type="password"
                variant="outlined"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
              <SubmitButton type="submit">
                Войти
              </SubmitButton>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <StyledTextField
                fullWidth
                label="Имя"
                variant="outlined"
                value={registerData.name}
                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                required
              />
              <StyledTextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                required
              />
              <StyledTextField
                fullWidth
                label="Пароль"
                type="password"
                variant="outlined"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                required
              />
              <StyledTextField
                fullWidth
                label="Подтвердите пароль"
                type="password"
                variant="outlined"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                required
              />
              <SubmitButton type="submit">
                Зарегистрироваться
              </SubmitButton>
            </form>
          )}

          <BackButton onClick={() => navigate('/')}>
            ← Вернуться на главную
          </BackButton>
        </AuthPaper>
      </Container>
    </AuthWrapper>
  );
}

export default Auth;
