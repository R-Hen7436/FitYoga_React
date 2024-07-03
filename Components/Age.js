import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const Age = ({ onBack }) => {
  const [selectedAge, setSelectedAge] = useState(null);
  const scrollViewRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width * 0.9);
  const ages = Array.from({ length: 100 - 18 + 1 }, (_, i) => i + 18);

  useEffect(() => {
    const updateWidth = () => {
      setContainerWidth(Dimensions.get('window').width * 0.9);
    };

    const subscription = Dimensions.addEventListener('change', updateWidth);
    return () => {
      subscription?.remove();
    };
  }, []);

  const onScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const centerPosition = scrollPosition + containerWidth / 2 - (containerWidth / 2 - ageBoxWidth / 2);
    const closestIndex = Math.floor(centerPosition / (ageBoxWidth + 4)); 
  
    if (closestIndex >= 0 && closestIndex < ages.length) {
      setSelectedAge(ages[closestIndex]);
    } else {
      setSelectedAge(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.closeButtonContainer}>
        <TouchableOpacity style={styles.close} onPress={onBack}>
          <Text style={styles.closeBtn}>&lt;</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 20 }}>How Old Are You?</Text>
      <Text style={{ fontSize: 17 }}>Age is in years. This will helps us to personalize</Text>
      <Text style={{ fontSize: 17 }}>an exercise plan that suits you.</Text>
      {selectedAge && (
        <View style={styles.selectedAgeContainer}>
          <Text style={styles.selectedAge}>{selectedAge}</Text>
          <Text style={styles.yearsOld}>Years old</Text>
        </View>
      )}
      <View style={[styles.agePickerContainer, { width: containerWidth }]}>
        <View style={styles.circle} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          ref={scrollViewRef}
          contentContainerStyle={{ paddingHorizontal: containerWidth / 2 - ageBoxWidth / 2 }}
        >
          <View style={styles.ageRow}>
            {ages.map((age) => (
              <TouchableOpacity
                key={age}
                style={[styles.ageBox, selectedAge === age ? styles.selectedAgeBox : null]}
              >
                <Text style={[styles.ageText, selectedAge === age && styles.selectedAgeText]}>{age}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <View>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => { /* Save this for later. */ }}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const ageBoxWidth = 60;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  closeButtonContainer: {
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
    left: 10,
    width: 50,
  },
  close: {
    backgroundColor: '#f0f4f7',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeBtn: {
    fontSize: 35,
    color: '#8b8f92',
  },
  agePickerContainer: {
    borderColor: '#000',
    borderRadius: 30,
    paddingVertical: 8,
    backgroundColor: '#ececec',
    position: 'relative',
    overflow: 'visible',
    marginTop: 20,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 6,
    borderColor: '#5f3eef',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    zIndex: 10,
  },
  ageRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ageBox: {
    width: ageBoxWidth,
    marginHorizontal: 2,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ageText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
  },
  selectedAgeText: {
    color: '#5f3eef',
    fontWeight: 'bold',
    fontSize: 30,
  },
  selectedAgeBox: {
    borderColor: '#5f3eef',
    borderRadius: 80,
    // zIndex: 100
  },
  selectedAgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  selectedAge: {
    color: '#5f3eef',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  yearsOld: {
    color: '#5f3eef',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  buttonContainer: {
    backgroundColor: '#7b68ee',
    padding: 15,
    borderRadius: 30,
    position: 'absolute',
    marginTop: 110,
    left: -200,
    width: 400,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Age;
