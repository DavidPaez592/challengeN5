import styled from 'styled-components';

export const ListWrapper = styled.div.attrs(() => ({ className: 'character-list' }))`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  padding: 1rem;
`;

export const Card = styled.div.attrs(() => ({ className: 'character-list__card' }))`
  background: linear-gradient(to bottom right, #fffdf5, #f5e4a1);
  border: 3px solid #ffcc00;
  border-radius: 14px;
  box-shadow: 0 0 12px rgba(255, 204, 0, 0.4);
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 0 18px rgba(255, 140, 0, 0.6);
  }
`;


 export const Image = styled.img.attrs(() => ({
  className: 'character-list__image',
  draggable: false,
}))`
  width: 100%;
  height: 240px;
  object-fit: cover;
  object-position: top; /* ✅ Esto alinea las cabezas arriba */
  border-bottom: 2px solid #ffcc00;
`;


export const Name = styled.h3.attrs(() => ({ className: 'character-list__name' }))`
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0.8rem 0 0.3rem;
  color: #3a1e00;
`;

export const Info = styled.p.attrs(() => ({ className: 'character-list__info' }))`
  font-size: 0.9rem;
  color: #333;
  margin: 0.2rem 0;

  span {
    font-weight: 600;
    color: #000;
  }
`;

export const Tags = styled.div.attrs(() => ({ className: 'character-list__tags' }))`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0.5rem 0;
`;

export const Tag = styled.span.attrs(() => ({ className: 'character-list__tag' })) <{ type?: string }>`
  background-color: ${({ type }) =>
        type === 'ki' ? '#ff9900' :
            type === 'maxKi' ? '#cc0000' :
                '#999'};
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
`;

export const Heading = styled.h2`
  font-size: 1.8rem;
  text-align: center;
  color: #ff9900;
  margin-top: 1rem;
`;

export const Note = styled.p`
  text-align: center;
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;
