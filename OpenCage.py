import pandas as pd
from geopy.geocoders import Nominatim, OpenCage
import re

# Initialize the geocoders with unique user-agents
nominatim_geolocator = Nominatim(user_agent="my-geopy-app")
opencage_geolocator = OpenCage(api_key="8f851ac8bd9e40d5b851ed879c88f4bf", user_agent="my-geopy-app")

# Read the CSV file
input_file = 'test.csv'
output_file = 'output/output_dataset02.csv'

# Read the CSV file with no header
df = pd.read_csv(input_file, header=None, names=['Address'])

# Clean and preprocess the addresses
df['Address'] = df['Address'].apply(lambda x: re.sub(r'[^\w\s]', '', x).strip())

# Function to get latitude and longitude using Nominatim
def get_lat_long_nominatim(address):
    try:
        location = nominatim_geolocator.geocode(address)
        if location:
            return location.latitude, location.longitude
        else:
            return None, None
    except Exception as e:
        print(f"Error geocoding {address} with Nominatim: {e}")
        return None, None

# Function to get latitude and longitude using OpenCage (fallback)
def get_lat_long_opencage(address):
    try:
        location = opencage_geolocator.geocode(address)
        if location:
            return location.latitude, location.longitude
        else:
            return None, None
    except Exception as e:
        print(f"Error geocoding {address} with OpenCage: {e}")
        return None, None

# Apply the functions to each address
df[['Latitude', 'Longitude']] = df['Address'].apply(lambda x: pd.Series(get_lat_long_nominatim(x) or get_lat_long_opencage(x)))

# Save the results to a new CSV file
df.to_csv(output_file, index=False)

print(f"Geocoding complete. Results saved to {output_file}.")