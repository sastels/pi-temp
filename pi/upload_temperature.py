import os
import time
import random
from datetime import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from dotenv import load_dotenv
load_dotenv()

PI_ID = os.getenv("PI_ID")

# Use a service account
cred = credentials.Certificate('./service_account.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

while True:
    now = datetime.now()
    temperature = 20.0 + random.random()
    print(f"{PI_ID} :: {now} :: temperature = {temperature}")
    doc_ref = db.collection(u'temperatures').document(f"{PI_ID} :: {now}")
    doc_ref.set({
        'pi_id': PI_ID,
        'datetime': now,
        'temperature': temperature 
    })
    time.sleep(10)
