"""Flask REST API"""

from os import environ as ENV

from flask import Flask, render_template, request, jsonify

from dotenv import load_dotenv

from database import get_mongodb_client, create_habit

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/habits', methods=['GET'])
def habits():
    if request.method == 'GET':
        return render_template('habits.html')

    return 'Error 405: Method not allowed'


@app.route('/addGoodHabit', methods=['POST'])
def addGoodHabit():
    """Adds new good habit to database"""
    data = request.get_json()
    habit_name = data['habit_name']
    email = data["email"]

    new_habit = create_habit(habit_name, "good", email)

    return jsonify(new_habit)


@app.route('/addBadHabit', methods=['POST'])
def addBadHabit():
    """Adds new bad habit to database"""
    data = request.get_json()
    habit_name = data['habit_name']
    email = data["email"]

    new_habit = create_habit(habit_name, "bad", email)

    return jsonify(new_habit)


@app.route('/test/<int:number>', methods=['POST'])
def test(number):
    print(f'Hello {number}')
    return jsonify(success=True)


if __name__ == "__main__":

    load_dotenv()

    app.run(debug=True)
