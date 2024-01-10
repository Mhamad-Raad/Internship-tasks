import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

// ignore: must_be_immutable
class MovieDetailsScreen extends StatefulWidget {
  dynamic movie;

  MovieDetailsScreen({Key? key, required this.movie}) : super(key: key);

  @override
  _MovieDetailsScreenState createState() => _MovieDetailsScreenState();
}

class _MovieDetailsScreenState extends State<MovieDetailsScreen> {
  var inputController = TextEditingController();
  var inputDescriptionController = TextEditingController();
  var inputTitleController = TextEditingController();
  bool editMode = false;

  @override
  void initState() {
    super.initState();
    inputDescriptionController.text = widget.movie['description'];
    inputTitleController.text = widget.movie['title'];
  }

  Future<void> likeMovie() async {
    try {
      final response = await http.post(
        Uri.parse(
            'http://172.16.7.36:3000/movies/${widget.movie['movie_id']}/likes'),
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
      final response = await http.delete(Uri.parse(
          'http://172.16.7.36:3000/movies/${widget.movie['movie_id']}'));

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
            'http://172.16.7.36:3000/movies/${widget.movie['movie_id']}/comments'),
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

  // Function to fetch updated movie details
  Future<void> fetchMovieDetails() async {
    try {
      final response = await http.get(Uri.parse(
          'http://172.16.7.36:3000/movies/${widget.movie['movie_id']}'));
      if (response.statusCode == 200) {
        final Map<String, dynamic> data = json.decode(response.body);
        setState(() {
          widget.movie = data;
        });
      } else {
        print(
            'Failed to fetch updated movie details. Status code: ${response.statusCode}');
      }
    } catch (error) {
      print('Error fetching updated movie details: $error');
    }
  }

  Future<void> updateMovie() async {
    // Implement your logic to send a PUT request to update the movie
    // For example, you can use http package to send a PUT request
    print('works here');
    try {
      final response = await http.put(
        Uri.parse(
          'http://172.16.7.36:3000/movies/${widget.movie['movie_id']}',
        ),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          'description': inputDescriptionController.text,
          'title': inputTitleController.text,
          'release_year': widget.movie['release_year'],
          'genre': widget.movie['genre'],
          'director': widget.movie['director'],
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
    print(widget.movie);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Movie Details'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
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
            ElevatedButton(
              onPressed: likeMovie,
              child: Text('Like'),
            ),
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
            ElevatedButton(
              onPressed: () => deleteMovie(),
              child: Text('Delete'),
            ),
            SizedBox(height: 16),
            Text('Likes: ${widget.movie['likes']}',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            Row(
              children: [
                const Expanded(
                  child: Text('Comments:',
                      style:
                          TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                ),
                ElevatedButton(
                  onPressed: () => addComment(),
                  child: Text('Add'),
                ),
              ],
            ),
            Expanded(
              child: ListView.builder(
                itemCount: widget.movie['comments']?.length ?? 0,
                itemBuilder: (context, index) {
                  return ListTile(
                    title: Text(
                        json.decode(widget.movie['comments'][index])['user'] ??
                            ''),
                    subtitle: Text(
                        json.decode(widget.movie['comments'][index])['text'] ??
                            ''),
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
    );
  }
}
