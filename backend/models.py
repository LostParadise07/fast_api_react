from sqlalchemy import Table, Column , MetaData
from sqlalchemy.sql.sqltypes import Boolean, Integer, String, Text
from database import engine
from sqlalchemy.sql.schema import ForeignKey

meta = MetaData()

Users = Table('Users', meta,
    Column('id', Integer, unique=True, primary_key=True),
    Column('username',String,unique=True,primary_key=True),
    Column('email', String),
    Column('is_superuser',Boolean),
    Column('password', String),
)

SavedArticles = Table('SavedArticles', meta,
    Column('id', Integer, unique=True, primary_key=True),
    Column('username', String, ForeignKey('Users.username')),
    Column('title', String),
    Column('url', String),
    Column('summary', Text),
    Column('tags', String), 
)

meta.create_all(engine)