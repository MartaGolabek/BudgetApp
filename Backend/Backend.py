from flask import Flask, jsonify, request, render_template #import objects from the Flask model
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
from flask_cors import CORS, cross_origin

app = Flask(__name__) # define app using Flask
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'budget.db')
db = SQLAlchemy(app)
ma = Marshmallow(app)

app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/expenses/*": {"origins": "http://localhost:port"}})

class Expense(db.Model):
    ID = db.Column(db.Integer, primary_key=True)
    PRODUCT_NAME = db.Column(db.String(80))
    PRODUCT_CAT = db.Column(db.String(80))
    PRICE = db.Column(db.REAL)

    def __init__(self, ID, PRODUCT_NAME, PRODUCT_CAT, PRICE):
        self.ID = ID
        self.PRODUCT_NAME = PRODUCT_NAME
        self.PRODUCT_CAT = PRODUCT_CAT
        self.PRICE = PRICE


class ExpenseSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ['ID', 'PRODUCT_NAME', 'PRODUCT_CAT', 'PRICE']


expense_schema = ExpenseSchema()
expenses_schema = ExpenseSchema(many=True)


@app.route('/', methods=['GET'])
def home():
    return render_template('home.html')


@app.route('/expenses', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content-Type','Authorization'])
def get_all():
    all_expenses = Expense.query.all()
    return expenses_schema.jsonify(all_expenses)
    # return jsonify({'languages': languages})


@app.route('/expenses/<int:id>', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content-Type','Authorization'])
def get_one(id):
    expense = Expense.query.get(id)
    return expense_schema.jsonify(expense)


@app.route('/expenses', methods=['POST'])
@cross_origin(origin='localhost', headers=['Content-Type','Authorization'])
def add_one():
    # retrieve a name from a request body
    # ID automatically or have to be explicitly set?
    id = int(request.json['id'])
    product_name = request.json['product_name']
    product_cat = request.json['product_cat']
    price = float(request.json['price'])
    new_expense = Expense(id, product_name, product_cat, price)
    db.session.add(new_expense)
    db.session.commit()
    return expense_schema.jsonify(new_expense)


@app.route('/expenses/<int:id>', methods=['PUT'])
@cross_origin(origin='localhost', headers=['Content-Type','Authorization'])
def edit_one(id):
    new_expense = Expense.query.get(id)
    product_name = request.json['product_name']
    product_cat = request.json['product_cat']
    price = request.json['price']
    new_expense.PRODUCT_NAME = product_name
    new_expense.PRODUCT_CAT = product_cat
    new_expense.PRICE = price
    db.session.commit()
    return expense_schema.jsonify(new_expense)


@app.route('/expenses/<int:id>', methods=['DELETE'])
@cross_origin(origin='localhost', headers=['Content-Type','Authorization'])
def remove_one(id):
    remove_expense = Expense.query.get(id)
    db.session.delete(remove_expense)
    db.session.commit()
    return expense_schema.jsonify(remove_expense)


if __name__ == '__main__':
    app.run(debug=True, port=8080) #run app on port 8080 in debug mode
