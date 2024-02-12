from flask import Flask, request, jsonify # pip install Flask
import pymysql # pip install PyMySQL
import jwt # pip install PyJWT
import datetime
import os

app = Flask(__name__)

# MariaDB 연결 설정
connection = pymysql.connect(
    host="database-1.ctgo6osmy1q0.ap-northeast-2.rds.amazonaws.com",
    user="admin",
    password="gerrard177!",
    database="unhw",
    port=3306,
)

# 회원가입 API 엔드포인트
@app.route("/signupForm", methods=["POST"])
def signup():
    data = request.json
    Identification = data.get("Identification")
    pw = data.get("pw")

    try:
        with connection.cursor() as cursor:
            query = "INSERT INTO users (id, pw) VALUES (%s, %s)"
            cursor.execute(query, (Identification, pw))
            connection.commit()
            return jsonify({"message": "회원가입이 완료되었습니다."}), 200
    except Exception as e:
        print("Error signing up:", e)
        return jsonify({"message": "회원가입에 실패했습니다."}), 500

# 로그인 API 엔드포인트
@app.route("/loginForm", methods=["POST"])
def login():
    data = request.json
    Identification = data.get("Identification")
    password = data.get("password")

    try:
        with connection.cursor() as cursor:
            query = "SELECT * FROM users WHERE id = %s AND password = %s AND admin = 1"
            cursor.execute(query, (Identification, password))
            result = cursor.fetchone()

            if result:
                tokenPayload = {"username": result["username"]}
                token = jwt.encode(tokenPayload, os.getenv("SECRET_KEY"), algorithm="HS256")
                return jsonify({"message": "로그인 성공", "token": token}), 200
            else:
                return jsonify({"message": "아이디 또는 비밀번호가 올바르지 않습니다."}), 401
    except Exception as e:
        print("Error logging in:", e)
        return jsonify({"message": "로그인에 실패했습니다."}), 500

# 채팅 입력 API 엔드포인트
