import 'package:flutter/material.dart';
import 'package:frontend/login.dart';

void main(){
  runApp(const Ips());
}

class Ips extends StatelessWidget{
  const Ips({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: Colors.black,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: const Login(),
    );
  }

}