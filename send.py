import json
import requests
import pprint

url = 'http://127.0.0.1:3000/mesures'
data = {"sensor" : "dht11" , "valeur" : "25", "idplante" : "0"}
data_json = json.dumps(data)
headers = {'Content-type': 'application/json'}
response = requests.post(url, data=data_json, headers=headers)
pprint.pprint(response.json())

