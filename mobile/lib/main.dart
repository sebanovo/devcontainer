import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

void main() {
  runApp(MyApp());
}

// Cambiar localhost a 10.0.2.2 para emulador Android
const String baseUrl = "http://192.168.0.225:8000";

class Alumno {
  final int id;
  final String nombre;
  final int edad;
  final String? foto;

  Alumno({
    required this.id,
    required this.nombre,
    required this.edad,
    this.foto,
  });

  factory Alumno.fromJson(Map<String, dynamic> json) {
    return Alumno(
      id: json['id'],
      nombre: json['nombre'],
      edad: json['edad'],
      foto: json['foto'],
    );
  }
}

Future<List<Alumno>> fetchAlumnos() async {
  final response = await http.get(Uri.parse('$baseUrl/api/v1/alumnos/'));

  if (response.statusCode == 200) {
    List<dynamic> data = jsonDecode(response.body);
    return data.map((json) => Alumno.fromJson(json)).toList();
  } else {
    throw Exception('Error al cargar alumnos: ${response.statusCode}');
  }
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(primaryColor: Colors.blue),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Lista de Alumnos123')),
      body: FutureBuilder<List<Alumno>>(
        future: fetchAlumnos(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          }

          if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('No hay alumnos'));
          }

          final alumnos = snapshot.data!;

          return ListView.builder(
            itemCount: alumnos.length,
            itemBuilder: (context, index) {
              final alumno = alumnos[index];

              return ListTile(
                leading: Image.network(
                  "$baseUrl/static/mark.jpg",
                  width: 50,
                  height: 50,
                  fit: BoxFit.cover,
                  errorBuilder: (_, __, ___) => const Icon(Icons.person),
                ),
                title: Text(alumno.nombre),
                subtitle: Text('Edad: ${alumno.edad}'),
              );
            },
          );
        },
      ),
    );
  }
}
