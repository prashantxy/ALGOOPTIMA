import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from math import ceil, floor

# Load and process the CSV file
@st.cache
def load_data(file_path):
    df = pd.read_csv(file_path)
    if 'No. of Buses' not in df.columns:
        st.error("Error: Column 'No. of Buses' does not exist in the CSV file.")
        return None
    return df

# New adjustment logic ensuring integer output
def adjustment(baseline, actual, current, weight):
    ans = 0
    if actual == baseline:
        return int(current)
    if actual > baseline:
        den = ceil(actual / 100)
        den2 = baseline / 100
        ans = current - abs(den - den2) * weight
    elif actual < baseline:
        den = floor(actual / 100)
        den2 = baseline / 100
        ans = current + abs(den - den2) * weight
    return max(5, int(ans))  # Ensure frequency doesn't go below a minimum threshold and is integer

# Plot comparison between initial and adjusted frequencies
def plot_comparison(initial_df, adjusted_df):
    fig, ax = plt.subplots(figsize=(12, 6))
    time_slots = [f'Time Slot {i+1}' for i in range(9)]
    for i in range(9):
        ax.plot(initial_df['Frequency'], label=f'Initial Frequency Time Slot {i+1}', linestyle='--')
        ax.plot(adjusted_df[f'Adjusted_Frequency_{i+1}'], label=f'Adjusted Frequency Time Slot {i+1}')
    
    ax.set_xlabel('Route No.')
    ax.set_ylabel('Frequency')
    ax.set_title('Comparison of Initial and Adjusted Frequencies')
    ax.legend()
    st.pyplot(fig)

# Streamlit app
st.title("Bus Frequency Adjustment and Visualization")

uploaded_file = st.file_uploader("Upload your CSV file", type=["csv"])
if uploaded_file is not None:
    df = load_data(uploaded_file)
    
    if df is not None:
        st.subheader("Initial Data")
        st.write(df.head())

        # Processing using the new adjustment logic
        baseline_density = df['Density'].mean()

        # Weights for each of the 9 time slots
        weights = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25]

        for i in range(9):
            df[f'Adjusted_Frequency_{i+1}'] = df.apply(lambda row: int(adjustment(baseline_density, row['Density'], row['Frequency'], weights[i])), axis=1)
            df[f'Bus_Requirement_{i+1}'] = df[f'Adjusted_Frequency_{i+1}'] * df['No. of Buses']

        st.subheader("Adjusted Data")
        st.write(df.head())

        # Plot comparison
        st.subheader("Frequency Comparison")
        plot_comparison(df, df)  # Adjust to plot initial vs adjusted

        # Download link for adjusted CSV based on weights
        for i in range(9):
            adjusted_csv = df[[f'Adjusted_Frequency_{i+1}', f'Bus_Requirement_{i+1}']].astype(int).to_csv(index=False)
            st.download_button(label=f"Download Adjusted Data for Time Slot {i+1}",
                               data=adjusted_csv,
                               file_name=f'outputfile_{i+1}.csv',
                               mime='text/csv')
