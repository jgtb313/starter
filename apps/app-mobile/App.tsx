import { StatusBar } from 'expo-status-bar'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button } from '@starter/ui-mobile'

const handleDeepLink: Linking.URLListener = async (values) => {
  console.log({
    values,
  })
  await WebBrowser.dismissBrowser()
}

Linking.addEventListener('url', handleDeepLink)

export default function App() {
  const handleOpenBrowser = async () => {
    const url = Linking.getLinkingURL()

    await WebBrowser.openBrowserAsync(`http://192.168.50.19:3000/?client_id=console&redirect_url=${url}&response_type=token&scope=admin`, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
    })
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>

      <Button onPress={handleOpenBrowser}>
        <Text>Open</Text>
      </Button>

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
