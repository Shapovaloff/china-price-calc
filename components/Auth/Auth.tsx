import React, { useState, useLayoutEffect } from 'react';
import Button from '../ui/Button/Button';
import styles from './Auth.module.scss';
import { AuthProps } from './Auth.interface';
import sha256 from 'crypto-js/sha256';
import InputText from '../ui/InputText/InputText';

const LIST = [
  'f240c4922b831c7bb5f23ff2cec13036242f53e64a4ed70d985fc4f611cc28f0',
  '21d536967913e70219e568e3f57c17238df4091170b6b91421d81f6d678b8fb6',
  'a0e074992ed7c7efd3b15275f4e817559e4cf8bac2508aa39e74a79b8aad0691',
  '9549053bbaef4d0c5d8fcfcb5ef64146fb0d41b9c37667ab058575253267e5f4',
  '5d4f79ed2ad29c9771b40f9adb78dd5389cb91af127c44c3499d63fce0c644af',
  '532e2c8c5a435647212cfdbeaaa85f3842445ba82c61647f0b51c661caf05343',
  '39bd2cd80246f59ce83a4d978b0e52d155430fe5ad5dec09c64ef8dbddf4fe87',
  'be20cd9364ad790dcb5c5c4824fc3884893f6b50ce75f29a85dc34b49459c94d',
  '793438cc4102b418ed584412c959a7b738e886b1a6508543da657e7ad01c94f1',
  'a5ce7d88a69df16e837d4a08efb84a373d323a33aa8ac0678498ad4d33f8c020',
];

function Auth({ onAuthSuccess }: AuthProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useLayoutEffect(() => {
    const saved = localStorage.getItem('chinaCalcPassword');
    if (saved && LIST.includes(saved)) {
      onAuthSuccess();
    }
    setIsAuthChecked(true);
  }, [onAuthSuccess]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const hash = sha256(password.trim()).toString();
    if (LIST.includes(hash)) {
      localStorage.setItem('chinaCalcPassword', hash);
      setError('');
      onAuthSuccess();
    } else {
      setError('Неверный пароль');
    }
  };

  const handlePasswordChange = (_: string, value: string | number) => {
    setPassword(String(value).trim());
    if (error) setError('');
  };

  if (!isAuthChecked) return null;

  return (
    <div className={styles['auth']}>
      <div className={styles['auth__container']}>
        <form onSubmit={handleAuth} className={styles['auth__form']}>
          <p className={styles['auth__title']}>Вход в калькулятор</p>
          <div className={styles['auth__input-block']}>
            <InputText
              label="Введите пароль"
              name="password"
              onChangeInput={handlePasswordChange}
              iconName="lock"
              type="password"
              value={password}
              maxLength={16}
            />
            <div className={styles['auth__error-container']}>
              {error && <p className={styles['auth__error']}>{error}</p>}
            </div>
          </div>
          <Button disabled={!password} type="submit">
            Войти
          </Button>
          <p className={styles['auth__info']}>
            Информация о пароле -{' '}
            <a
              href="https://t.me/unboxing_china/50"
              rel="noopener noreferrer"
              target="_blank"
            >
              в этой группе
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Auth;
