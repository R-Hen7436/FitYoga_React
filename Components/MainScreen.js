import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import GenderSelection from './GenderSelection';

const App = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showGenderSelection, setShowGenderSelection] = useState(false);

  const images = [
    { id: 1, source: require('./images/yogawoman.jpg') },
    { id: 2, source: require('./images/yogapose.jpg') },
    { id: 3, source: require('./images/5074.jpg') },
  ];

  const texts = [
    { title: 'Daily Yoga Workout', subtitle: 'Make yoga and meditation your daily healthy routine.' },
    { title: 'Personal Trainers', subtitle: 'Choose the right workout trainer to practice properly.' },
    { title: '150+ Yoga Workouts', subtitle: 'Find the right workout for what you \nstrive.' },
  ];

  const handleNext = () => {
    if (selectedImageIndex + 1 >= images.length) {
      setShowGenderSelection(true);
    } else {
      setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const handleBack = () => {
    setShowGenderSelection(false);
    setSelectedImageIndex(2);
  };

  const { width, height } = Dimensions.get('window');
  const imageHeight = height * 0.65; // Adjusted to be 65% of the device's height

  if (showGenderSelection) {
    return <GenderSelection onBack={handleBack} />;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer, { height: imageHeight }]}>
        <Image
          style={styles.image}
          source={images[selectedImageIndex].source}
          resizeMode="stretch" // Use 'cover' to make the image fill the container
        />
        <View style={styles.overlay} />
      </View>
      <Text style={styles.title}>{texts[selectedImageIndex].title}</Text>
      <Text style={styles.subtitle}>{texts[selectedImageIndex].subtitle}</Text>
      <View style={styles.dotsContainer}>
        {images.map((image, index) => (
          <Text key={image.id} style={selectedImageIndex === index ? styles.dash : styles.dot}>
            {selectedImageIndex === index ? '_' : '.'}
          </Text>
        ))}
      </View>
      <TouchableOpacity style={[styles.button, { width: width - 20 }]} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 0,
  },
  imageContainer: {
    width: '100%',
    overflow: 'hidden',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  title: {
    marginTop: 15,
    fontFamily: 'sans-serif',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: 'black',
  },
  subtitle: {
    fontFamily: 'sans-serif',
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    marginBottom: 25, // Ensure space between subtitle and dots
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -50, // Move dots up above the button
    marginBottom: 20, // Adjust as needed
  },
  dot: {
    fontSize: 40,
    marginHorizontal: 6,
    marginVertical: 5,
    color: 'mediumslateblue', // Color for non-selected dots
    fontWeight: 'bold',
  },
  dash: {
    fontSize: 40,
    marginHorizontal: 6,
    marginVertical: 0,
    color: 'mediumslateblue', // Color for the selected dash
    fontWeight: 'bold',
    borderRadius: 20,
  },
  button: {
    backgroundColor: 'mediumslateblue',
    paddingVertical: 10,
    bottom: 20,
    borderRadius: 30,
    position: 'absolute',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default App;
