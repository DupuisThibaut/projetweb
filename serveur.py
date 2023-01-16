from flask import Flask
from flask import render_template
from flask import request

from flask import Flask, redirect, url_for, request
app = Flask(__name__)

login={}

@app.route('/dashboard/<name>')
def dashboard(name):
   return 'welcome %s' % name

@app.route('/login',methods = ['POST', 'GET'])
def login():
   if request.method == 'POST':
      user = request.form['name']
      return redirect(url_for('dashboard',name = user))
   else:
      user = request.args.get('name')
      return render_template('login.html')

@app.route('/')
@app.route('/index')
def index():
    return render_template("login.html")

@app.route('/mesQCM')
def mesQcm():
    return render_template("qcm.html")

@app.route('/creerCompte')
def creerCompte():
    return render_template("creerCompte.html")

@app.route('/login/<identifiant>/<mdp>')
def login2(identifiant,mdp):
    if login[identifiant]==mdp:
        return render_template("index.html")
    else: render_template(login.html)

@app.route('/creerCompte/<identifiant>/<mdp>')
def creerCompte2(identifiant,mdp):
    login[identifiant]=mdp
    return render_template("index.html")

@app.route('/hello')
def hello_world():
   return "hello world"

@app.route('/product/<name>')
def get_product(name):
  return "The product is " + str(name)

@app.route('/sale/<transaction_id>')
def get_sale(transaction_id=0):
  return "The transaction is "+str(transaction_id)

@app.route('/create/<first_name>/<last_name>')
def create(first_name=None, last_name=None):
  return 'Hello ' + first_name + ',' + last_name

app.run(host='0.0.0.0', port=5000)
if __name__ == '__main__':
   app.run(debug = True)