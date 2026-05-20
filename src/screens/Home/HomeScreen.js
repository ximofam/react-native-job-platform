import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#020617', '#0F172A', '#111827']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.logoText}>JobPlatform</Text>
              <Text style={styles.headerSubtitle}>
                Find your dream career
              </Text>
            </View>

            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          {/* Hero */}
          <View style={styles.heroContainer}>
            <Text style={styles.heroTitle}>
              Discover Your Next Opportunity
            </Text>

            <Text style={styles.heroDescription}>
              Search thousands of jobs from top companies around the world.
            </Text>
          </View>

          {/* Search */}
          <View style={styles.searchCard}>
            <View style={styles.searchInputContainer}>
              <Ionicons
                name="search-outline"
                size={22}
                color="#64748B"
              />

              <TextInput
                placeholder="Search jobs, companies..."
                placeholderTextColor="#94A3B8"
                style={styles.searchInput}
              />
            </View>

            <TouchableOpacity activeOpacity={0.85}>
              <LinearGradient
                colors={['#2563EB', '#3B82F6']}
                style={styles.searchButton}
              >
                <Text style={styles.searchButtonText}>Search Jobs</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>10K+</Text>
              <Text style={styles.statLabel}>Jobs</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>5K+</Text>
              <Text style={styles.statLabel}>Companies</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>20K+</Text>
              <Text style={styles.statLabel}>Candidates</Text>
            </View>
          </View>

          {/* Register Options */}
          <Text style={styles.sectionTitle}>Get Started</Text>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.optionCard}
            onPress={() => navigation.navigate('CandidateRegister')}
          >
            <View style={styles.optionIconContainer}>
              <Ionicons
                name="person-outline"
                size={30}
                color="#2563EB"
              />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Register as Candidate</Text>

              <Text style={styles.optionDescription}>
                Apply for jobs and build your professional profile.
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={24}
              color="#94A3B8"
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.optionCard}
            onPress={() => navigation.navigate('EmployerRegister')}
          >
            <View style={styles.optionIconContainerEmployer}>
              <Ionicons
                name="business-outline"
                size={30}
                color="#7C3AED"
              />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Register as Employer</Text>

              <Text style={styles.optionDescription}>
                Post jobs and hire talented candidates faster.
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={24}
              color="#94A3B8"
            />
          </TouchableOpacity>

          {/* Login */}
          <TouchableOpacity
            style={styles.loginContainer}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginText}>
              Already have an account?
            </Text>

            <Text style={styles.loginLink}> Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  scrollContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 42,
  },

  logoText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },

  headerSubtitle: {
    color: '#94A3B8',
    marginTop: 4,
    fontSize: 15,
  },

  notificationButton: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  heroContainer: {
    marginBottom: 32,
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '800',
    lineHeight: 48,
    marginBottom: 16,
  },

  heroDescription: {
    color: '#CBD5E1',
    fontSize: 16,
    lineHeight: 26,
  },

  searchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
    marginBottom: 30,
  },

  searchInputContainer: {
    height: 58,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  searchInput: {
    flex: 1,
    marginLeft: 12,
    color: '#0F172A',
    fontSize: 15,
  },

  searchButton: {
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 36,
  },

  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 22,
    paddingVertical: 24,
    alignItems: 'center',
    marginHorizontal: 5,
  },

  statNumber: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },

  statLabel: {
    color: '#CBD5E1',
    fontSize: 14,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },

  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  optionIconContainer: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  optionIconContainerEmployer: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: '#EDE9FE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  optionContent: {
    flex: 1,
    marginLeft: 16,
  },

  optionTitle: {
    color: '#0F172A',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },

  optionDescription: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 22,
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 24,
  },

  loginText: {
    color: '#CBD5E1',
    fontSize: 14,
  },

  loginLink: {
    color: '#60A5FA',
    fontSize: 14,
    fontWeight: '700',
  },
});