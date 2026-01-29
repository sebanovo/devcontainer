import 'package:flutter_dotenv/flutter_dotenv.dart';

class Env {
  static String serverHost = dotenv.get("SERVER_HOST");
  static String systemName = dotenv.get("SYSTEM_NAME");
}
