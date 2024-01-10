// add_movie_screen.dart

import 'package:flutter/material.dart';

class AddMovieScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Add Movie'),
      ),
      body: Center(
        child: Text('Add your movie details here.'),
      ),
    );
  }
}
