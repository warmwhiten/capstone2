from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin

import os
import main
import base64

app = Flask(__name__)
CORS(app, resources={r'*': {'origin': '*'}})



@app.route('/result', methods =['POST'])
def result():
    print('hi')
    if request.method == 'POST':
        params = request.json
        print('params', params)
        document = params['document']
        keyword = params['keyword']
        zipNum = params['zip_num']

        res = main.run(document, keyword, int(zipNum))
        print('hi')

        with open('./Image/'+str(res[1])+'.png', 'rb') as img:
            base64_string = base64.b64encode(img.read())
        
        response = {
            "document" : res[0],
            "image": base64_string.decode(),
            "message": "Image is BASE64 encoded"
        }

        return response, 200
        '''
        print('hi')
        req = request.form
        print(req['Keyword'])
        res = main.run(req['Document'], req['Keyword'],int(req['Zip']))
        print(res)
        return render_template("result.html", result = res)
        '''

if __name__ == '__main__':
  app.debug = True
  app.run(host='0.0.0.0', port=80, debug=True)
