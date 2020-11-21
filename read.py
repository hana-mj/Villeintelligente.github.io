import requests

import json

r = requests.get('http://192.168.1.17:3000/positions')

print(r.json())

