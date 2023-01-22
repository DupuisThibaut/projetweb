from flask import Flask, redirect, url_for, request, render_template, session
import sqlite3 as sql
import markdown
# https://pypi.org/project/Markdown/

app = Flask(__name__)
app.secret_key = "aaaaaaaaaaaaa"

def create_table():
    conn = sql.connect('qcm.db')
    cur = conn.cursor()
    cur.execute("DROP TABLE IF EXISTS Users")
    cur.execute("DROP TABLE IF EXISTS Questions")
    cur.execute("DROP TABLE IF EXISTS Reponses")
    cur.execute("DROP TABLE IF EXISTS Etiquette")
    # CREATION TABLE USERS
    cur.execute("""CREATE TABLE Users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        id_question INTEGER,
        FOREIGN KEY ("id_question") REFERENCES "Questions"("id"))
        """)
    # CREATION TABLE QUESTIONS
    cur.execute("""CREATE TABLE Questions(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        enonce TEXT,
        utilisateur TEXT,
        id_user INTEGER,
        FOREIGN KEY ("id_user") REFERENCES "Users"("id"))
        """)
    # CREATION TABLE REPONSES
    cur.execute("""CREATE TABLE Reponses(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        reponse TEXT,
        valeur TEXT,
        id_question INTEGER,
        FOREIGN KEY ("id_question") REFERENCES "Questions"("id"))
        """)
    # CREATION TABLE USERS
    cur.execute("""CREATE TABLE Etiquette(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titre TEXT,
        id_question INTEGER,
        FOREIGN KEY ("id_question") REFERENCES "Questions"("id"))
        """)
    conn.close()


create_table()


conn = sql.connect('qcm.db')
cur = conn.cursor()

eleve = ('Anouar', 'azerty')

cur.execute("INSERT INTO Users (username, password) VALUES (?, ?)", eleve)
conn.commit()
conn.close()

login = {}


@app.route("/")
def index():
    conn = sql.connect('qcm.db')
    cur = conn.cursor()
    res = cur.execute("SELECT * FROM Questions")
    questions = res.fetchall()
    conn.commit()
    conn.close()

    return render_template("index.html", questions=questions)


@app.route('/login', methods=['POST', 'GET'])
def login():
    # https://pythonbasics.org/flask-sqlite/
    error = None
    if request.method == 'POST':
        test = sql.connect('qcm.db')
        cursor = test.cursor()
        username = request.form['username']
        password = request.form['password']
        cursor.execute(
            "SELECT password FROM Users WHERE username=?", (username,))
        response = cursor.fetchone()
        if response[0] == password:
            test.close()
            session['username']=username
            print(session["username"])
            return render_template('index.html', username=username)
        else:
            error = 'identifiant ou mot de passe incorrect'
            test.close()
            return render_template('login.html', error=error)
    return render_template('login.html')


def ajouterQuestion(x,utilisateur):
    conn = sql.connect('qcm.db')
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO Questions(enonce, utilisateur) VALUES (?,?)", (x,utilisateur,))
    conn.commit()
    conn.close()


def ajouterEti(x):
    for i in range(x):
        conn = sql.connect('qcm.db')
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id FROM Questions ORDER BY id DESC")
        question = cursor.fetchone()
        cursor.execute(
            "INSERT INTO Etiquette(titre, id_question) VALUES (?, ?)", (request.form[f'etiquette{i}'], question[0]))
        cursor.execute(
        "SELECT * from Etiquette")
        q=cursor.fetchall()
        print(q)
        conn.commit()
        conn.close()


def ajouterRep(x):
    for i in range(x):
        conn = sql.connect('qcm.db')
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id FROM Questions ORDER BY id DESC")
        question = cursor.fetchone()
        valeur=request.form.get(f'valeur{i}')
        if valeur=="on":
            valeur="vrai"
        else:
            valeur="faux"
        cursor.execute(
            "INSERT INTO Reponses(reponse, valeur, id_question) VALUES (?, ?, ?)", (request.form[f'reponse{i}'], valeur, question[0]))
        conn.commit()
        conn.close()


@ app.route('/new', methods=['GET', 'POST'])
def new():
    msg = None
    if request.method == 'POST':
        # RECUP DES DONNEES FORMULAIRE
        utilisateur = session['username']
        enonce = request.form['enonce']
        nbRep = request.form['nb_rep']
        nbEti = request.form['nb_eti']
        ajouterQuestion(enonce,utilisateur)
        if nbRep=="":
            nbRep=1
        if nbEti=="":
            nbEti=1
        ajouterRep(int(nbRep))
        ajouterEti(int(nbEti))

        # CREATION DE LA QUESTION

        # SELECTION DE LA QUESTION CREE
        # cursor.execute(
        #     "SELECT id FROM Questions DESC")
        # response = cursor.fetchone()
        # CREATION DES REPONSES ASSOCIEES A LA QUESTION
        # for i in range(0, nbRep+1):
        #     cursor.execute(
        #         "INSERT INTO Reponses(reponse) VALUES (?)", (request.form[f'reponse{i}'],))
        # cursor.execute(
        #     "INSERT INTO Reponses(reponse) VALUES (?)", (request.form['reponse'],))
        # conn.commit()
        # CREATION DES ETIQUETTES ASSOCIEES A LA QUESTION
        # for i in range(nbEti-1):
        #     cursor.execute(
        #         "INSERT INTO Etiquette(titre, id_question) VALUES (?, ?)", (request.form[f'etiquette{i}'], response[0]))
        # return render_template('index.html', enonce=enonce)
        return render_template('new.html', eti=nbEti)
    return render_template('new.html')


@ app.route('/apercu/<int:numero>')
# https://flask.palletsprojects.com/en/2.2.x/quickstart/
def apercu(numero):
    question = request.form['enonce']
    reponse = []
    for i in range(numero):
        if request.form['reponse'+str(i)] != None:
            reponse.append(request.form['reponse'+str(i)])
    return render_template("apercu.html", question=question, reponses=reponse)


# @app.route('/new', methods=['GET', 'POST'])
# def new():
#     if request.method == 'POST':
#         msg = ""
#         try:
#             enonce = request.form['enonce']
#             reponse = request.form['reponse']
#             etiquette = request.form['etiquette']
#             with sql.connect("database2.db") as con:
#                 cur = con.cursor()
#                 cur.execute(
#                     "SELECT count(utilisateur) FROM questions WHERE utilisateur=?", (utilisateur))
#                 response = cursor.fetchone()
#                 refQ = utilisateur+str(response)
#                 cur.execute(
#                     "INSERT INTO questions(refQ, utilisateur, enonce, reponse, etiquette) VALUES(?, ?, ?)", (refQ, utilisateur, enonce, reponse, etiquette))
#                 con.commit()
#                 msg = "Record successfully added"
#         except:
#             con.rollback()
#             msg = "error in insert operation"
#         finally:
#             return render_template("index.html", msg=msg)
#             con.close()
#     return render_template('new.html')


# CREATION DE QCM
# @app.route('/new/<utilisateur>', methods=['GET', 'POST'])
# def new2(utilisateur):
#     if request.method == 'POST':
#         try:
#             enonce = request.form['enonce']
#             reponse = request.form['reponse']
#             etiquette = request.form['etiquette']
#             with sql.connect("database2.db") as con:
#                 cur = con.cursor()
#                 cur.execute(
#                     "SELECT count(utilisateur) FROM questions WHERE utilisateur=?", (utilisateur))
#                 response = cursor.fetchone()
#                 refQ = utilisateur+str(response)
#                 cur.execute(
#                     "INSERT INTO questions(refQ, utilisateur, enonce, reponse, etiquette) VALUES(?, ?, ?)", (refQ, utilisateur, enonce, reponse, etiquette))
#                 con.commit()
#                 msg = "Record successfully added"
#         except:
#             con.rollback()
#             msg = "error in insert operation"
#         finally:
#             return render_template("index.html", msg=msg)
#             con.close()
#     return render_template('new.html')


# QCM d'un utilisateur
@ app.route('/mesQCM')
def mesQcm():
    return render_template("qcm.html")


# Creation de compte
@ app.route('/creerCompte', methods=['POST', 'GET'])
def creerCompte():
    # https://pythonbasics.org/flask-sqlite/
    msg = None
    if request.method == 'POST':
        try:
            username = request.form['username']
            password = request.form['password']
            with sql.connect('qcm.db') as con:
                cur = con.cursor()
                cur.execute(
                    "INSERT INTO Users (username,password) VALUES (?,?)", (username, password))
                con.commit()
                msg = "Compte crée"
        except:
            con.rollback()
            msg = "erreur"
        finally:
            con.close()
            session['username']=username
            return render_template('index.html', username=username)
    return render_template('creerCompte.html')


app.run(host='0.0.0.0', port=5000)
if __name__ == '__main__':
    app.run(debug=True)
