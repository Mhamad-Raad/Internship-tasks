import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:movies_library/MovieDetailsScreen.dart';

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
  List movies = [];

  Future<void> fetchMovies() async {
    print('works');
    final response =
        await http.get(Uri.parse('http://192.168.1.41:3000/movies'));
    print('here: $response');

    if (response.statusCode == 200) {
      final List<dynamic> data = await json.decode(response.body);
      print(data);
      setState(() {
        movies = data;
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
  final movie;

  const MovieCard({Key? key, required this.movie}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        title: Text(
          movie['title'],
          // style the text blakc and big
          style: const TextStyle(
            color: Colors.black,
            fontSize: 24,
          ),
        ),
        subtitle: Text(movie['description']),
        onTap: () {
          Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (context) => MovieDetailsScreen(movie: movie)));
        },
      ),
    );
  }
}
