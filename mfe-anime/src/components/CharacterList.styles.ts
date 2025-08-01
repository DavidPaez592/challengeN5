import styled from 'styled-components';

export const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`;

export const Card = styled.div`
  width: 260px;
  background-color: #fff;
  border: 2px solid #ff2f6d;
  border-radius: 12px;
  overflow: hidden;
  padding: 1rem;
  box-shadow: 0 3px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    background: #fff7fa;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
`;

export const Title = styled.h3`
  font-size: 1.2rem;
  margin: 1rem 0 0.5rem;
  color: #ff2f6d;
`;

export const Info = styled.p`
  font-size: 0.9rem;
  color: #333;
  line-height: 1.4;
  margin-top: 0.5rem;
  text-align: left;
`;

export const TagRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

export const Tag = styled.span`
  background-color: #ffe3ec;
  color: #ff2f6d;
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
`;

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  color: #ff2f6d;
  margin-bottom: 0.5rem;
`;

export const Note = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto 2rem auto;
  line-height: 1.4;
`;
