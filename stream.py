import streamlit as st
import matplotlib.pyplot as plt
import numpy as np
from collections import deque

def print_queue(q):
    return ' '.join(map(str, q))

def visualize_queues(times, active_states, rest_states):
    fig, ax = plt.subplots(figsize=(12, 6))
    time_ticks = np.arange(0, max(times) + 1, 60)

    ax.step(times, active_states, where='post', label='Active Crews', linestyle='-', marker='o')
    ax.step(times, rest_states, where='post', label='Resting Crews', linestyle='--', marker='x')

    ax.set_xlabel('Time')
    ax.set_ylabel('Number of Crews')
    ax.set_title('Active and Resting Crews Over Time')
    ax.set_xticks(time_ticks)
    ax.set_xticklabels([str(t) for t in time_ticks])
    ax.legend()
    plt.grid(True)
    st.pyplot(fig)

def main():
    st.title("Crew Scheduling Simulation")

    # Slider for the number of crews
    n = st.slider("Number of Crews", min_value=1, max_value=100, value=10)
    time = 240
    shift_duration = 60
    rest_duration = 60

    active = deque()
    rest = deque()

    # Arrays with dummy data (for demonstration)
    arr1 = [i + 1 for i in range(n)]

    # Initialize active crews
    for i in range(n):
        active.append(i + 1)

    times = []
    active_states = []
    rest_states = []

    # Form for adding a crew to the rest queue
    with st.form(key='add_crew_form'):
        crew_id = st.number_input("Crew ID to Add to Rest Queue", min_value=1, max_value=n, value=1)
        submit_button = st.form_submit_button(label='Add Crew to Rest Queue')

        if submit_button:
            if crew_id in active:
                active.remove(crew_id)
                rest.append(crew_id)
            else:
                st.write(f"Crew ID {crew_id} is not in the active queue.")

    # Simulation loop
    for i in range(n):
        times.append(time)
        active_states.append(len(active))
        rest_states.append(len(rest))

        st.write(f"Time: {time}")
        st.write(f"Active crews: {print_queue(active)}")
        st.write(f"Resting crews: {print_queue(rest)}")
        st.write("=====================")

        if time + shift_duration >= 600:
            if active:
                rest.append(active.popleft())

            if rest and time + shift_duration + rest_duration >= 600:
                active.append(rest.popleft())

        time += shift_duration

    # Final state
    times.append(time)
    active_states.append(len(active))
    rest_states.append(len(rest))

    st.write("Final State:")
    st.write(f"Active crews: {print_queue(active)}")
    st.write(f"Resting crews: {print_queue(rest)}")

    visualize_queues(times, active_states, rest_states)

if __name__ == "__main__":
    main()
