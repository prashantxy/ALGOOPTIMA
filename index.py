import pandas as pd
from geopy.geocoders import Nominatim

# Initialize the geocoder with a unique user-agent
geolocator = Nominatim(user_agent="my-geopy-app")

# Read the CSV file
input_file = 'test.csv'
output_file = 'output/output_dataset.csv'

# Read the CSV file with no header
df = pd.read_csv(input_file, header=None, names=['Address'])

# Print column names to verify
print("Columns in the CSV file:", df.columns)

# Function to get latitude and longitude
def get_lat_long(address):
    try:
        location = geolocator.geocode(address)
        if location:
            return location.latitude, location.longitude
        else:
            return None, None
    except Exception as e:
        print(f"Error geocoding {address}: {e}")
        return None, None

# Apply the function to each address
df[['Latitude', 'Longitude']] = df['Address'].apply(lambda x: pd.Series(get_lat_long(x)))

# Save the results to a new CSV file
df.to_csv(output_file, index=False)

print(f"Geocoding complete. Results saved to {output_file}.")