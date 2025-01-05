import 'package:flutter/material.dart';

class Login extends StatelessWidget{
  const Login({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SizedBox(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        child: Center(
          child: Text("this is my login page"),
        ),
      ),
    );
  }

}