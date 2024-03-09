from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
import pymysql

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'  # JWT 시크릿 키 설정
jwt = JWTManager(app)

# MySQL 연결 설정
connection = pymysql.connect(
    host='localhost',
    user='root',
    password='0177',
    database='unhw',
    port=3306
)

# 회원가입 API
@app.route('/signupForm', methods=['POST'])
def signup():
    data = request.json
    id = data['id']
    pw = data['pw']
    
    cursor = connection.cursor()
    try:
        cursor.execute("INSERT INTO users (id, pw, signupDate) VALUES (%s, %s, NOW())", (id, pw))
        connection.commit()
        return jsonify(message="회원가입이 완료되었습니다."), 200
    except Exception as e:
        print("Error signing up:", e)
        connection.rollback()
        return jsonify(message="회원가입에 실패했습니다."), 500
    finally:
        cursor.close()

# 로그인 API
@app.route('/loginForm', methods=['POST'])
def login():
    data = request.json
    Identification = data['Identification']
    password = data['password']
    
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT * FROM users WHERE id = %s AND pw = %s", (Identification, password))
        user = cursor.fetchone()
        if user:
            access_token = create_access_token(identity=user[0], expires_delta=False)
            return jsonify(message="로그인 성공", token=access_token), 200
        else:
            return jsonify(message="아이디 또는 비밀번호가 올바르지 않습니다."), 401
    except Exception as e:
        print("Error logging in:", e)
        return jsonify(message="로그인에 실패했습니다."), 500
    finally:
        cursor.close()

# 기타 API들을 Flask 형식으로 추가해 나갈 수 있습니다.

if __name__ == '__main__':
    app.run(debug=True)
