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

  @override
  void initState() {
    super.initState();
  }

  Future<void> likeMovie() async {
    try {
      final response = await http.post(
        Uri.parse(
            'http://192.168.1.41:3000/movies/${widget.movie['movie_id']}/likes'),
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
          'http://192.168.1.41:3000/movies/${widget.movie['movie_id']}'));

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
            'http://192.168.1.41:3000/movies/${widget.movie['movie_id']}/comments'),
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
          'http://192.168.1.41:3000/movies/${widget.movie['movie_id']}'));
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

  @override
  Widget build(BuildContext context) {
    print(widget.movie);

    return Scaffold(
      appBar: AppBar(
        title: Text('Movie Details'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(widget.movie['title'],
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            Text(widget.movie['description']),
            // Display other movie details as needed

            SizedBox(height: 16),

            ElevatedButton(
              onPressed: likeMovie,
              child: Text('Like'),
            ),

            ElevatedButton(
              onPressed: () {
              },
              child: Text('Edit'),
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
