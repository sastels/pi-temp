import os
import time
import random
from dotenv import load_dotenv
from firebase_utils import setup_firebase, upload_to_firebase
from sensor_utils import setup_sensor, read_temp

if __name__ == "__main__":
    load_dotenv()

    pi_id = os.getenv("PI_ID")
    db = setup_firebase('./service_account.json')
    device_file = setup_sensor()

    while True:
        temperature = read_temp(device_file)
        upload_to_firebase(db, pi_id, temperature)
        time.sleep(10)
