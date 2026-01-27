import 'package:flutter_dotenv/flutter_dotenv.dart';

class Env {
  static String viteHost = dotenv.get("VITE_HOST");
  static String viteSystemName = dotenv.get("VITE_SYSTEM_NAME");
}
