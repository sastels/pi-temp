import os
import time
from dotenv import load_dotenv
from firebase_utils import setup_firebase, upload_to_firebase
import Adafruit_DHT

sensor = Adafruit_DHT.DHT22
pin = 4

if __name__ == "__main__":
    load_dotenv()
    pi_id = os.getenv("PI_ID")
    measurement_interval = os.getenv("INTERVAL", default=60*10)
    db = setup_firebase('/home/pi/Projects/pi-temp/pi/service_account.json')

    time.sleep(60)
    while True:
        try:
            humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)
            upload_to_firebase(db=db, pi_id=pi_id, temperature=temperature, humidity=humidity)
            time.sleep(measurement_interval)
        except Exception as e:
            print("Error: " + str(e), flush=True)
            time.sleep(measurement_interval)
