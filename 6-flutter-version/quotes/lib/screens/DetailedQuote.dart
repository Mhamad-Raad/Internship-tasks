import 'package:flutter/material.dart';
import 'package:quotes/Widgets/MinSpace.dart';

class DetailedQuote extends StatelessWidget {
  var quote = {};
  DetailedQuote({super.key, required this.quote});

  @override
  Widget build(BuildContext context) {
    var screenWidth = MediaQuery.of(context).size.width;
    var screenHeight = MediaQuery.of(context).size.height;
    return Container(
      width: screenWidth,
      height: screenHeight,
      color: Colors.grey[300],
      child: Column(
        children: [
          Expanded(
            child: Container(
              margin: const EdgeInsets.all(20),
              padding: const EdgeInsets.all(30),
              width: screenWidth,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Column(
                children: [
                  Text(
                    quote['quote'],
                    style: const TextStyle(
                      fontSize: 20,
                    ),
                  ),
                  const MinSpace(),
                  Text(
                    quote['author'],
                    style: const TextStyle(
                      fontSize: 15,
                    ),
                  ),
                ],
              ),
            ),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
            },
            child: const Text('Back'),
          ),
        ],
      ),
    );
  }
}
