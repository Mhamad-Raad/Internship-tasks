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

  addToQuote() async {
    final response = await http.post(
      Uri.parse(
        'http://192.168.1.41:3000/quotes',
      ),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<dynamic, dynamic>{
        'author': authorController.text,
        'quote': quoteController.text,
      }),
    );

    if (response.statusCode == 200) {
      setState(() {
        quotes.add({
          'author': authorController.text,
          'quote': quoteController.text,
        });
      });
    } else {
      throw Exception('Failed to load quote');
    }

    authorController.clear();
    quoteController.clear();

    print(quotes);
  }

  fetchQuotes() async {
    final response =
        await http.get(Uri.parse('http://192.168.1.41:3000/quotes'));

    if (response.statusCode == 200) {
      print(response.body);
      return (jsonDecode(response.body) as List<dynamic>);
    } else {
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
    });
  }

  deleteAQuote(quote) async {
    final response =
        await http.delete(Uri.parse('http://192.168.1.41:3000/quotes'),
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
            body: jsonEncode({'quote': quote}));

    if (response.statusCode == 200) {
      setState(() {
        quotes.removeWhere((element) => element['quote'] == quote);
      });
    } else {
      throw Exception('Failed to delete quote');
    }
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
                        onPressed: () => {deleteAQuote(quotes[index]['quote'])},
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
