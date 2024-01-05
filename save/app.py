from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import mysql.connector # pip install mysql-connector-python
import os

PORT = 3213
JSON_PATH = "index.json"
HTML_PATH = "index.html"
COMP_PATH = "./component.js"

# MySQL 데이터베이스 연결 설정
connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="0177",
    database="shop"
)

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        if self.path == "/":
            with open(HTML_PATH, "r") as file:
                self.send_response(200)
                self.send_header("Content-type", "text/html")
                self.end_headers()
                self.wfile.write(file.read().encode())
        elif self.path == "/component.js":
            with open(COMP_PATH, "r") as file:
                self.send_response(200)
                self.send_header("Content-type", "application/javascript")
                self.end_headers()
                self.wfile.write(file.read().encode())
        elif self.path == "/mariaDB":
            cursor = connection.cursor(dictionary=True)
            cursor.execute("SELECT * FROM product")
            results = cursor.fetchall()
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(results).encode())

    def do_POST(self):
        if self.path == "/loadData":
            with open(JSON_PATH, "r") as file:
                data = json.load(file)
                self.send_response(200)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps(data).encode())
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Endpoint not found")


def run_server():
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    print(f"Server is running on http://localhost:{PORT}/")
    httpd.serve_forever()


if __name__ == "__main__":
    run_server()
