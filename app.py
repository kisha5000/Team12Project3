from dotenv import load_dotenv
import os
from flask import Flask, render_template, redirect,jsonify
from pymongo import MongoClient


load_dotenv()
# secret = os.getenv("Mongouri")+"/airportweather"
secret = os.getenv("Mongouri")


# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection

client = MongoClient(secret)
db = client.ML_Speed_Dating
# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    
    # Return template and data
    return render_template("index.html")

@app.route("/general_data")
def general():
    # Return all of data from the mongo database
    data = db.General_Data.find({})
    myList = []
    for row in data:
        del row ["_id"]
        myList.append(row)

    
    return jsonify(myList)


@app.route("/combined_features_importance")
def combined():
    # Return all of data from the mongo database
    data = db.Combined_features_Importance.find({})
    myList = []
    for row in data:
        del row ["_id"]
        myList.append(row)

    
    return jsonify(myList)

@app.route("/male_features_importance")
def male():
    # Return all of data from the mongo database
    data = db.Male_features_Importance.find({})
    myList = []
    for row in data:
        del row ["_id"]
        myList.append(row)

    
    return jsonify(myList)

@app.route("/female_features_importance")
def female():
    # Return all of data from the mongo database
    data = db.Female_features_Importance.find({})
    myList = []
    for row in data:
        del row ["_id"]
        myList.append(row)

    
    return jsonify(myList)

if __name__ == "__main__":
    app.run(debug=True)
