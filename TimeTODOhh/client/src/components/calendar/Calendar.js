import React, {useState} from 'react';

const baseUrl = "http://localhost:8085/api/calendar";

function CalendarApp() {
    const [page, setPage] = useState('home');
    const [result, setResult] = useState('');

    const showPage = (newPage) => {
        setPage(newPage);
        setResult('');
    };

    const handleFetch = async (url, options) => {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }
        try {
            const data = await response.json();
            setResult(JSON.stringify(data, null, 2));
        } catch (error) {
            console.error("Failed to parse JSON:", error);
            setResult("Failed to parse JSON response.");
        }
    };

    const addEvent = async (e) => {
        e.preventDefault();
        try {
            const data = {
                title: e.target.title.value,
                description: e.target.description.value,
                location: e.target.location.value,
                startTime: e.target.startTime.value,
                endTime: e.target.endTime.value,
                repeatType: e.target.repeatType.value,
                categoryId: e.target.categoryId.value
            };
            await handleFetch(`${baseUrl}/add`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });
            showPage('home');
        } catch (error) {
            console.error("Error adding event:", error);
            setResult(`Error: ${error.message}`);
        }
    };


const getAllEvents = async () => {
    await handleFetch(`${baseUrl}/all`);
};

const updateEvent = async (e) => {
    e.preventDefault();
    const id = e.target.updateEventId.value;
    const data = {
        title: e.target.updateTitle.value,
        description: e.target.updateDescription.value,
        location: e.target.updateLocation.value,
        startTime: e.target.updateStartTime.value,
        endTime: e.target.updateEndTime.value,
    };
    await handleFetch(`${baseUrl}/update/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
    showPage('home');
};

const deleteEvent = async (e) => {
    const id = e.target.deleteEventId.value;
    await fetch(`${baseUrl}/delete/${id}`, {method: 'DELETE'});
    try {
        const response = await fetch(`${baseUrl}/delete/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setResult(`Deleted Event ID: ${id}`);
            showPage('home');
        } else {
            const errorText = await response.text();
            setResult(`Failed to delete: ${errorText}`);
        }
    } catch (error) {
        console.error("Error deleting event:", error);
        setResult(`Error: ${error.message}`);
    }
};

/*const addRepeatingEvent = async (e) => {
    e.preventDefault();
    const data = {
        title: e.target.repeatTitle.value,
        description: e.target.repeatDescription.value,
        location: e.target.repeatLocation.value,
        startTime: e.target.repeatStartTime.value,
        endTime: e.target.repeatEndTime.value,
        repeatType: e.target.repeatType.value,
        categoryId: e.target.repeatCategoryId.value,
    };
    await handleFetch(`${baseUrl}/addRepeatingEvent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    showPage('home');
};*/

const searchEvents = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
        title: e.target.searchTitle.value,
        description: e.target.searchDescription.value,
        categoryId: e.target.searchCategoryId.value,
        startTime: e.target.searchStartTime.value,
    }).toString();
    await handleFetch(`${baseUrl}/search?${params}`);
};

return (
    <div>
        <h1>Calendar API Test</h1>
        {page === 'home' && (
            <div>
                <h2>Home</h2>
                <button onClick={() => showPage('addEvent')}>2. Add New Event</button>
                <br/>
                <button onClick={() => showPage('viewAll')}>3. View All Events</button>
                <br/>
                <button onClick={() => showPage('updateEvent')}>4. Update Event</button>
                <br/>
                <button onClick={() => showPage('deleteEvent')}>5. Delete Event</button>
                <br/>
                <button onClick={() => showPage('addRepeatingEvent')}>6. Add Repeating Event</button>
                <br/>
                <button onClick={() => showPage('searchEvent')}>7. Search Events</button>
            </div>
        )}

        {page === 'addEvent' && (
            <div>
                <h2>Add New Event</h2>
                <form onSubmit={addEvent}>
                    <label>Title: <input type="text" name="title" required/></label><br/>
                    <label>Description: <input type="text" name="description"/></label><br/>
                    <label>Location: <input type="text" name="location" required/></label><br/>
                    <label>Start Time: <input type="datetime-local" name="startTime" required/></label><br/>
                    <label>End Time: <input type="datetime-local" name="endTime" required/></label><br/>
                    <label>Category ID: <input type="number" name="categoryId"/></label><br/>
                    <label>Repeat Type:
                        <select name="repeatType" required>
                            <option value="NONE">None</option>
                            <option value="DAILY">Daily</option>
                            <option value="WEEKLY">Weekly</option>
                            <option value="MONTHLY">Monthly</option>
                            <option value="YEARLY">Yearly</option>
                        </select>
                    </label><br/>
                    <button type="submit">Add Event</button>
                </form>
                <button onClick={() => showPage('home')}>Back to Home</button>
            </div>
        )}

        {page === 'viewAll' && (
            <div>
                <h2>View All Events</h2>
                <button onClick={getAllEvents}>Load All Events</button>
                <pre>{result}</pre>
                <button onClick={() => showPage('home')}>Back to Home</button>
            </div>
        )}

        {page === 'updateEvent' && (
            <div>
                <h2>Update Event</h2>
                <form onSubmit={updateEvent}>
                    <label>Event ID: <input type="number" name="updateEventId" required/></label><br/>
                    <label>Title: <input type="text" name="updateTitle" required/></label><br/>
                    <label>Description: <input type="text" name="updateDescription"/></label><br/>
                    <label>Location: <input type="text" name="updateLocation" required/></label><br/>
                    <label>Start Time: <input type="datetime-local" name="updateStartTime" required/></label><br/>
                    <label>End Time: <input type="datetime-local" name="updateEndTime" required/></label><br/>
                    <button type="submit">Update Event</button>
                </form>
                <button onClick={() => showPage('home')}>Back to Home</button>
            </div>
        )}

        {page === 'deleteEvent' && (
            <div>
                <h2>Delete Event</h2>
                <form onSubmit={deleteEvent}>
                    <label>Event ID: <input type="number" name="deleteEventId" required/></label><br/>
                    <button type="submit">Delete Event</button>
                </form>
                <button onClick={() => showPage('home')}>Back to Home</button>
            </div>
        )}

        {/*{page === 'addRepeatingEvent' && (
                <div>
                    <h2>Add Repeating Event</h2>
                    <form onSubmit={addRepeatingEvent}>
                        <label>Title: <input type="text" name="repeatTitle" required /></label><br />
                        <label>Description: <input type="text" name="repeatDescription" /></label><br />
                        <label>Location: <input type="text" name="repeatLocation" required /></label><br />
                        <label>Start Time: <input type="datetime-local" name="repeatStartTime" required /></label><br />
                        <label>End Time: <input type="datetime-local" name="repeatEndTime" required /></label><br />
                        <label>Repeat Type:
                            <select name="repeatType" required>
                                <option value="NONE">None</option>
                                <option value="DAILY">Daily</option>
                                <option value="WEEKLY">Weekly</option>
                                <option value="MONTHLY">Monthly</option>
                                <option value="YEARLY">Yearly</option>
                            </select>
                        </label><br />
                        <label>Category ID: <input type="number" name="repeatCategoryId" /></label><br />
                        <button type="submit">Add Repeating Event</button>
                    </form>
                    <button onClick={() => showPage('home')}>Back to Home</button>
                </div>
            )}*/}

        {page === 'searchEvent' && (
            <div>
                <h2>Search Events</h2>
                <form onSubmit={searchEvents}>
                    <label>Title: <input type="text" name="searchTitle"/></label><br/>
                    <label>Description: <input type="text" name="searchDescription"/></label><br/>
                    <label>Category ID: <input type="number" name="searchCategoryId"/></label><br/>
                    <label>Start Time: <input type="datetime-local" name="searchStartTime"/></label><br/>
                    <button type="submit">Search</button>
                </form>
                <pre>{result}</pre>
                <button onClick={() => showPage('home')}>Back to Home</button>
            </div>
        )}
    </div>
);
}

export default CalendarApp;
