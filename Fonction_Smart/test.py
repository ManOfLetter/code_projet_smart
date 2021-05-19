# -*- coding: utf-8  -*-

import serial
import requests
import csv

port="/dev/ttymxc5"
debit=115200

try :
	serialPort = serial.Serial(port, debit)
	print("Ouverture du port série ok")
except:
	print("Echec ouverture port série")

#serialPort.write("Test" +'\n')

#On envoie une requete pour récupérer les données de l'API en JSON
r = requests.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?aggregateHours=12&combinationMethod=aggregate&includeAstronomy=true&contentType=csv&unitGroup=metric&locationMode=single&key=R3CLVF6WWG8ZHAY2Z38T8NIUW&dataElements=default&locations=Tours')

#Ouverture du fichier en écriture afin d'écrire les données 
#issus de la requête API dans un fichier JSON
with open("datacsv.csv", "w") as f:
    f.write(r.text)
    f.close()

#On ouvre le fichier que l'on vient de créer et on "charge" l'ensemble
#du texte dans la variable data
with open('datacsv.csv', mode='r') as csv_file:
	csv_reader = csv.DictReader(csv_file)
	line_count = 0
	for row in csv_reader:
		moonphase = row["Moon Phase"]
		mp = str(int(float(moonphase)*100))
		print(mp)
		#serialPort.write(mp)
		line_count =+ 1
		if line_count == 1:
			break

serialPort.write("0")