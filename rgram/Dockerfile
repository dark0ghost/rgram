FROM debian:11-slim

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update && apt-get upgrade -y
RUN apt-get install --no-install-recommends -y python3.9 npm python3-pip
RUN apt-get install --no-install-recommends -y python3-distutils
RUN apt-get -y install libpq-dev gcc
RUN pip3 install --upgrade pip
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

RUN pip3 install gunicorn

ADD . /usr/src/app

ADD templates /usr/src/app

RUN python3 manage.py migrate
RUN npm --prefix $PWD/frontend run build
