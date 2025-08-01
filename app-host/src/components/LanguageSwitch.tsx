import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const StyledWrapper = styled.div`
  .btn-container {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .btn-color-mode-switch {
    display: inline-block;
    position: relative;
  }

  .btn-color-mode-switch > label.btn-color-mode-switch-inner {
    width: 110px;
    height: 32px;
    background-color: #ffffff;
    border-radius: 50px;
    overflow: hidden;
    position: relative;
    transition: all 0.3s ease;
    display: block;
    font-family: inherit;
  }

  .btn-color-mode-switch > label.btn-color-mode-switch-inner:before {
    content: attr(data-on);
    position: absolute;
    font-size: 14px;
    font-weight: 600;
    top: 7px;
    right: 14px;
    color: #00305b;
  }

  .btn-color-mode-switch > label.btn-color-mode-switch-inner:after {
    content: attr(data-off);
    width: 50px;
    height: 24px;
    background: #00305b;
    border-radius: 50px;
    position: absolute;
    font-size: 13px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 2px;
    top: 4px;
    transition: all 0.3s ease;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    color: #fff;
  }

  .btn-color-mode-switch input[type='checkbox'] {
    cursor: pointer;
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    margin: 0;
    z-index: 2;
  }

  .btn-color-mode-switch input[type='checkbox']:checked + label.btn-color-mode-switch-inner {
    background-color: #ffffff;
  }

  .btn-color-mode-switch input[type='checkbox']:checked + label.btn-color-mode-switch-inner:after {
    content: attr(data-on);
    left: 56px;
    background-color: #00305b;
  }

  .btn-color-mode-switch input[type='checkbox']:checked + label.btn-color-mode-switch-inner:before {
    content: attr(data-off);
    right: auto;
    left: 14px;
  }
`;

const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';

  const toggleLang = () => {
    const newLang = isSpanish ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <StyledWrapper>
      <div className="btn-container">
        <label className="switch btn-color-mode-switch">
          <input
            type="checkbox"
            id="lang-switch"
            checked={!isSpanish}
            onChange={toggleLang}
          />
          <label
            className="btn-color-mode-switch-inner"
            data-off="ES"
            data-on="EN"
            htmlFor="lang-switch"
          />
        </label>
      </div>
    </StyledWrapper>
  );
};

export default LanguageSwitch;
