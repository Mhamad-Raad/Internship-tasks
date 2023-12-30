import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import '../Widgets/MinSpace.dart';

class AddQuotesScreen extends StatefulWidget {
  const AddQuotesScreen({super.key});

  @override
  State<AddQuotesScreen> createState() => _AddQuotesScreenState();
}

class _AddQuotesScreenState extends State<AddQuotesScreen> {
  final authorController = TextEditingController();
  final quoteController = TextEditingController();

  var quotes = [];

  addToQuote() {
    setState(() {
      quotes.add({
        'author': authorController.text,
        'quote': quoteController.text,
      });
    });

    authorController.clear();
    quoteController.clear();

    print(quotes);
  }

  fetchQuotes() async {
    final response =
        await http.get(Uri.parse('http://192.168.1.41:3000/quotes'));

    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then parse the JSON.
      print(response.body);
      return (jsonDecode(response.body) as List<dynamic>);
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('Failed to load album');
    }
  }

  @override
  void initState() {
    super.initState();
    fetchQuotes().then((result) {
      setState(() {
        quotes = result;
      });
    }).catchError((error) {
      print('Error fetching quotes: $error');
      // Handle the error as needed
    });
  }

  @override
  Widget build(BuildContext context) {
    var screenWidth = MediaQuery.of(context).size.width;
    var screenHeight = MediaQuery.of(context).size.height;

    return SingleChildScrollView(
      child: Container(
        margin: const EdgeInsets.only(top: 20),
        padding: const EdgeInsets.symmetric(horizontal: 10),
        child: Column(
          children: [
            TextField(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                labelText: 'Author',
              ),
              controller: authorController,
            ),
            const MinSpace(),
            TextField(
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                labelText: 'Quote',
              ),
              controller: quoteController,
              maxLines: 2,
            ),
            const MinSpace(),
            ElevatedButton(
              onPressed: addToQuote,
              child: const Text('Add'),
            ),
            Container(
              width: screenWidth,
              height: screenHeight * 0.3,
              color: Colors.grey[300],
              child: ListView.builder(
                itemCount: quotes.length,
                itemBuilder: (context, index) {
                  return Row(
                    children: [
                      Expanded(
                        child: Container(
                          margin: const EdgeInsets.all(10),
                          padding: const EdgeInsets.all(10),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                quotes[index]['author'],
                                style: const TextStyle(
                                  fontSize: 15,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              Text(
                                '-${quotes[index]['quote']}',
                                style: const TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      IconButton(
                        onPressed: () {
                          setState(() {
                            quotes.removeAt(index);
                          });
                        },
                        icon: const Icon(Icons.delete),
                      ),
                    ],
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
