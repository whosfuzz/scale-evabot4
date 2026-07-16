import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { tablesDB, ID, Query, Permission, Role } from "../appwrite.js";
import { getErrorMessage } from "../helpers/ErrorMessages.js";
import { useUser } from "../context/UserContext.jsx";

const DAYS_OF_WEEK = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

export default function Upsert({myTableId}) {
    const { user } = useUser();
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    // Dynamically toggle behavior by inspecting the current route path
    const isMessageMode = location.pathname.includes("messages");
    const isEditing = id !== undefined;

    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        folder: "",
        dayOfWeek: "",
        message: "",
        seen: "",
    });

    function shuffleSeenDate() {
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;

        const newest = now - oneDay;          // yesterday
        const oldest = now - (365 * oneDay);  // one year ago

        const randomTime = oldest + Math.random() * (newest - oldest);

        setFormData((prev) => ({
            ...prev,
            seen: toLocalDateTime(new Date(randomTime).toISOString()),
        }));
    }

    function toLocalDateTime(dateString) {
        const date = new Date(dateString);
        const offset = date.getTimezoneOffset();
        const local = new Date(date.getTime() - offset * 60000);
        return local.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
    }

    const goBack = () => {
        navigate(isMessageMode ? "/messages" : "/dailyfolders");
    };

    useEffect(() => {
        if (!isEditing) {
            setLoading(false);
            return;
        }

        async function loadEntryData() {
            try {
                // Fetch only fields matching the entity schema type
                const selectFields = isMessageMode 
                    ? ["folder", "message", "seen"] 
                    : ["folder", "dayOfWeek", "seen"];

                const row = await tablesDB.getRow({
                    databaseId: "669318d2002a5431ce91",
                    tableId: myTableId,
                    rowId: id,
                    queries: [Query.select(selectFields)],
                });

                setFormData({
                    folder: row.folder ?? "",
                    dayOfWeek: row.dayOfWeek ?? "",
                    message: row.message ?? "",
                    seen: row.seen ? toLocalDateTime(row.seen) : "",
                });
            } catch (err) {
                console.error(err);
                alert(getErrorMessage(err, "load entry", user));
                goBack();
            } finally {
                setLoading(false);
            }
        }

        loadEntryData();
    }, [id, isEditing, isMessageMode]);

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);

        try {
            if (!user) {
                const error = new Error("Not logged in");
                error.code = 401; 
                error.status = 401; 
                throw error;
            }

            // Shared metadata attributes
            const payloadData = {
                seen: formData.seen ? new Date(formData.seen).toISOString() : null,
                owner: user.$id
            };


            // Entity specific attributes
            if (isMessageMode) {
                payloadData.message = formData.message.trim();
                payloadData.folder = formData.folder.trim();
            } else {
                payloadData.folder = formData.folder.trim();
                payloadData.dayOfWeek = formData.dayOfWeek.trim();
            }
            await tablesDB.upsertRow({
                databaseId: "669318d2002a5431ce91",
                tableId: myTableId,
                rowId: isEditing ? id : ID.unique(),
                data: payloadData,
                permissions: [
                    Permission.read(Role.user(user.$id)),
                    Permission.write(Role.user(user.$id))
                ]
            });

            goBack();
        } catch (err) {
            console.error(err);
            alert(getErrorMessage(err, `${isEditing ? "edit" : "create"} this entry`, user));
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <>
            <p>Loading...</p>
            </>
        );
    }

    return (
        <div className="upsert-container">
            <style>{inlineStyles}</style>
            
            <div className="header-row">
                <h1>
                    {isEditing ? "Edit " : "New "}
                    {isMessageMode ? "Message" : "Daily Folder"}
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                {isMessageMode ? (
                    <>

                        <div className="form-group">
                            <label htmlFor="folder">Folder</label>
                            <input
                                id="folder"
                                name="folder"
                                type="text"
                                autoComplete="off"
                                placeholder="Enter folder name"
                                value={formData.folder}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            placeholder="Enter message text"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    </>
                
                ) : (
                    <>
                        <div className="form-group">
                            <label htmlFor="folder">Folder</label>
                            <input
                                id="folder"
                                name="folder"
                                type="text"
                                autoComplete="off"
                                placeholder="Enter folder name"
                                value={formData.folder}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="dayOfWeek">Day Of Week</label>
                            <select
                                id="dayOfWeek"
                                name="dayOfWeek"
                                value={formData.dayOfWeek}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select a day</option>
                                {DAYS_OF_WEEK.map((day) => (
                                    <option key={day} value={day}>
                                        {day}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )}

                <div className="form-group">
                    <label htmlFor="seen">Seen</label>
                    <div className="seen-row">
                        <input
                            id="seen"
                            name="seen"
                            type="datetime-local"
                            step="1"
                            value={formData.seen}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="btn"
                            title="Shuffle Seen Date"
                            onClick={shuffleSeenDate}
                        >
                            ⟳
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn"
                    disabled={saving}
                >
                    {saving
                        ? "Saving..."
                        : isEditing
                        ? "Update Entry"
                        : "Create Entry"}
                </button>
            </form>
        </div>
    );
}

const inlineStyles = `
  .upsert-container {
    max-width: 600px;
    margin: 40px auto;
    padding: 24px;
    background-color: var(--bg-color);
    border: 1px solid var(--text-color);
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
    font-family: inherit; 
    position: -webkit-sticky;
    position: sticky;
    top: 82px;                 
    z-index: 1;
    box-sizing: border-box;
  }

  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .upsert-container h1, .loading {
    color: var(--text-color);
    margin: 0;
    font-size: 1.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  label {
    color: var(--text-color);
    font-weight: 600;
    font-size: 0.9rem;
  }

  input, textarea, select {
    padding: 10px;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid var(--text-color);
    background-color: var(--bg-color);
    color: var(--text-color);
    resize: vertical;
    width: 100%;
    box-sizing: border-box;
  }

  input, textarea, select, button {
    font-family: inherit;
  }

  .seen-row {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .seen-row input {
    flex: 1;
  }

  .shuffle-btn {
    padding: 10px 14px;
    background-color: var(--bg-color);
    border: 1px solid var(--text-color);
    color: var(--text-color);
    border-radius: 6px;
    font-size: 1.1rem;
  }
`;
