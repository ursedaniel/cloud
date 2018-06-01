from flask import Flask, json, request
from flask_cors import CORS, cross_origin

from pymongo import MongoClient
import datetime

import hashlib

def encrypt_string(hash_string):
    sha_signature = \
        hashlib.sha256(hash_string.encode()).hexdigest()
    return sha_signature


app = Flask(__name__)
# app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
# app.config['CORS_HEADERS'] = 'Content-Type'

CORS(app)



@app.route('/')
def index():

    return "Hello world!"

@app.route('/register', methods=['POST'])
def register():

    collection = db['Users']
    email = request.args.get('email')
    password = request.args.get('parola')
    cnp = request.args.get('cnp')
    nrinm = request.args.get('nrinmatriculare')
    balanta = 0

    valReturn = {}
    insert_dict = {}

    if email == None or password == None or cnp == None or nrinm == None:

        valReturn['message'] = 'Wrong format'
        response = app.response_class(
            response=json.dumps(valReturn),
            status=400,
            mimetype='application/json'
            )
        return response


    checkUser = collection.find_one({"email": email})
    checkCNP = collection.find_one({"cnp": cnp})
    checkNRinm = collection.find_one({"nrinm": nrinm})

    if checkUser is None and checkCNP is None and checkNRinm is None:
        insert_dict['email'] = email
        insert_dict['password'] = str(encrypt_string(password))
        insert_dict['cnp'] = cnp
        insert_dict['nrinm'] = nrinm
        insert_dict['balance'] = balanta

        collection.insert_one(insert_dict)

        valReturn['message'] = 'Ok'

        response = app.response_class(
            response=json.dumps(valReturn),
            status=200,
            mimetype='application/json'
            )

        return response

    else:

        valReturn['message'] = 'User already exists'

        response = app.response_class(
            response=json.dumps(valReturn),
            status=200,
            mimetype='application/json'
            )
        return response

@app.route('/login', methods=['POST'])
def login():


    collection = db['Users']

    email = request.args.get('email')
    password = request.args.get('parola')

    checkUser = collection.find_one({"email": email})

    if checkUser is not None and checkUser['password'] == str(encrypt_string(password)):

        data = {}
        data['message'] = 'Ok'
        response = app.response_class(
            response=json.dumps(data),
            status=200,
            mimetype='application/json'
            )
        return response
    else:
        data = {}
        data['message'] = 'Login failed'

        response = app.response_class(
            response=json.dumps(data),
            status=400,
            mimetype='application/json'
            )
        return response


@app.route('/addarticle', methods=['POST'])
def addarticle():

    collection = db['Articles']

    lat = request.args.get('lat')
    longg = request.args.get('long')
    descriere = request.args.get('descriere')
    interval = request.args.get('interval')
    pret = request.args.get('pret')

    status = False
    chirias = '-'
    nr_reports = 0


    max_value = collection.find_one(sort=[("uid", -1)])

    print(max_value)

    new_id = int(max_value['uid']) + 1

    insert_dict = {}

    insert_dict['uid'] = int(new_id)
    insert_dict['lat'] = lat
    insert_dict['long'] = longg
    insert_dict['description'] = descriere
    insert_dict['interval'] = interval
    insert_dict['price'] = int(pret)
    insert_dict['status'] = status
    insert_dict['chirias'] = chirias
    insert_dict['nr_reports'] = nr_reports
    insert_dict['link'] = "http://localhost:4200/article/" + str(new_id)

    collection.insert_one(insert_dict)

    data = {}
    data['message'] = 'Article added'

    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
        )

    return response


@app.route('/article/<a_id>', methods=['GET'])
def getarticle(a_id):

    collection = db['Articles']
    idgiven = a_id
    print("Got the id:",idgiven)

    get_id = collection.find_one({"uid": int(idgiven)})

    data = {}
    if get_id is None:

        data['message'] = 'Id does not exist'
        response = app.response_class(
            response=json.dumps(data),
            status=400,
            mimetype='application/json'
            )

        return response
    else:

        get_id.pop("_id",None)


        response = app.response_class(
            response=json.dumps(get_id),
            status=200,
            mimetype='application/json'
            )

        return response

@app.route('/article/<a_id>/occupy', methods=['POST'])
def occupyArticle(a_id):

    collection = db['Articles']
    collectionUsers = db['Users']

    idgiven = a_id

    print("Occupy id:",idgiven)

    email = request.args.get("email")
    minutes = request.args.get("minutes")

    get_id = collection.find_one({"uid": int(idgiven)})
    data = {}

    if get_id is None:

        data['message'] = 'Id does not exist'
        response = app.response_class(
            response=json.dumps(data),
            status=400,
            mimetype='application/json'
            )
        return response
    else:

        if get_id['status'] == False:

            emailClient = collectionUsers.find_one({"email": email})

            balance = emailClient['balance']
            articleGet = collection.find_one({"uid": int(idgiven)})
            pricePlace = articleGet['price']

            if int(pricePlace) / 60 * int(minutes) > int(balance):

                data['message'] = 'Insufficient funds'
                response = app.response_class(
                    response=json.dumps(data),
                    status=400,
                    mimetype='application/json'
                    )
                return response

            emailClient['balance'] = int(balance) - int(pricePlace) / 60 * int(minutes)
            collectionUsers.update({"email": email}, {"$set": emailClient})
            get_id['status'] = True
            get_id['chirias'] = email

            d1 = datetime.datetime.now() + datetime.timedelta(minutes=int(minutes))
            get_id['expiry_date'] = d1

            collection.update({"uid": int(idgiven)}, {"$set": get_id})

            data['message'] = 'Updated'
            response = app.response_class(
                response=json.dumps(data),
                status=200,
                mimetype='application/json'
                )

            return response

        else:

            data['message'] = 'Space already busy'
            response = app.response_class(
                response=json.dumps(data),
                status=401,
                mimetype='application/json'
                )

            return response

@app.route('/article/<a_id>/report', methods=['POST'])
def reportUser(a_id):

    collection = db['Articles']

    getId = int(a_id)

    getArticle = collection.find_one({"uid": getId})
    getArticle['nr_reports'] = getArticle['nr_reports'] + 1

    collection.update({"uid": getId}, {"$set": getArticle})

    data = {}
    data['message'] = 'Report added'
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
        )

    return response


@app.route('/articles', methods=['GET'])
def getArticles():

    collection = db['Articles']

    cursor = collection.find()

    list_of_articles = []

    for elem in cursor:

        if elem['uid'] != 0:
            current_dict = elem

            if current_dict['status'] == True:
                current_dict.pop("_id",None)

                if datetime.datetime.now() > current_dict['expiry_date']:
                    current_dict['status'] = False
                    current_dict['chirias'] = '-'
                    collection.update({"uid": current_dict['uid']}, {"$set": current_dict})
                    list_of_articles.append(current_dict)

                # list_of_articles.append(current_dict)
            else:
                current_dict.pop("_id",None)
                list_of_articles.append(current_dict)

    response = app.response_class(
       response=json.dumps(list_of_articles),
       status=200,
       mimetype='application/json'
       )

    return response  


@app.route('/user', methods=['GET','PUT'])
def getUser():

    collection = db['Users']

    if request.method == 'GET':
        email = request.args.get('email')

        getUser = collection.find_one({"email": email})

        if getUser is None:

            data = {}
            data['message'] = 'User not found'

            response = app.response_class(
                response=json.dumps(data),
                status=400,
                mimetype='application/json'
                )
            return response

        getUser.pop("_id",None)

        response = app.response_class(
           response=json.dumps(getUser),
           status=200,
           mimetype='application/json'
           )    

        return response
    else:

        money = request.args.get('money')
        email = request.args.get('email')

        getUser = collection.find_one({"email": email})

        if getUser is None:

            data = {}
            data['message'] = 'User not found'

            response = app.response_class(
                response=json.dumps(data),
                status=200,
                mimetype='application/json'
                )
            return response

        getUser['balance'] = getUser['balance'] + int(money)

        collection.update({"email": email}, {"$set": getUser})

        data = {}
        data['message'] = 'Money added'

        response = app.response_class(
            response=json.dumps(data),
            status=200,
            mimetype='application/json'
            )

        return response 


client = MongoClient('mongodb://localhost:27017/')
db = client['CloudComputing']

app.run(debug=True)