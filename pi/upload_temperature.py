import os
import time
from dotenv import load_dotenv
from firebase_utils import setup_firebase, upload_to_firebase
from sensor_utils import setup_sensor, read_temp

if __name__ == "__main__":
    load_dotenv()

    pi_id = os.getenv("PI_ID")
    db = setup_firebase('./service_account.json')
    device_file = setup_sensor()

    while True:
        temperature = 22 read_temp(device_file)
        upload_to_firebase(db=db, pi_id=pi_id, temperature=temperature)
        time.sleep(10)
