import requests
import json

#On envoie une requete pour récupérer les données de l'API en JSON
r = requests.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?aggregateHours=12&combinationMethod=aggregate&includeAstronomy=true&contentType=json&unitGroup=metric&locationMode=single&key=R3CLVF6WWG8ZHAY2Z38T8NIUW&dataElements=default&locations=Tours')

#Ouverture du fichier en écriture afin d'écrire les données 
#issus de la requête API dans un fichier JSON
with open("datacsv.json", "w") as f:
    f.write(r.text)
    f.close()

#On ouvre le fichier que l'on vient de créer et on "charge" l'ensemble
#du texte dans la variable data
with open('databrute.json') as f:
  data = json.load(f)

#On vient ranger les données correctement avec la fonction
# json.dumps
  
arrange_data =  json.dumps(data, indent = 4, sort_keys=False, separators=(", ", ": ",))

#Puis on vient écrire dans un fichier texte les données rangées
with open('test.json','w') as test_file:
    test_file.write(arrange_data)
    test_file.close()



