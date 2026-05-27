import React, { useState, useCallback, useRef } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput, FlatList, ActivityIndicator, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import s from '../../styles/jobStyles';
import LocationPicker from '../../components/LocationPicker';
import { loadMoreJobsApi, searchJobsApi } from '../../apis/services/jobService';
import JobCard from '../../components/JobCard';

const FILTERS = ['Tất cả', 'FULL_TIME', 'PART_TIME', 'CONTRACT', 'FREELANCE', 'INTERNSHIP'];

function EmptyState({ hasSearched, error }) {
  if (error) {
    return (
      <View style={s.emptyContainer}>
        <View style={s.emptyIconWrapper}>
          <Ionicons name="cloud-offline-outline" size={40} color="#475569" />
        </View>
        <Text style={s.emptyTitle}>Có lỗi xảy ra</Text>
        <Text style={s.emptySub}>Vui lòng kiểm tra kết nối và thử lại.</Text>
      </View>
    );
  }

  if (hasSearched) {
    return (
      <View style={s.emptyContainer}>
        <View style={s.emptyIconWrapper}>
          <Ionicons name="search-outline" size={40} color="#475569" />
        </View>
        <Text style={s.emptyTitle}>Không tìm thấy kết quả</Text>
        <Text style={s.emptySub}>Thử tìm với từ khóa khác hoặc điều chỉnh bộ lọc.</Text>
      </View>
    );
  }

  return (
    <View style={s.emptyContainer}>
      <View style={s.emptyIconWrapper}>
        <Ionicons name="briefcase-outline" size={40} color="#475569" />
      </View>
      <Text style={s.emptyTitle}>Tìm việc làm của bạn</Text>
      <Text style={s.emptySub}>Nhập tên vị trí, công ty hoặc kỹ năng bạn muốn tìm kiếm.</Text>
    </View>
  );
}


export default function JobSearchScreen() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [location, setLocation] = useState({ city: null, district: null });

  const [jobs, setJobs] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);

  const currentParams = useRef({});

  const buildParams = useCallback((filter, loc, q) => {
    const params = {};
    if (q.trim()) params.search = q.trim();
    if (loc.district) params.district = loc.district.id;
    if (filter !== 'Tất cả') params.employment_type = filter;
    return params;
  }, []);


  const handleSearch = useCallback(async () => {
    const params = buildParams(activeFilter, location, query);
    currentParams.current = params;

    try {
      setLoading(true);
      setError(false);
      setHasSearched(true);

      const res = await searchJobsApi(params);
      const mapped = (res.results ?? []).map((j) => ({ ...j, saved: false }));
      setJobs(mapped);
      setNextCursor(res.next ?? null);
    } catch (err) {
      console.log('search jobs error:', err);
      setError(true);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [activeFilter, location, query, buildParams]);


  const handleLoadMore = useCallback(async () => {
    if (!nextCursor || loadingMore) return;

    try {
      setLoadingMore(true);
      const res = await loadMoreJobsApi(nextCursor);
      const mapped = (res.results ?? []).map((j) => ({ ...j, saved: false }));
      setJobs((prev) => [...prev, ...mapped]);
      setNextCursor(res.next ?? null);
    } catch (err) {
      console.log('load more error:', err);
    } finally {
      setLoadingMore(false);
    }
  }, [nextCursor, loadingMore]);


  const handleFilterChange = useCallback((filter) => {
    setActiveFilter(filter);
    if (!hasSearched) return;
    const params = buildParams(filter, location, query);
    currentParams.current = params;

    setLoading(true);
    setError(false);
    searchJobsApi(params)
      .then((res) => {
        const mapped = (res.results ?? []).map((j) => ({ ...j, saved: false }));
        setJobs(mapped);
        setNextCursor(res.next ?? null);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [hasSearched, location, query, buildParams]);


  const handleToggleSave = useCallback((id) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, saved: !job.saved } : job))
    );
  }, []);

  const handleClearQuery = () => {
    setQuery('');
    setJobs([]);
    setNextCursor(null);
    setHasSearched(false);
    setError(false);
  };

  const handleLocationChange = useCallback((newLoc) => {
    setLocation(newLoc);
  }, []);

  const renderFooter = () => {
    if (loadingMore) {
      return (
        <View style={s.loadMoreWrapper}>
          <ActivityIndicator color="#3B82F6" />
        </View>
      );
    }
    if (nextCursor) {
      return (
        <TouchableOpacity style={s.loadMoreBtn} onPress={handleLoadMore}>
          <Text style={s.loadMoreText}>Xem thêm</Text>
          <Ionicons name="chevron-down" size={16} color="#3B82F6" />
        </TouchableOpacity>
      );
    }
    if (hasSearched && jobs.length > 0) {
      return <Text style={s.endText}>Đã hiển thị tất cả kết quả</Text>;
    }
    return null;
  };

  return (
    <LinearGradient colors={['#020617', '#0F172A', '#111827']} style={s.container}>
      <SafeAreaView style={s.safeArea}>

        {/* Search controls */}
        <View style={{ paddingHorizontal: 24 }}>

          {/* Keyword */}
          <View style={s.searchWrapper}>
            <View style={s.searchBox}>
              <Ionicons name="search-outline" size={20} color="#94A3B8" />
              <TextInput
                style={s.searchInput}
                placeholder="Vị trí, công ty, kỹ năng..."
                placeholderTextColor="#94A3B8"
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
              />
              {query.length > 0 && (
                <TouchableOpacity onPress={handleClearQuery}>
                  <Ionicons name="close-circle" size={18} color="#94A3B8" />
                </TouchableOpacity>
              )}
              <TouchableOpacity style={s.searchBtn} onPress={handleSearch}>
                <Text style={s.searchBtnText}>Tìm</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Location */}
          <View style={s.locationRow}>
            <LocationPicker value={location} onChange={handleLocationChange} />
          </View>

          {/* Filter chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={s.filterRow}>
              {FILTERS.map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[s.chip, activeFilter === filter && s.chipActive]}
                  onPress={() => handleFilterChange(filter)}
                >
                  <Text style={[s.chipText, activeFilter === filter && s.chipTextActive]}>
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Loading spinner (first search) */}
        {loading ? (
          <View style={s.loadingContainer}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text style={s.loadingText}>Đang tìm kiếm...</Text>
          </View>
        ) : hasSearched && jobs.length > 0 ? (
          <FlatList
            data={jobs}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={s.scrollContainer}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <Text style={s.resultCount}>{jobs.length} kết quả tìm thấy</Text>
            }
            ListFooterComponent={renderFooter}
            renderItem={({ item }) => (
              <JobCard job={item} onToggleSave={handleToggleSave} />
            )}
          />
        ) : (
          <EmptyState hasSearched={hasSearched} error={error} />
        )}

      </SafeAreaView>
    </LinearGradient>
  );
}