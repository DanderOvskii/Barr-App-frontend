import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();
  const navigateTo = () => {
    router.push("/Products");
  }
  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.name}>naam</Text>
      <Text style={styles.balance}>$100.-</Text>
    </View>

    <View style={styles.searchBarContainer}>
      <TextInput style={styles.searchBar} placeholder="Search" />
    </View>

    <Text style={styles.categoryHeader} >Categorie</Text>

    <View style={styles.categoryContainer}>
      <TouchableOpacity style={styles.categoryButton} onPress={() => navigateTo()}>
        <Text style={styles.categoryButtonText}>Bier</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.categoryButton} onPress={() => navigateTo()}>
        <Text style={styles.categoryButtonText}>Snoep</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.categoryButton} onPress={() => navigateTo()}>
        <Text style={styles.categoryButtonText}>Friss</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff', // Light blue background
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ff6347', // Tomato red background
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  balance: {
    fontSize: 20,
    color: 'white',
  },
  searchBarContainer: {
    marginBottom: 20,
  },
  searchBar: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  categoryHeader: {
    fontSize: 24,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  categoryContainer: {
    alignItems: 'center',
  },
  categoryButton: {
    width: '80%',
    padding: 15,
    backgroundColor: '#4caf50', // Green background
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2, // For Android shadow
  },
  categoryButtonText: {
    fontSize: 18,
    color: 'white',
  },
});
