import urllib.request, json, urllib.error
try:
    req = urllib.request.Request('https://web-pondok-titis.onrender.com/api/rooms/b9fc93d7-77ea-4a68-8ce6-05e635fa4e0b', method='PUT', data=json.dumps({'status': 'Tidak Tersedia'}).encode('utf-8'), headers={'Content-Type': 'application/json'})
    urllib.request.urlopen(req, timeout=10)
    print('SUCCESS')
except urllib.error.HTTPError as e:
    print(e.read().decode())
