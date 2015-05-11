from sqlalchemy import create_engine, Column, Integer, String, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.engine.url import URL


DeclarativeBase = declarative_base()


class Author(DeclarativeBase):

    __tablename__ = 'author'

    name = Column(String(180), nullable=False)
    id = Column(Integer, primary_key=True)

    @property
    def serialize(self):
        # Returns an object data in easily serializeable format
        return {
            'name': self.name,
            'id': self.id,
        }


class Poem(DeclarativeBase):
    __tablename__ = "poem"

    title = Column(String(250), nullable=False)
    id = Column(Integer, primary_key=True)
    poem = Column(Text(), nullable=False)
    author = Column(String(250), nullable=False)
    url = Column(String(350), nullable=False)
    author_id = Column(Integer, ForeignKey('author.id'))

    @property
    def serialize(self):
        # Returns an object data in easily serializeable format
        return {
            'title': self.title,
            'id': self.id,
            'poem': self.poem,
            'author': self.author,
            'url': self.url,
        }
