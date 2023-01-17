from flask import Flask
from flask import render_template
from flask import request
import sqlite3 as sql

from flask import Flask, redirect, url_for, request
app = Flask(__name__)

login={}

@app.route('/login', methods=['POST', 'GET'])
def login():
  #https://pythonbasics.org/flask-sqlite/
    error = None
    if request.method == 'POST':
      test=sql.connect('database.db')
      cursor=test.cursor()
      iden=request.form['username']
      cursor.execute("SELECT mdp FROM user WHERE id=?", (iden))
      response = cursor.fetchone()
      password=request.form['password']
      if response[0]==password:
          test.close()
      else:
          error = 'identifiant ou mot de passe incorrect'
          test.close()
          return render_template('login.html', error=error)
    test.close()
    return render_template('index.html')

@app.route('/')
@app.route('/index')
def index():
    return render_template("login.html")

@app.route('/mesQCM')
def mesQcm():
    return render_template("qcm.html")

@app.route('/creerCompte', methods=['POST', 'GET'])
def creerCompte():
  #https://pythonbasics.org/flask-sqlite/
    msg = None
    if request.method == 'POST':
      try:
        iden=request.form['username']
        mdp=request.form['password']
        with sql.connect('database.db') as con :
          cur=con.cursor()
          cur.execute("INSERT INTO user (id,mdp) VALUES (?,?)",(iden,mdp))
          con.commit()
          msg="Compte crée"
      except:
        con.rollback()
        msg="erreur"
      finally:
        return redirect('http://localhost:8888/')
        con.close()
    return render_template('creerCompte.html')

app.run(host='0.0.0.0', port=8888)
if __name__ == '__main__':
   app.run(debug = True)
