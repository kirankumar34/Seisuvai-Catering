import base64
with open('c:/trail 2/public/images/logo.jpg', 'rb') as f:
    encoded = base64.b64encode(f.read())
    with open('c:/trail 2/logo_base64_full.txt', 'wb') as f2:
        f2.write(encoded)
