from datetime import datetime, timedelta

from sqlalchemy import (
    Column, DateTime, Enum, ForeignKey, Integer, String, Table, Text, desc,
    Boolean, PrimaryKeyConstraint
)

from sqlalchemy.orm import backref, relationship
from werkzeug.security import check_password_hash, generate_password_hash

from emcit.database import Model


class User(Model):
    """
    User Model.

    Required parameters:
        - email, password
    """

    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated = Column(DateTime, default=datetime.utcnow)
    name = Column(String(255), nullable=False)
    organization = Column(String(255), nullable=True)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(Text, nullable=False)
    phone_number = Column(String(20), nullable=True)
    role = Column(Enum('admin', 'analyzer', 'reporter'), default='reporter')

    def __init__(self, name, organization, email, password, phone_number, role):
        self.name = name
        self.organization = organization
        self.email = email.lower()
        self.set_password(password)
        self.phone_number = phone_number
        self.role = role

    def check_password(self, password):
        """Check a user's password (includes salt)."""
        return check_password_hash(self.password, password)

    def get_id(self):
        """Get the User id in unicode or ascii."""
        try:
            return unicode(self.id)
        except NameError:
            return str(self.id)

    def set_password(self, password):
        """Using pbkdf2:sha512, hash 'password'."""
        self.password = generate_password_hash(
            password=password,
            method='pbkdf2:sha512',
            salt_length=128
        )

    @property
    def is_admin(self):
        return self.role == 'admin'

    @property
    def is_analyzer(self):
        return self.role == 'analyzer'

    @property
    def is_reporter(self):
        return self.role == 'reporter'

    @property
    def is_authenticated(self):
        """Authenticaition check."""
        return True

    @property
    def is_active(self):
        """Active check."""
        return True

    @property
    def is_anonymous(self):
        """Anonimity check."""
        return False

    @classmethod
    def get_users(cls):
        return cls.query.order_by(desc(cls.created_at)).all()

    @classmethod
    def get_by_email(cls, email):
        """Return user based on email."""
        return cls.query.filter(cls.email == email).first()

    def __repr__(self):
        """Return <User: %(email)."""
        return '<User %s>' % (self.email)
