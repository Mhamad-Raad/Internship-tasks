import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:movies_library/MovieCastScreen.dart';
import 'dart:convert';

import 'package:movies_library/main.dart';

// ignore: must_be_immutable
class MovieDetailsScreen extends StatefulWidget {
  dynamic movie_id;
  dynamic cast;

  MovieDetailsScreen({Key? key, required this.movie_id, required this.cast})
      : super(key: key);

  @override
  _MovieDetailsScreenState createState() => _MovieDetailsScreenState();
}

class _MovieDetailsScreenState extends State<MovieDetailsScreen> {
  var inputController = TextEditingController();
  var inputYearController = TextEditingController();
  var inputGenreController = TextEditingController();
  var inputDirectorController = TextEditingController();
  var inputDescriptionController = TextEditingController();
  var inputTitleController = TextEditingController();
  bool editMode = false;

  dynamic movie = {};

  // Function to fetch updated movie details
  Future<void> fetchMovieDetails() async {
    try {
      final response = await http
          .get(Uri.parse('http://192.168.1.41:3000/movies/${widget.movie_id}'));
      if (response.statusCode == 200) {
        final Map<String, dynamic> data = json.decode(response.body);
        setState(() {
          movie = data;
        });
        inputDescriptionController.text = movie['description'];
        inputTitleController.text = movie['title'];
        inputYearController.text = movie['release_year'].toString();
        inputGenreController.text = movie['genre'];
        inputDirectorController.text = movie['director'];
      } else {
        print(
            'Failed to fetch updated movie details. Status code: ${response.statusCode}');
      }
    } catch (error) {
      print('Error fetching updated movie details: $error');
    }
  }

  @override
  void initState() {
    super.initState();
    fetchMovieDetails();
  }

  Future<void> likeMovie() async {
    try {
      final response = await http.post(
        Uri.parse('http://192.168.1.41:3000/movies/${widget.movie_id}/likes'),
      );

      if (response.statusCode == 200) {
        // Successfully liked the movie, update UI or fetch updated data
        fetchMovieDetails();
      } else {
        print('Failed to like the movie. Status code: ${response.statusCode}');
      }
    } catch (error) {
      print('Error liking the movie: $error');
    }
  }

  Future<void> deleteMovie() async {
    try {
      final response = await http.delete(
          Uri.parse('http://192.168.1.41:3000/movies/${widget.movie_id}'));

      if (response.statusCode == 200) {
        fetchMovieDetails();
      } else {
        print(
            'Failed to delete the movie. Status code: ${response.statusCode}');
      }
    } catch (error) {
      print('Error deleting the movie: $error');
    }
  }

  Future<void> addComment() async {
    var text = inputController.text;
    print(text);
    try {
      final response = await http.post(
        Uri.parse(
            'http://192.168.1.41:3000/movies/${widget.movie_id}/comments'),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({'text': text, 'user': 'someone'}),
      );

      print('Failed to add comment. Status code: ${response.statusCode}');
      print('Response body: ${response.body}');

      if (response.statusCode == 201) {
        // Successfully added the comment, update UI or fetch updated data
        fetchMovieDetails();
        inputController.clear();
      } else {
        print('Failed to add comment. Status code: ${response.statusCode}');
      }
    } catch (error) {
      print('Error adding comment: $error');
    }
  }

  Future<void> updateMovie() async {
    // Implement your logic to send a PUT request to update the movie
    // For example, you can use http package to send a PUT request
    print('works here');
    try {
      final response = await http.put(
        Uri.parse(
          'http://192.168.1.41:3000/movies/${widget.movie_id}',
        ),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          'description': inputDescriptionController.text,
          'title': inputTitleController.text,
          'release_year': inputYearController.text,
          'genre': inputGenreController.text,
          'director': inputDirectorController.text,
        }),
      );

      print(response.body);

      if (response.statusCode == 200) {
        // Successfully updated the movie, fetch updated data
        fetchMovieDetails();
      } else {
        print('Failed to update movie. Status code: ${response.statusCode}');
      }
    } catch (error) {
      print('Error updating movie: $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    print(movie);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Movie Details'),
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.black),
          onPressed: () => Navigator.pushReplacement(context,
              MaterialPageRoute(builder: (context) => const MovieListScreen())),
        ),
        actions: [
          ElevatedButton(
            onPressed: () => {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => CastScreen(
                    castMembers: widget.cast,
                  ),
                ),
              )
            },
            child: Text("see cast"),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Container(
          padding: EdgeInsets.all(15.0),
          // widht and height equalk to the screen
          width: MediaQuery.of(context).size.width,
          height: MediaQuery.of(context).size.height * 1.2,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextFormField(
                controller: inputTitleController,
                enabled: editMode, // Enable/disable based on edit mode
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                ),
              ),
              TextFormField(
                controller: inputDescriptionController,
                enabled: editMode, // Enable/disable based on edit mode
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                ),
              ),
              SizedBox(height: 16),
              Row(
                children: [
                  const Expanded(
                    child: Text('Release Year:',
                        style: TextStyle(
                            fontSize: 18, fontWeight: FontWeight.bold)),
                  ),
                  SizedBox(
                    width: 100,
                    height: 60,
                    child: TextFormField(
                      controller: inputYearController,
                      enabled: editMode, // Enable/disable based on edit mode
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                      ),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 16),
              Row(
                children: [
                  const Expanded(
                    child: Text('Genre:',
                        style: TextStyle(
                            fontSize: 18, fontWeight: FontWeight.bold)),
                  ),
                  SizedBox(
                    width: 100,
                    height: 60,
                    child: TextFormField(
                      controller: inputGenreController,
                      enabled: editMode, // Enable/disable based on edit mode
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                      ),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 16),
              Row(
                children: [
                  const Expanded(
                    child: Text('Director:',
                        style: TextStyle(
                            fontSize: 18, fontWeight: FontWeight.bold)),
                  ),
                  SizedBox(
                    width: 100,
                    height: 75,
                    child: TextFormField(
                      controller: inputDirectorController,
                      enabled: editMode, // Enable/disable based on edit mode
                      decoration: const InputDecoration(
                        border: OutlineInputBorder(),
                      ),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  ElevatedButton(
                    onPressed: likeMovie,
                    child: Text('Like'),
                  ),
                  SizedBox(width: 16),
                  ElevatedButton(
                    onPressed: () {
                      // Toggle edit mode
                      if (editMode) {
                        updateMovie();
                      }
                      setState(() {
                        editMode = !editMode;
                      });
                    },
                    child: Text(editMode ? 'Save' : 'Edit'),
                  ),
                  SizedBox(width: 16),
                  ElevatedButton(
                    onPressed: () {
                      deleteMovie();
                      Navigator.pushReplacement(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const MovieListScreen()));
                    },
                    child: Text('Delete'),
                  ),
                ],
              ),
              SizedBox(height: 16),
              Text('Likes: ${movie['likes']}',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              Row(
                children: [
                  const Expanded(
                    child: Text('Comments:',
                        style: TextStyle(
                            fontSize: 18, fontWeight: FontWeight.bold)),
                  ),
                  ElevatedButton(
                    onPressed: () => addComment(),
                    child: Text('Add'),
                  ),
                ],
              ),
              Container(
                height: 200,
                child: ListView.builder(
                  itemCount: movie['comments']?.length ?? 0,
                  itemBuilder: (context, index) {
                    return ListTile(
                      title: Text(
                          json.decode(movie['comments'][index])['user'] ?? ''),
                      subtitle: Text(
                          json.decode(movie['comments'][index])['text'] ?? ''),
                      // Display other comment details as needed
                    );
                  },
                ),
              ),
              SizedBox(height: 16),
              TextField(
                controller: inputController,
                decoration: InputDecoration(
                  labelText: 'Add a comment',
                  border: OutlineInputBorder(),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
