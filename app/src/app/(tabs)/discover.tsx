import { StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/ScreenContainer';

const ITEMS = [
  { title: 'Tournaments', description: 'Browse live and upcoming competitive events.' },
  { title: 'Leaderboards', description: 'See where you rank against other players.' },
  { title: 'Rewards', description: 'Track the swag and prizes you can earn.' },
];

export default function DiscoverScreen() {
  return (
    <ScreenContainer title="Discover" subtitle="Explore what Swag has to offer.">
      {ITEMS.map((item) => (
        <View key={item.title} style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#111111',
    borderRadius: 16,
    padding: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2a2a',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  cardDescription: {
    color: '#9a9a9a',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
});
