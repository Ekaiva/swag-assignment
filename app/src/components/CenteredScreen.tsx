import { StyleSheet, Text, View } from 'react-native';

import { BRAND_BACKGROUND } from '@/constants/assets';

/** Thin shared layout: full-black background with centered title text. */
export function CenteredScreen({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BRAND_BACKGROUND,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
  },
});
