#!/bin/bash
sudo mkdir Recommendations
sudo aws s3 sync s3://skywalkerinflux/Server/Recommendations Recommendations
cd Recommendations
sudo yum install -y docker
sudo service docker start
sudo docker build -t recommendations .
sudo docker run -p 80:80 -t recommendations