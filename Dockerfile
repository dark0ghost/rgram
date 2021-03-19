FROM DEBIAN:10-slim

RUN apt install python3.9

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app

RUN  apt-get install --no-install-recommends -y python3-distutils
RUN pip install --upgrade pip
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt


COPY . .

RUN sh -ac 'python3 /usr/src/app/manage.py'