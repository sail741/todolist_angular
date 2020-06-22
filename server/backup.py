import json
import requests
import sys
import os

__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
filename = "db_backup.json"

if len(sys.argv) > 1:
    filename = sys.argv[1]

file_fullpath = os.path.join(__location__, filename)

db = requests.get('API_URL/db')
data = db.json()
with open(file_fullpath, 'w') as f:
    json.dump(data, f)