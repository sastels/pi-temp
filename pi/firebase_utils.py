from datetime import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

def setup_firebase(service_account_path):
    cred = credentials.Certificate(service_account_path)
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    return db

def upload_to_firebase(db, pi_id, temperature, humidity):
    now = datetime.now()
    firebase_id = str(now)
    print(firebase_id + " :: temperature= "+ str(temperature), flush=True)
    doc_ref = db.collection(pi_id).document(firebase_id)
    doc_ref.set({
        'pi_id': pi_id,
        'datetime': now,
        'temperature': temperature,
        'humidity': humidity
    })
