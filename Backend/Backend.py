from flask import Flask, jsonify, request, render_template #import objects from the Flask model
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
from flask_cors import CORS, cross_origin
from datetime import datetime

app = Flask(__name__) # define app using Flask
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'budget.db')
db = SQLAlchemy(app)
ma = Marshmallow(app)

app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/expenses/*": {"origins": "http://localhost:port"}})
cors2 = CORS(app, resources={r"/targets/*": {"origins": "http://localhost:port"}})

class Expense(db.Model):
    ID = db.Column(db.Integer, primary_key=True)
    PRODUCT_NAME = db.Column(db.String(80))
    PRODUCT_CAT = db.Column(db.String(80))
    PRICE = db.Column(db.REAL)
    DATE = db.Column(db.Date)

    def __init__(self, ID, PRODUCT_NAME, PRODUCT_CAT, PRICE, DATE):
        self.ID = ID
        self.PRODUCT_NAME = PRODUCT_NAME
        self.PRODUCT_CAT = PRODUCT_CAT
        self.PRICE = PRICE
        self.DATE = DATE


class ExpenseSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ['ID', 'PRODUCT_NAME', 'PRODUCT_CAT', 'PRICE', 'DATE']


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
    product_name = request.json['product_name']
    product_cat = request.json['product_cat']
    price = float(request.json['price'])
    date = datetime.strptime(request.json['date'], '%Y-%m-%d')
    new_expense = Expense(None, product_name, product_cat, price, date)
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
    date = request.json['date']
    new_expense.PRODUCT_NAME = product_name
    new_expense.PRODUCT_CAT = product_cat
    new_expense.PRICE = price
    new_expense.DATE = datetime.strptime(request.json['date'], '%Y-%m-%d')
    db.session.commit()
    return expense_schema.jsonify(new_expense)


@app.route('/expenses/<int:id>', methods=['DELETE'])
@cross_origin(origin='localhost', headers=['Content-Type','Authorization'])
def remove_one(id):
    remove_expense = Expense.query.get(id)
    db.session.delete(remove_expense)
    db.session.commit()
    return expense_schema.jsonify(remove_expense)


class Budget(db.Model):
    ID = db.Column(db.Integer, primary_key=True)
    YEAR = db.Column(db.Integer)
    MONTH = db.Column(db.String(80))
    BUD_VALUE = db.Column(db.REAL)

    def __init__(self, ID, YEAR, MONTH, BUD_VALUE):
        self.ID = ID
        self.YEAR = YEAR
        self.MONTH = MONTH
        self.BUD_VALUE = BUD_VALUE


class BudgetSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ['ID', 'YEAR', 'MONTH', 'BUD_VALUE']


budget_schema = BudgetSchema()
budgets_schema = BudgetSchema(many=True)

@app.route('/targets', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content-Type','Authorization'])
def get_all_budgets():
    all_budgets = Budget.query.all()
    return budgets_schema.jsonify(all_budgets)

@app.route('/targets', methods=['POST'])
@cross_origin(origin='localhost', headers=['Content-Type','Authorization'])
def add_one_budget():
    # retrieve a name from a request body
    YEAR = request.json['year']
    MONTH = request.json['month']
    BUDGET = float(request.json['budget'])
    new_budget = Budget(None, YEAR, MONTH, BUDGET)
    db.session.add(new_budget)
    db.session.commit()
    return budget_schema.jsonify(new_budget)

@app.route('/targets/<int:id>', methods=['PUT'])
@cross_origin(origin='localhost', headers=['Content-Type','Authorization'])
def edit_one_budget(id):
    new_budget = Budget.query.get(id)
    YEAR = request.json['year']
    MONTH = request.json['month']
    BUD_VALUE = request.json['bud_value']
    new_budget.YEAR = YEAR
    new_budget.MONTH = MONTH
    new_budget.BUD_VALUE = BUD_VALUE
    db.session.commit()
    return budget_schema.jsonify(new_budget)

@app.route('/targets/<int:id>', methods=['DELETE'])
@cross_origin(origin='localhost', headers=['Content-Type','Authorization'])
def remove_one_budget(id):
    remove_budget = Budget.query.get(id)
    db.session.delete(remove_budget)
    db.session.commit()
    return budget_schema.jsonify(remove_budget)

if __name__ == '__main__':
    app.run(debug=True, port=8080) #run app on port 8080 in debug mode
