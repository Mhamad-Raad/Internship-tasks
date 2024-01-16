import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:movies_library/main.dart';

class AddMovieScreen extends StatefulWidget {
  @override
  _AddMovieScreenState createState() => _AddMovieScreenState();
}

class _AddMovieScreenState extends State<AddMovieScreen> {
  final TextEditingController titleController = TextEditingController();
  final TextEditingController descriptionController = TextEditingController();
  final TextEditingController yearController = TextEditingController();
  final TextEditingController genreController = TextEditingController();
  final TextEditingController directorController = TextEditingController();

  List<CastingMemberForm> castingMembers = [];

  void addCastingMemberForm() {
    if (castingMembers.length < 3) {
      setState(() {
        castingMembers.add(CastingMemberForm());
      });
    }
  }

  Future<void> submitForm() async {
    try {
      final List<Map<String, dynamic>> castingMembersData = [];
      for (CastingMemberForm form in castingMembers) {
        castingMembersData.add(form.getData());
      }

      final response = await http.post(
        Uri.parse(
            'http://192.168.1.41:3000/movies/'),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          'title': titleController.text,
          'description': descriptionController.text,
          'release_year': int.parse(yearController.text),
          'genre': genreController.text,
          'director': directorController.text,
          'cast': castingMembersData,
        }),
      );
      if (response.statusCode == 201) {
        print('Movie added successfully!');
        Navigator.pushReplacement(context,
            MaterialPageRoute(builder: (context) => const MovieListScreen()));
        // clean the textfields
        titleController.clear();
        descriptionController.clear();
        yearController.clear();
        genreController.clear();
        directorController.clear();
        castingMembers = [];
      } else {
        // Handle error cases
        print('Failed to add movie. Status code: ${response.statusCode}');
      }
    } catch (error) {
      // Handle network or other errors
      print('Error submitting form: $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Add Movie'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              TextField(
                controller: titleController,
                decoration: InputDecoration(labelText: 'Title'),
              ),
              TextField(
                controller: descriptionController,
                decoration: InputDecoration(labelText: 'Description'),
              ),
              TextField(
                controller: yearController,
                decoration: InputDecoration(labelText: 'Release Year'),
              ),
              TextField(
                controller: genreController,
                decoration: InputDecoration(labelText: 'Genre'),
              ),
              TextField(
                controller: directorController,
                decoration: InputDecoration(labelText: 'Director'),
              ),
              SizedBox(height: 16),
              Text(
                'Casting Members',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              for (int i = 0; i < castingMembers.length; i++) ...[
                SizedBox(height: 16),
                Text('Casting Member ${i + 1}'),
                castingMembers[i],
              ],
              if (castingMembers.length < 3) ...[
                SizedBox(height: 16),
                ElevatedButton(
                  onPressed: addCastingMemberForm,
                  child: Text('Add Casting Member'),
                ),
              ],
              SizedBox(height: 16),
              ElevatedButton(
                onPressed: submitForm,
                child: Text('Submit'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class CastingMemberForm extends StatefulWidget {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController ageController = TextEditingController();
  final TextEditingController countryController = TextEditingController();

  @override
  _CastingMemberFormState createState() => _CastingMemberFormState();

  Map<String, dynamic> getData() {
    final String name = nameController.text.trim();
    final String ageText = ageController.text.trim();
    final String country = countryController.text.trim();

    if (name.isEmpty || ageText.isEmpty || country.isEmpty) {
      return {};
    }

    try {
      final int age = int.parse(ageText);

      return {
        'name': name,
        'age': age,
        'country_of_origin': country,
      };
    } catch (e) {
      return {};
    }
  }
}

class _CastingMemberFormState extends State<CastingMemberForm> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        TextField(
          controller: widget.nameController,
          decoration: InputDecoration(labelText: 'Name'),
        ),
        TextField(
          controller: widget.ageController,
          decoration: InputDecoration(labelText: 'Age'),
          keyboardType: TextInputType.number,
        ),
        TextField(
          controller: widget.countryController,
          decoration: InputDecoration(labelText: 'Country of Origin'),
        ),
      ],
    );
  }
}
