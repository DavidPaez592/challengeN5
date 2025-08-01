import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ListWrapper,
  Card,
  Image,
  Title,
  Info,
  TagRow,
  Tag,
  SectionTitle,
  Note
} from './CharacterList.styles';

type Character = {
  mal_id: number;
  name: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  about?: string;
  favorites: number;
};

const CharacterList = () => {
  const { t } = useTranslation();
  const [characterList, setCharacterList] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch('https://api.jikan.moe/v4/characters?limit=10');
        const data = await res.json();
        setCharacterList(data.data);
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
      <SectionTitle>{t('animeCharacters.title')}</SectionTitle>
      <Note>{t('animeCharacters.note')}</Note>
      <ListWrapper>
        {characterList.map((char) => (
          <Card key={char.mal_id}>
            <Image src={char.images.jpg.image_url} alt={char.name} />
            <Title>{char.name}</Title>
            <TagRow>
              <Tag>⭐ {char.favorites} {t('favorites')}</Tag>
            </TagRow>
            {char.about && (
              <Info>
                <strong>{t('description')}:</strong> {char.about.slice(0, 140)}...
              </Info>
            )}
          </Card>
        ))}
      </ListWrapper>
    </>
  );
};

export default CharacterList;
