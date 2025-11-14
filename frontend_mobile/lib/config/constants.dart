/// Configuration constants for the PostFlow Mobile App
class AppConstants {
  // Backend API Configuration
  static const String apiBaseUrl = 'http://10.29.128.200:5000';
  static const String apiBasePath = '/api';
  static const String apiUrl = '$apiBaseUrl$apiBasePath/';

  // API Timeouts
  static const Duration connectTimeout = Duration(seconds: 10);
  static const Duration receiveTimeout = Duration(seconds: 10);

  // Private constructor to prevent instantiation
  AppConstants._();
}

