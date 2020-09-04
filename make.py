import re
import os
import sys
import json

currentPath = sys.path[0]
itemPath = os.path.join(currentPath, 'items')
itemsJson = 'items.json'

if not os.path.exists(itemPath):
  os.makedirs(itemPath)

with open(os.path.join(currentPath, 'items.json')) as f:
  data = json.load(f)

del data['?xml']
del data['items']['@xmlns:xsi']
del data['items']['@xsi:noNamespaceSchemaLocation']
del data['items']['shopcategories']

itemWeights = {}
for itemType in data['items']:
  if type(data['items'][itemType]) is dict:
    if {'@uniquename','@weight'} <= data['items'][itemType].keys():
      with open(os.path.join(itemPath, data['items'][itemType]['@uniquename']), 'w', encoding='utf-8') as f:
        f.write(data['items'][itemType]['@weight'])
  elif type(data['items'][itemType]) is list:
    length = len(data['items'][itemType])
    for i in range(length):
      if {'@uniquename','@weight'} <= data['items'][itemType][i].keys():
        with open(os.path.join(itemPath, data['items'][itemType][i]['@uniquename']), 'w', encoding='utf-8') as f:
          f.write(data['items'][itemType][i]['@weight'])

