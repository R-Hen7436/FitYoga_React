import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Age from './Age';

const GenderSelection = ({ onBack }) => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [showGenderSelection, setShowGenderSelection] = useState(true);

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  const handleNext = () => {
    setShowGenderSelection(false);
  };


  if (showGenderSelection) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onBack}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Select your gender</Text>
        <View style={styles.genderOptions}>
          <TouchableOpacity
            style={styles.genderOption}
            onPress={() => handleGenderSelection('female')}
          >
            <Image
              source={require('./images/Female.jpg')}
              style={[
                styles.genderImage,
                selectedGender === 'female' && styles.selectedImage
              ]}
            />
            <Text
              style={[
                styles.genderLabel,
                selectedGender === 'female' && styles.selectedLabel
              ]}
            >
              Female
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.genderOption}
            onPress={() => handleGenderSelection('male')}
          >
            <Image
              source={require('./images/Male.jpg')}
              style={[
                styles.genderImage,
                selectedGender === 'male' && styles.selectedImage
              ]}
            />
            <Text
              style={[
                styles.genderLabel,
                selectedGender === 'male' && styles.selectedLabel
              ]}
            >
              Male
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <Age onBack={() => setShowGenderSelection(true)} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
    top: -50,
  },
  genderOptions: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  genderOption: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  genderImage: {
    width: 150,
    height: 200,
    marginBottom: 10,
    top: -30,
  },
  selectedImage: {
    borderColor: '#5943e3',
    borderWidth: 2,
    borderRadius: 10,
  },
  genderLabel: {
    fontSize: 15,
    fontFamily: 'Arial',
    top: -20,
  },
  selectedLabel: {
    color: 'blue',
  },
  nextButton: {
    paddingVertical: 10,
    marginTop: 30,
    backgroundColor: 'mediumslateblue',
    padding: 15,
    borderRadius: 100,
    width: '97%',
    alignItems: 'center',
    top: 60,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#f0f4f7',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default GenderSelection;
