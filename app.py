from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, request, redirect, url_for, session

import base64



app = Flask(__name__)

app.secret_key = 'keyhigeh363668ifsgjdgagerFFsdflktgiu'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///table.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ship.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///shot.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///admin.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///prize.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user_prizes.db'
db = SQLAlchemy(app)

class Shot(db.Model):
    __tablename__ = 'shot'
    id = db.Column(db.Integer, primary_key=True)
    xy = db.Column(db.Text, nullable=False)
    id_table = db.Column(db.Text, nullable=False)
    T_F = db.Column(db.Text, nullable=False)
    def __repr__(self):
        return self.login

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.Text, nullable=False)
    login = db.Column(db.Text, nullable=False)
    psw = db.Column(db.Text, nullable=False)
    def __repr__(self):
        return self.login

class Admin(db.Model):
    __tablename__ = 'admin'
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.Text, nullable=False)
    login = db.Column(db.Text, nullable=False)
    psw = db.Column(db.Text, nullable=False)
    def __repr__(self):
        return self.login

class Ship(db.Model):
    __tablename__ = 'ship'
    id = db.Column(db.Integer, primary_key=True)
    id_table = db.Column(db.Integer, nullable=False)
    xy = db.Column(db.Integer, nullable=False)
    prize = db.Column(db.Text, nullable=False)
    def __repr__(self):
        return self.prize

class Table(db.Model):
    __tablename__ = 'table'
    id = db.Column(db.Integer, primary_key=True)
    size = db.Column(db.Integer, nullable=False)
    id_user = db.Column(db.Integer, nullable=False)
    count_shot = db.Column(db.Integer, nullable=False)
    def __repr__(self):
        return str(self.id_user)


class Prize(db.Model):
    __tablename__ = 'prize'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    def __repr__(self):
        return self.login

class User_prizes(db.Model):
    __tablename__ = 'user_prizes'
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, nullable=False)
    id_prize = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return self.login


def check_user_credentials(username, password):

    all_user = User.query.all()
    all_admin = User.query.all()


    for i in all_user:
        # db.session.delete(i)
        i = str(i)
        if username == i:
            return False
    for i in all_admin:
        # db.session.delete(i)
        i = str(i)
        if username == i:
            return False

    return True


@app.route("/", methods=['GET', "POST"])
def reg():

    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        role = "user"
        if password == "admin":
            role = "admin"
        if check_user_credentials(username, password):
            session['login'] = username
            session['logged_in'] = True

            if role == "admin":
                session['role'] = "admin"
                account = Admin(role="admin", login=username, psw=password)
            else:
                session['role'] = "user"
                account = User(role="user", login=username, psw=password)
                db.session.add(account)
                db.session.commit()
                account = User.query.filter_by(login=username).first()
                session['id'] = account.id




            if session['role'] == "user":
                return redirect("/user")
            elif session['role'] == "admin":
                return redirect("/admin")

        else:
            return 'Неверные учетные данные. Попробуйте снова.'
    return render_template('reg.html')


@app.route("/log_in", methods=['GET', "POST"])
def log():

    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if password == "admin":
            log = Admin.query.filter_by(login=username).first()
        else:
            log = User.query.filter_by(login=username).first()
        if log and log.psw == password:

            session['login'] = username
            session['id'] = log.id
            session['logged_in'] = True
            session['role'] = log.role
            if log.role == "user":
                return redirect("/user")
            else:
                return redirect("/admin")
        else:
            return 'Неверные учетные данные. Попробуйте снова.'


    return render_template('log_in.html')




@app.route("/admin")
def admin():

    print(session.get('logged_in'), session.get('role'))
    if session.get('logged_in') and session.get('role') == 'admin':
        prizes = Prize.query.all()
        prize = []
        description = []
        for i in prizes:
            prize.append(i.title)
            description.append(i.description)
        data = {'prize': prize, "description": description}
        return render_template("admin.html", data=data)
    else:
        return redirect("/")



@app.route("/user")
def user():
    if session.get('logged_in') and session.get('role') == 'user':
        table = Table.query.all()
        table = table[::-1]
        print(table)

        for i in table:
            print(i.id_user, i.size, i.count_shot)
            if i.id_user == session.get('id'):
                print("dfhg")
                ship = Ship.query.filter_by(id_table=i.id).all()
                list_ship_id = []
                list_ship_prize = []
                shot = Shot.query.filter_by(id_table=i.id).all()
                list_shot_xy = []
                list_shot_tf = []



                for j in shot:
                    list_shot_xy.append(str(j.xy))
                    list_shot_tf.append(j.T_F)


                for j in ship:
                    list_ship_id.append(str(j.xy))
                    list_ship_prize.append(j.prize)

                prizes = Prize.query.all()
                list_prize = []
                list_prize_id = []
                list_prize_description = []
                for j in prizes:
                    if str(j.id) in list_ship_prize:
                        list_prize.append(j.title)
                        list_prize_id.append(j.id)
                        list_prize_description.append(j.description)


                weight = i.size
                count_shot = i.count_shot
                data = {'weight': weight, "count_shot": count_shot, "list_ship_id":list_ship_id,
                        "list_ship_prize":list_ship_prize, "id_table":i.id, "list_shot_xy":list_shot_xy,
                        "list_shot_tf":list_shot_tf, "list_prize":list_prize, "list_prize_id":list_prize_id,
                        "list_prize_description":list_prize_description}


                return render_template("user.html", data=data)
        data = {'weight': 0, "count_shot" : 0, "list_ship_id":0,
                "list_ship_prize":0, "id_table":0, "list_shot_xy":0,
                "list_shot_tf":0, "list_prize":0, "list_prize_id":0,
                "list_prize_description":0}
        return render_template("user.html", data=data)
    else:
        return redirect("/")

@app.route("/user/prizes")
def user_prizes():
    if session.get('logged_in') and session.get('role') == 'user':
        id_user = session.get('id')
        user_prizes = User_prizes.query.filter_by(id_user=id_user)
        data = []
        for i in user_prizes:
            pr = i.id_prize
            prize = Prize.query.filter_by(id=pr+1).first()
            print(pr)
            data.append(prize.title + ": " + prize.description)

        return render_template("prize.html", data=data)

    return redirect("/")


@app.route("/check", methods=["GET", "POST"])
def check_dates():
    weight = request.form.get("weight")
    count_shot = request.form.get("count_shot")
    user_id = request.form.get("user_id")
    boats_id = request.form.get("boats_id").split(",")
    prizes = request.form.get("prize").split(",")


    table = Table(size=weight, id_user=user_id, count_shot=count_shot)
    db.session.add(table)
    db.session.commit()
    # id = request.form.get("id")

    print(table.id, "id")
    print(weight)

    if boats_id == ['']:
        boats_id = []
    if prizes == ['']:
        prizes = []



    table_id = table.id

    for boat_id, prize in zip(boats_id, prizes):
        ship = Ship(id_table=table_id, xy=boat_id, prize=prize)
        db.session.add(ship)
        db.session.commit()


    return {"status": "success"}

@app.route("/shot", methods=["GET", "POST"])
def check_shot():
    shotxy = request.form.get("shot")
    T_F = request.form.get("T_F")
    id_table = request.form.get("id_table")
    shot = Shot(xy=shotxy, T_F=T_F, id_table=id_table)
    db.session.add(shot)
    db.session.commit()

    return {"status": "success"}

@app.route("/add_prize", methods=["GET", "POST"])
def add_prize():
    title = request.form.get("title")
    description = request.form.get("description")

    prize = Prize(title=title, description=description)
    db.session.add(prize)
    db.session.commit()

    return {"status": "success"}

@app.route("/add_user_prize", methods=["GET", "POST"])
def add_user_prize():
    prize_id = request.form.get("prize_id")


    user_prizes = User_prizes(id_user=session.get('id'), id_prize=prize_id)
    db.session.add(user_prizes)
    db.session.commit()

    return {"status": "success"}



if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=80)