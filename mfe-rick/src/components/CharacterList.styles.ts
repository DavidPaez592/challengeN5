import styled from 'styled-components';

export const ListWrapper = styled.div.attrs(() => ({ className: 'character-list' }))`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  padding: 1rem;
`;

export const Card = styled.div.attrs(() => ({ className: 'character-list__card' }))`
  background: #f0fcff;
  border: 2px solid #0cf;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 255, 255, 0.2);
  text-align: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-6px);
    background-color: #e6faff;
  }
`;

export const Image = styled.img.attrs(() => ({
  className: 'character-list__image',
  draggable: false,
}))`
  width: 100%;
  height: auto;
  border-bottom: 2px solid #0cf;
`;

export const Name = styled.h3.attrs(() => ({ className: 'character-list__name' }))`
  margin: 0.8rem 0 0.4rem;
  font-size: 1.2rem;
  color: #00305b;
`;

export const Info = styled.p.attrs(() => ({ className: 'character-list__info' }))`
  font-size: 0.9rem;
  margin: 0.2rem 0;
  color: #333;
`;

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  color: #0cf;
  margin-bottom: 0.5rem;
`;

export const Note = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: #555;
  max-width: 600px;
  margin: 0 auto 2rem auto;
  line-height: 1.4;
`;
