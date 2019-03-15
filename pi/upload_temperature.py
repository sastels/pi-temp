import os
import time
from dotenv import load_dotenv
from firebase_utils import setup_firebase, upload_to_firebase
try:
    import Adafruit_DHT
    sensor = Adafruit_DHT.DHT22
    pin = 4
    sensor_installed = True
except:
    sensor_installed = False
    import random

if __name__ == "__main__":
    load_dotenv()
    pi_id = os.getenv("PI_ID", default="testing")
    service_account_file = os.getenv("SERVICE_ACCOUNT", default='/home/pi/Projects/pi-temp/pi/service_account.json')
    measurement_interval = int(os.getenv("INTERVAL", default=60*10))
    db = setup_firebase(service_account_file)
    if sensor_installed:
         time.sleep(60)

    while True:
        try:
            if sensor_installed:
                humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)
            else:
                humidity, temperature = 50 + random.random(), 20 + random.random()
            upload_to_firebase(db=db, pi_id=pi_id, temperature=temperature, humidity=humidity)
            time.sleep(measurement_interval)
        except Exception as e:
            print("Error: " + str(e), flush=True)
            time.sleep(measurement_interval)
