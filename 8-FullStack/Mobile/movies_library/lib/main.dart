import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Movie Library',
      home: MovieListScreen(),
    );
  }
}

class MovieListScreen extends StatefulWidget {
  const MovieListScreen({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _MovieListScreenState createState() => _MovieListScreenState();
}

class _MovieListScreenState extends State<MovieListScreen> {
  List<Movie> movies = [];

  Future<void> fetchMovies() async {
    print('works');
    final response =
        await http.get(Uri.parse('http://192.168.1.41:3000/movies'));
    print('here: $response');

    if (response.statusCode == 200) {
      final List<dynamic> data = await json.decode(response.body);
      print(data);
      setState(() {
        movies = data.map((json) => Movie.fromJson(json)).toList();
      });
      print('object');
    } else {
      throw Exception('Failed to load movies');
    }
  }

  @override
  void initState() {
    super.initState();
    fetchMovies();
  }

  @override
  Widget build(BuildContext context) {
    print('trigered');
    return Scaffold(
      appBar: AppBar(
        title: const Text('Movie Library'),
      ),
      body: ListView.builder(
        itemCount: movies.length,
        itemBuilder: (context, index) {
          print(movies);
          return MovieCard(movie: movies[index]);
        },
      ),
    );
  }
}

class MovieCard extends StatelessWidget {
  final Movie movie;

  const MovieCard({Key? key, required this.movie}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        title: Text(
          movie.title,
          // style the text blakc and big
          style: const TextStyle(
            color: Colors.black,
            fontSize: 24,
          ),
        ),
        subtitle: Text(movie.description),
        onTap: () {
          // Navigate to a screen to show movie details (similar to web version)
        },
      ),
    );
  }
}

class Movie {
  final int id;
  final String title;
  final String description;
  // Add other fields as needed

  Movie({required this.id, required this.title, required this.description});

  factory Movie.fromJson(Map<String, dynamic> json) {
    return Movie(
      id: json['movie_id'],
      title: json['title'],
      description: json['description'],
      // Parse other fields from the JSON response
    );
  }
}
