#!/bin/bash
sudo mkdir Client
sudo aws s3 sync s3://skywalkerinflux/Client/ Client
cd Client
sudo yum install -y docker
sudo service docker start
sudo docker build -t client .
sudo docker run -p 80:80 -t client 