// cast_screen.dart

import 'package:flutter/material.dart';

class CastScreen extends StatelessWidget {
  dynamic castMembers;

  CastScreen({Key? key, required this.castMembers}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    print(castMembers);
    return Scaffold(
      appBar: AppBar(
        title: Text('Cast Members'),
      ),
      body: ListView.builder(
        itemCount: castMembers.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(castMembers[index]['name']),
            subtitle: Text(castMembers[index]['age'].toString()),
            leading: Text(castMembers[index]['country_of_origin']),
          );
        },
      ),
    );
  }
}
