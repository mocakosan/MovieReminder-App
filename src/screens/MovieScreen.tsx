import { RouteProp, useRoute } from '@react-navigation/native';
import Screen from '../components/Screen';
import { RootStackParamList } from '../types';
import useMovie from '../hooks/useMovie';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  FlatList,
} from 'react-native';
import { useCallback } from 'react';
import Colors from 'open-color';
import Section from '../components/Section';
import People from '../components/People';
import YouTube from '../components/YouTube';
import React from 'react';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
  },
  titleSection: {
    flexDirection: 'row',
  },
  poster: {
    width: 100,
    height: 150,
    backgroundColor: Colors.gray[3],
  },
  infoTexts: {
    flex: 1,
    marginLeft: 20,
  },
  titleTexts: {
    flex: 1,
  },
  titleText: {
    fontSize: 30,
    color: Colors.white,
    fontWeight: 'bold',
  },
  originalTitleText: {
    marginTop: 2,
    fontSize: 14,
    color: Colors.white,
  },
  releaseDateText: {
    marginTop: 4,
    fontSize: 16,
    color: Colors.white,
  },
  overviewText: {
    fontSize: 14,
    color: Colors.white,
  },
  separator: {
    width: 16,
  },
  verticalSeparator: {
    height: 16,
  },
  addToCalendarButton: {
    marginTop: 8,
    backgroundColor: Colors.white,
    borderRadius: 8,
    alignItems: 'center',
    padding: 12,
  },
  addToCalendarButtonText: {
    color: Colors.black,
  },
});

const MovieScreen = () => {
  const {
    params: { id },
  } = useRoute<RouteProp<RootStackParamList, 'Movie'>>();

  const { movie, isLoading } = useMovie({ id });

  const renderMovie = useCallback(() => {
    if (movie == null) {
      return null;
    }
    const {
      posterUrl,
      title,
      originalTitle,
      releaseDate,
      overview,
      crews,
      casts,
      videos,
    } = movie;

    const director = crews.find(crew => crew.job === 'Director');
    const youTube = videos.filter(video => video.site === 'YouTube');

    return (
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.titleSection}>
          <View style={styles.poster}>
            {posterUrl != null && (
              <Image style={styles.poster} source={{ uri: posterUrl }} />
            )}
          </View>
          <View style={styles.infoTexts}>
            <View style={styles.titleTexts}>
              <Text style={styles.titleText}>{title}</Text>
              <Text style={styles.originalTitleText}>{originalTitle}</Text>
            </View>
            <Text
              style={styles.releaseDateText}>{`개봉일: ${releaseDate}`}</Text>
          </View>
        </View>
        <Section title="소개">
          <Text style={styles.overviewText}>{overview}</Text>
        </Section>
        {director != null && (
          <Section title="감독">
            <People
              name={director.name}
              description={director.job}
              photoUrl={director.profileUrl ?? undefined}
            />
          </Section>
        )}
        <Section title="배우">
          <FlatList
            horizontal
            data={casts}
            renderItem={({ item: cast }) => {
              return (
                <People
                  name={cast.name}
                  description={cast.character}
                  photoUrl={cast.profileUrl ?? undefined}
                />
              );
            }}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsHorizontalScrollIndicator={false}
          />
        </Section>
        <Section title="관련 영상">
          {youTube.map((video, index) => {
            return (
              <React.Fragment key={video.id}>
                <YouTube title={video.name} youTubeKey={video.key} />
                {index + 1 < youTube.length && (
                  <View style={styles.verticalSeparator} />
                )}
              </React.Fragment>
            );
          })}
        </Section>
      </ScrollView>
    );
  }, [movie]);
  return (
    <Screen>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        renderMovie()
      )}
    </Screen>
  );
};

export default MovieScreen;
