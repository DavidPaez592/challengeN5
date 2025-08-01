import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from './LanguageSwitch';

const NavbarWrapper = styled.nav.attrs(() => ({ className: 'navbar' }))`
  background-color: #00305b;
  color: white;
  height: 80px;
  padding: 0 2rem;
  position: fixed; /* <-- Cambiado */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Para que quede por encima de todo */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const BackButton = styled.button`
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;


const Title = styled.h1.attrs(() => ({ className: 'navbar__title' }))`
  margin: 0;
  font-size: 1.5rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const LanguageSwitchWrapper = styled.div`
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
`;

type NavbarProps = {
  activeMicro: string | null;
  setActiveMicro: (val: null) => void;
};

const Navbar = ({ activeMicro, setActiveMicro }: NavbarProps) => {
  const { t } = useTranslation();

  return (
    <NavbarWrapper>
      {activeMicro && (
        <BackButton onClick={() => setActiveMicro(null)}>← {t('back')}</BackButton>
      )}
      <Title>{t('navbar.title')}</Title>
      <LanguageSwitchWrapper>
        <LanguageSwitch />
      </LanguageSwitchWrapper>
    </NavbarWrapper>
  );
};



export default Navbar;
