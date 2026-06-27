import { StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/ScreenContainer';

const STATS = [
  { label: 'Events joined', value: '12' },
  { label: 'Rewards earned', value: '5' },
  { label: 'Rank', value: '#248' },
];

export default function ProfileScreen() {
  return (
    <ScreenContainer title="Profile" subtitle="Your Swag account at a glance.">
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>S</Text>
      </View>
      <Text style={styles.name}>Swag Player</Text>
      <Text style={styles.handle}>@swag.player</Text>

      <View style={styles.statsRow}>
        {STATS.map((stat) => (
          <View key={stat.label} style={styles.stat}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2a2a',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '800',
  },
  name: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 14,
  },
  handle: {
    color: '#9a9a9a',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#111111',
    borderRadius: 16,
    paddingVertical: 18,
    marginTop: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2a2a',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
  },
  statLabel: {
    color: '#9a9a9a',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
});
