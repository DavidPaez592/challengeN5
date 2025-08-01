import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ListWrapper,
  Card,
  Image,
  Name,
  Info,
  SectionTitle,
  Note
} from './CharacterList.styles';

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  origin: { name: string };
  location: { name: string };
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'alive':
      return 'green';
    case 'dead':
      return 'red';
    default:
      return 'gray';
  }
};

const CharacterList = () => {
  const { t } = useTranslation();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch('https://rickandmortyapi.com/api/character');
        const data = await res.json();
        setCharacters(data.results.slice(0, 10));
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <p>{t('loading')}</p>;
  if (error) return <p>{t('error')}</p>;

  return (
    <>
      <SectionTitle>{t('rick.title')}</SectionTitle>
      <Note>{t('rick.note')}</Note>
      <ListWrapper>
        {characters.map((char) => (
          <Card key={char.id}>
            <Image src={char.image} alt={char.name} />
            <Name>{char.name}</Name>
            <Info>
              <strong>{t('character.status')}:</strong>{' '}
              <span style={{ color: getStatusColor(char.status), fontWeight: 600 }}>
                ● {t(char.status)}
              </span>
            </Info>
            <Info><strong>{t('character.species')}:</strong> {char.species}</Info>
            <Info><strong>{t('character.origin')}:</strong> {char.origin.name}</Info>
            <Info><strong>{t('character.location')}:</strong> {char.location.name}</Info>
          </Card>
        ))}
      </ListWrapper>
    </>
  );
};

export default CharacterList;
