import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:mobile/constants/env.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final usernameController = TextEditingController();
  final passwordController = TextEditingController();

  List<String> subdomains = [];
  String? selectedSubdomain;

  @override
  void initState() {
    super.initState();
    fetchDomains();
  }

  Future<void> fetchDomains() async {
    final url = Uri.parse("http://${Env.serverHost}:8000/api/v1/domains/");
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      setState(() {
        subdomains =
            (data
                      .map<String>((e) {
                        final full = e["domain"].toString();
                        return full.split('.').first; // "aleman"
                      })
                      .toSet() // 👈 elimina duplicados
                      .toList()
                  as List<String>)
              ..removeAt(0);
      });
    }
  }

  Future<void> login() async {
    if (selectedSubdomain == null) return;

    final url = Uri.parse(
      "http://$selectedSubdomain.${Env.serverHost}:8000/api/token/",
    );

    final response = await http.post(
      url,
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({
        "username": usernameController.text,
        "password": passwordController.text,
      }),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString("access", data["access"]);
      await prefs.setString("refresh", data["refresh"]);
      await prefs.setString("subdomain", selectedSubdomain!);

      print("Login exitoso");
      print("Access: ${data["access"]}");

      if (!mounted) return;
      Navigator.pushReplacementNamed(context, '/home');
    } else {
      print("Error de login: ${response.body}");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Login")),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            DropdownButtonFormField(
              hint: const Text("Selecciona subdominio"),
              initialValue: selectedSubdomain,
              items: subdomains.map((s) {
                return DropdownMenuItem(value: s, child: Text(s));
              }).toList(),
              onChanged: (value) {
                setState(() {
                  selectedSubdomain = value;
                });
              },
            ),
            const SizedBox(height: 16),
            TextField(
              controller: usernameController,
              decoration: const InputDecoration(labelText: "Username"),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: passwordController,
              decoration: const InputDecoration(labelText: "Password"),
              obscureText: true,
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: login,
              child: const Text("Iniciar sesión"),
            ),
          ],
        ),
      ),
    );
  }
}
