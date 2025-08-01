import React, { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import { GlobalStyle } from './styles/global';
import { motion, AnimatePresence } from 'framer-motion';

const Wrapper = styled.div.attrs(() => ({ className: 'app-host' }))`
  padding: 2rem;
  padding-top: 100px;
  max-width: 1200px;
  margin: 0 auto;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: stretch;
  margin-top: 3rem;
`;

const CardContainer = styled.div`
  perspective: 1000px;
  width: 220px;
  height: 320px; /* Más alto */
`;

const CardButton = styled.button<{ variant?: string | null }>`
  width: 100%;
  height: 100%;
  position: relative;
  background: none;
  border: none;
  perspective: 1000px;
  cursor: pointer;
  outline: none;
  background-color: transparent;
`;

const CardInner = styled.div<{ 'data-flipped'?: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;

  ${({ 'data-flipped': flipped }) =>
    flipped && 'transform: rotateY(180deg);'}
`;


const CardFace = styled.div<{ variant?: string | null }>`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: #ffffff;
  border: 3px solid
    ${({ variant }) =>
    variant === 'rick' ? '#0cf' :
      variant === 'dbz' ? '#ffcc00' :
        variant === 'anime' ? '#ff2f6d' :
          variant === 'harry' ? '#7633ff' : '#00305b'};
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  padding: 0; /* Sin padding, borde más pegado */
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    font-size: 1.05rem;
    color: #00305b;
    padding: 0.6rem 0;
    background-color: #fff;
    font-weight: 600;
  }

  img {
    width: 100%;
    height: 240px; /* Más alta */
    object-fit: cover;
    border-radius: 0 0 12px 12px;
    border-top: 1px solid #eee;
  }
`;


const CardBack = styled(CardFace)`
  background-color: #ffe3ec;
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-size: 0.9rem;
  color: #333;
`;

const ProgressBar = styled.div`
  position: relative;
  height: 4px;
  width: 100%;
  background-color: #f3f3f3;
  overflow: hidden;
  margin-top: 2rem;

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 30%;
    background-color: #00305b;
    animation: slideRight 0.8s linear infinite;
  }

  @keyframes slideRight {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(300%);
    }
  }
`;



const Section = styled.section`
  margin-top: 2rem;
`;

const CharacterListRick = React.lazy(() => import('mfe-rick/CharacterList'));
const CharacterListDbz = React.lazy(() => import('mfe-dbz/CharacterList'));
const CharacterListAnime = React.lazy(() => import('mfe-anime/CharacterList'));
const CharacterListHarry = React.lazy(() => import('mfe-harry/CharacterList'));

type Microfrontend = 'rick' | 'dbz' | 'anime' | 'harry' | null;

const App = () => {
  const { t } = useTranslation();
  const [activeMicro, setActiveMicro] = useState<Microfrontend>(null);
  const [flipped, setFlipped] = useState<Microfrontend | null>(null);

  const renderMicrofrontend = () => {
    switch (activeMicro) {
      case 'rick':
        return <CharacterListRick />;
      case 'dbz':
        return <CharacterListDbz />;
      case 'anime':
        return <CharacterListAnime />;
      case 'harry':
        return <CharacterListHarry />;
      default:
        return null;
    }
  };

  const handleFlip = (card: Microfrontend, value: boolean) => {
    setFlipped(value ? card : null);
  };

  return (
    <>
      <GlobalStyle />
      <Navbar activeMicro={activeMicro} setActiveMicro={setActiveMicro} />

      <Wrapper>
        <AnimatePresence mode="wait">
          {!activeMicro ? (
            <motion.div
              key="cards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem' }}>
                {t('home.description')}
              </p>
              <CardGrid>
                {(['anime', 'rick', 'dbz', 'harry'] as Microfrontend[]).map((key) => (
                  <CardContainer
                    key={key}
                    onMouseEnter={() => handleFlip(key, true)}
                    onMouseLeave={() => handleFlip(key, false)}
                  >
                    <CardButton variant={key} onClick={() => setActiveMicro(key)}>
                      <CardInner data-flipped={flipped === key}>
                        <CardFace variant={key}>
                          <img
                            src={
                              key === 'anime'
                                ? 'https://pinkappicons.com/wp-content/uploads/2025/05/Demon-Slayer-Wallpaper-Tanjiro-Surrounded-by-Flames.webp'
                                : key === 'rick'
                                  ? 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2021/06/rick-morty-2381623.jpg'
                                  : key === 'dbz'
                                    ? 'https://i.pinimg.com/564x/e5/42/85/e54285c53d47a8720f81a658760292fe.jpg'
                                    : 'https://www.universalstudioshollywood.com/tridiondata/ush/en/us/files/images/ush-wwohp-universal-hollywood-harry-potter-hogwarts-b.jpg'
                            }
                            alt={key as string}
                            draggable={false}
                          />
                          <h3>
                            {key === 'anime'
                              ? '🎌 Anime'
                              : key === 'rick'
                                ? '🧪 Rick and Morty'
                                : key === 'dbz'
                                  ? '🔥 Dragon Ball Z'
                                  : '🪄 Harry Potter'}
                          </h3>
                        </CardFace>
                        <CardBack>
                          {t(`home.${key}CardInfo`)}
                        </CardBack>
                      </CardInner>
                    </CardButton>
                  </CardContainer>
                ))}
              </CardGrid>
            </motion.div>
          ) : (
            <motion.div
              key="microfrontend"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Section>
                <Suspense fallback={<div>{<ProgressBar />}{t('loading')}</div>}>
                  {renderMicrofrontend()}
                </Suspense>
              </Section>
            </motion.div>
          )}
        </AnimatePresence>
      </Wrapper>
    </>
  );
};

export default App;
