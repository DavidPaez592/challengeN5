import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ListWrapper,
  Card,
  Image,
  Name,
  Info,
  Heading,
  Note
} from './CharacterList.styles';

type Character = {
  name: string;
  species: string;
  gender: string;
  eyeColour: string;
  hairColour: string;
  image: string;
};

const CharacterList = () => {
  const { t } = useTranslation();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch('https://hp-api.onrender.com/api/characters');
        const data = await res.json();
        setCharacters(data.slice(0, 10));
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
      <Heading>{t('hp.title')}</Heading>
      <Note>{t('hp.note')}</Note>
      <ListWrapper>
        {characters.map((char, index) => (
          <Card key={`${char.name}-${index}`}>
            <Image src={char.image} alt={char.name} />
            <Name>{char.name}</Name>
            <Info><strong>{t('species')}:</strong> {t(char.species)}</Info>
            <Info><strong>{t('gender')}:</strong> {t(char.gender)}</Info>
            <Info>
              <strong>{t('eyeColor')}:</strong>{' '}
              {char.eyeColour ? t(`eyeColors.${char.eyeColour}`) : t('unknown')}
            </Info>
            <Info>
              <strong>{t('hairColor')}:</strong>{' '}
              {char.hairColour ? t(`hairColors.${char.hairColour}`) : t('unknown')}
            </Info>
          </Card>
        ))}
      </ListWrapper>
    </>
  );
};

export default CharacterList;
