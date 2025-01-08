import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:frontend/components/background.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class Register extends StatefulWidget {
  const Register({super.key});

  @override
  State<Register> createState() => _RegisterState();
}

TextEditingController usernameController = TextEditingController();
TextEditingController passwordController = TextEditingController();

late SharedPreferences sharedPreferences;

class _RegisterState extends State<Register> {
  @override
  void initState() {
    initSharedPref();
    super.initState();
  }

  void initSharedPref() async {
    sharedPreferences = await SharedPreferences.getInstance();
  }

  void loginUser() async {
    if (usernameController.text.isNotEmpty &&
        passwordController.text.isNotEmpty) {
      var body = {
        "username": usernameController.text.trim(),
        "password": passwordController.text.trim()
      };

      var response = await http.post(
        Uri.parse("http://localhost:3000/register"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode(body),
      );

      var jsonRes = await jsonDecode(response.body);

      if (jsonRes["success"] == true) {
        sharedPreferences.setString("token", jsonRes["token"]);
        print(jsonRes["token"]);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Background(
            child: Column(
      children: [
        SizedBox(
          height: MediaQuery.of(context).size.height * 0.15,
        ),
        SizedBox(
          height: MediaQuery.of(context).size.height * 0.65,
          child: Column(
            children: [
              TextField(
                controller: usernameController,
                decoration: InputDecoration(
                    hintText: "Username",
                    labelText: "Username",
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12))),
              ),
              SizedBox(
                height: 20,
              ),
              TextField(
                controller: passwordController,
                decoration: InputDecoration(
                    hintText: "Password",
                    labelText: "Password",
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12))),
                obscureText: true,
              ),
              SizedBox(
                height: 20,
              ),
              ElevatedButton(
                  onPressed: () {
                    loginUser();
                    print(usernameController.text);
                    print(passwordController.text);
                  },
                  child: Text("Register"))
            ],
          ),
        ),
        SizedBox(
          height: MediaQuery.of(context).size.height * 0.2,
        )
      ],
    )));
  }
}
