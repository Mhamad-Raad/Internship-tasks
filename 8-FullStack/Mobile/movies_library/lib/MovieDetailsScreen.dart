import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:movies_library/main.dart';

class MovieDetailsScreen extends StatefulWidget {
  final Movie movie;

  const MovieDetailsScreen({Key? key, required this.movie}) : super(key: key);

  @override
  _MovieDetailsScreenState createState() => _MovieDetailsScreenState();
}

class _MovieDetailsScreenState extends State<MovieDetailsScreen> {
  List<Comment> comments = [];

  @override
  void initState() {
    super.initState();
    fetchComments();
  }

  Future<void> fetchComments() async {
    final response = await http.get(Uri.parse(
        'http://192.168.1.41:3000/movies/${widget.movie.id}/comments'));

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      setState(() {
        comments = data.map((json) => Comment.fromJson(json)).toList();
      });
    } else {
      throw Exception('Failed to load comments');
    }
  }

  Future<void> likeMovie() async {
    final response = await http.post(
        Uri.parse('http://192.168.1.41:3000/movies/${widget.movie.id}/likes'));

    if (response.statusCode == 200) {
      // Successfully liked the movie, update UI or fetch updated data
    } else {
      print('Failed to like the movie');
    }
  }

  Future<void> deleteMovie() async {
    final response = await http.delete(
        Uri.parse('http://192.168.1.41:3000/movies/${widget.movie.id}'));

    if (response.statusCode == 200) {
      // Successfully deleted the movie, navigate back or show a success message
    } else {
      print('Failed to delete the movie');
    }
  }

  Future<void> addComment(String text) async {
    final response = await http.post(
        Uri.parse(
            'http://192.168.1.41:3000/movies/${widget.movie.id}/comments'),
        body: {'text': text});

    if (response.statusCode == 200) {
      // Successfully added the comment, update UI or fetch updated data
    } else {
      print('Failed to add comment');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Movie Details'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(widget.movie.title,
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            Text(widget.movie.description),
            // Display other movie details as needed

            SizedBox(height: 16),

            ElevatedButton(
              onPressed: likeMovie,
              child: Text('Like'),
            ),

            ElevatedButton(
              onPressed: () {
                // Navigate to the edit screen
                // You can use Navigator.push or other navigation methods
              },
              child: Text('Edit'),
            ),

            ElevatedButton(
              onPressed: () => deleteMovie(),
              child: Text('Delete'),
            ),

            SizedBox(height: 16),

            Text('Comments:',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),

            Expanded(
              child: ListView.builder(
                itemCount: comments.length,
                itemBuilder: (context, index) {
                  return ListTile(
                    title: Text(comments[index].text),
                    // Display other comment details as needed
                  );
                },
              ),
            ),

            SizedBox(height: 16),

            TextField(
              onSubmitted: (text) => addComment(text),
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

class Comment {
  final String text;

  Comment({required this.text});

  factory Comment.fromJson(Map<String, dynamic> json) {
    return Comment(text: json['text']);
  }
}
