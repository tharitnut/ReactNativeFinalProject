import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0FAFF",
    flex: 1,
  },
  textLogo: {
    fontSize: 22,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
  card: {
    backgroundColor: "#EBF0FF",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FA7B34",
  },
  cardDetail: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2B2B2B",
  },
});

export default styles;
