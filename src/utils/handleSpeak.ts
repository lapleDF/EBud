import Tts from 'react-native-tts';

export const handleSpeak = (text: string) =>
  Tts.speak(text, {
    androidParams: {
      KEY_PARAM_STREAM: 'STREAM_ACCESSIBILITY',
      KEY_PARAM_PAN: 0,
      KEY_PARAM_VOLUME: 1,
    },
    iosVoiceId: 'en-US-SMTf00',
    rate: 0.01,
  });
