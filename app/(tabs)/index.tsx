import { useEffect, useState } from 'react'

import { Image, StyleSheet, Button, BackHandler, View } from 'react-native'

import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

import { Audio } from 'expo-av'

const MP3_PATH = '../../assets/kb.mp3'

export default function HomeScreen() {
  const [sound, setSound] = useState<any>()

  function exit() {
    BackHandler.exitApp()
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require(MP3_PATH))
    setSound(sound)

    await sound.playAsync()
  }

  // play sound on load
  useEffect(() => {
    playSound()
  }, [])

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Fuck You, Cat!</ThemedText>
      </ThemedView>
      <View style={styles.stepContainer}>
        <Button
          onPress={playSound}
          title="Restart Sound"
          color="#148514"
          accessibilityLabel="Exit"
        />
        <Button
          onPress={exit}
          title="Exit"
          color="#841514"
          accessibilityLabel="Exit"
        />
      </View>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
})
