import 'package:flutter/material.dart';

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
          ],
        ),
      ),
    );
  }
}
