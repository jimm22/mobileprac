import { useFonts } from 'expo-font';

const Montserrat = ({ children }) => {
  const [fontsLoaded] = useFonts({
    Montserrat: require('../../assets/fonts/Montserrat.ttf'),
  });

  // Render children only when fonts are loaded
  return fontsLoaded ? children : null;
};

export default Montserrat;
