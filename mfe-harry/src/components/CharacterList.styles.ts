import styled from 'styled-components';

export const ListWrapper = styled.div.attrs(() => ({ className: 'character-list' }))`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  padding: 1rem;
`;

export const Card = styled.div.attrs(() => ({ className: 'character-list__card' }))`
  background: linear-gradient(to bottom, #2e2e38, #1c1c26);
  border: 2px solid #d4af37; /* Dorado */
  border-radius: 14px;
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 0 18px rgba(212, 175, 55, 0.4);
  }
`;

export const Image = styled.img.attrs(() => ({
  className: 'character-list__image',
  draggable: false,
}))`
  width: 100%;
  height: 240px;
  object-fit: cover;
  object-position: top;
  border-bottom: 2px solid #d4af37;
`;

export const Name = styled.h3.attrs(() => ({ className: 'character-list__name' }))`
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  margin: 0.8rem 0 0.3rem;
`;

export const Info = styled.p.attrs(() => ({ className: 'character-list__info' }))`
  font-size: 0.9rem;
  color: #ccc;
  margin: 0.2rem 0;

  strong {
    color: #fff;
    font-weight: 600;
  }
`;
export const Heading = styled.h2`
  font-size: 1.8rem;
  text-align: center;
  color: #000000ff;
  margin-top: 1rem;
`;

export const Note = styled.p`
  text-align: center;
  font-size: 0.95rem;
  color: #000000ff;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;
