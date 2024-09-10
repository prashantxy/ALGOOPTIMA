import osmnx as ox
import networkx as nx
import geopandas as gpd
from shapely.geometry import Point
import matplotlib.pyplot as plt

# Load the bus stop data (latitude and longitude)
# Assuming you have a CSV file with latitude and longitude columns
import pandas as pd

# Replace 'your_file.csv' with the path to your dataset
df = pd.read_csv('cleaned_output_dataset.csv')

# Convert the data to a GeoDataFrame
gdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.Latitude, df.Longitude))

# Set the CRS (Coordinate Reference System)
gdf.set_crs(epsg=4326, inplace=True)

# Define the bounding box (bbox) for the area you want to consider for route optimization
# This can be based on the bounding box of your bus stops or a specific area
north, south, east, west = gdf.geometry.y.max(), gdf.geometry.y.min(), gdf.geometry.x.max(), gdf.geometry.x.min()

# Download the road network from OpenStreetMap within the bounding box
G = ox.graph_from_bbox(north, south, east, west, network_type='drive')

# Project the graph for more accurate distance calculations
G_proj = ox.project_graph(G)

# Get the nearest nodes in the network to the bus stops
# These nodes represent where the bus stops are located on the road network
nearest_nodes = [ox.distance.nearest_nodes(G, point.x, point.y) for point in gdf.geometry]

# Create a function to calculate the shortest route between two stops
def get_shortest_route(G, origin_node, destination_node):
    return nx.shortest_path(G, origin_node, destination_node, weight='length')

# Calculate the shortest path between consecutive stops
routes = []
for i in range(len(nearest_nodes) - 1):
    origin = nearest_nodes[i]
    destination = nearest_nodes[i+1]
    route = get_shortest_route(G_proj, origin, destination)
    routes.append(route)

# Plot the routes on the map
fig, ax = ox.plot_graph_routes(G_proj, routes, route_linewidth=3, node_size=0, bgcolor='w')

# Save the plot if needed
plt.savefig("optimized_bus_routes.png")

# Show the plot
plt.show()

