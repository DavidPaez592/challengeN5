import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ListWrapper,
  Card,
  Image,
  Name,
  Info,
  Tags,
  Tag,
  Heading,
  Note
} from './CharacterList.styles';

type Character = {
  id: number;
  name: string;
  image: string;
  ki: string;
  maxKi: string;
  race?: string;
  gender?: string;
  affiliation?: string;
};

const CharacterList = () => {
  const { t } = useTranslation();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch('https://dragonball-api.com/api/characters?limit=10');
        const data = await res.json();
        setCharacters(data.items || data);
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
      <Heading>{t('dbz.title')}</Heading>
      <Note>{t('dbz.note')}</Note>
      <ListWrapper>
        {characters.map((char) => (
          <Card key={char.id}>
            <Image src={char.image} alt={char.name} />
            <Name>{char.name}</Name>

            <Tags>
              {char.ki && <Tag type="ki">Ki: {char.ki}</Tag>}
              {char.maxKi && <Tag type="maxKi">Max Ki: {char.maxKi}</Tag>}
            </Tags>

            {char.race && (
              <Info>
                <span>{t('race')}:</span> {t(char.race.trim().toLowerCase())}
              </Info>
            )}
            {char.gender && (
              <Info>
                <span>{t('gender')}:</span> {t(char.gender.toLowerCase())}
              </Info>
            )}
            {char.affiliation && (
              <Info>
                <span>{t('group')}:</span> {t(char.affiliation)}
              </Info>
            )}
          </Card>
        ))}
      </ListWrapper>
    </>
  );
};

export default CharacterList;
