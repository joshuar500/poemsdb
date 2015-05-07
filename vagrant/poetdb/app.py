from flask import Flask, render_template, request,\
    redirect, url_for, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db_setup import Base, Author, Poem

app = Flask(__name__)

engine = create_engine('sqlite:///poetryandalcohol.db')
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
session = DBSession()


# redirects the user to the index page
@app.route('/back')
def back():
    this_url = ''
    if this_url is None:
        return redirect(url_for(''))
    else:
        return redirect(this_url)


# set up index route
@app.route('/')
def authors():
    authors = session.query(Author).order_by(Author.name).all()
    return render_template('index.html', authors=authors)


# queries all authors
@app.route('/get_author/<string:author_letter>')
def get_authors(author_letter):
    print author_letter
    # order authors by first name
    # TODO: order authors by last name
    authors = session.query(Author).filter(Author.name.startswith(author_letter)).order_by(Author.name).all()
    return render_template('authors.html', authors=authors)


# returns a list of the authors poems in json format
@app.route('/get_poems/<int:author_id>')
def get_author_poems(author_id):
    author = session.query(Author).filter_by(id=author_id).one()
    poems = session.query(Poem).filter_by(author_id=author.id).all()
    return render_template('poems.html', poems=poems)


# returns a single poem in json for jquery update
@app.route('/get_poem/<int:poem_id>')
def get_poem(poem_id):
    poem = session.query(Poem).filter_by(id=poem_id).one()
    return render_template('poem.html', poem=poem)


# returns a single poem in json for jquery update
@app.route('/search')
def search():
    # poem = session.query(Poem).filter_by(id=poem_id).one()
    return render_template('search.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/legal')
def legal():
    return render_template('legal.html')


if __name__ == '__main__':
    app.secret_key = 'super secret key'
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
