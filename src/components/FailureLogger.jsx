import { useState, useEffect } from "react";

function Logger() {
    const [failures, setFailures] = useState(() => {
        const savedFailures = localStorage.getItem("failureList");
        return savedFailures ? JSON.parse(savedFailures) : [];
    });

    const [successes, setSuccesses] = useState(() => {
        const savedSuccesses = localStorage.getItem("successList");
        return savedSuccesses ? JSON.parse(savedSuccesses) : [];
    });

    const [newFailure, setNewFailure] = useState('');
    const [reflection, setReflection] = useState(() => {
        const savedReflection = localStorage.getItem("reflection");
        return savedReflection || '';
    });

    // Handle input for failures
    const handleFailureInput = (e) => {
        setNewFailure(e.target.value);
    };

    // Handle input for reflection
    const handleReflectionInput = (e) => {
        setReflection(e.target.value);
    };

    // Add a failure to the list
    const addFailure = () => {
        if (newFailure.trim() !== "") {
            setFailures(f => [...f, { text: newFailure, date: new Date().toLocaleString() }]);
            setNewFailure('');
        }
    };



    // Move failure to success list
    const moveToSuccess = (index) => {
        const success = failures[index];
        setSuccesses(s => [...s, success]);
        setFailures(failures.filter((_, i) => i !== index));
    };

    // Delete failure
    const deleteFailure = (index) => {
        const updatedFailures = failures.filter((_, i) => i !== index);
        setFailures(updatedFailures);
    };

    // Delete success
    const deleteSuccess = (index) => {
        const updatedSuccesses = successes.filter((_, i) => i !== index);
        setSuccesses(updatedSuccesses);
    };



    // Persist failures, successes, and reflection to localStorage
    useEffect(() => {
        localStorage.setItem("failureList", JSON.stringify(failures));
    }, [failures]);

    useEffect(() => {
        localStorage.setItem("successList", JSON.stringify(successes));
    }, [successes]);

    useEffect(() => {
        localStorage.setItem("reflection", reflection);
    }, [reflection]);




    return (
        <div>
            <h1>Failure to Success Tracker</h1>

            {/* Failure Input */}
            <div className="input-container">
                <input
                    id="inputText"
                    value={newFailure}
                    type="text"
                    placeholder="Enter a time when you failed"
                    onChange={handleFailureInput}
                    onKeyDown={(e) => e.key === "Enter" && addFailure()}
                    style={{ padding: "10px", width: "70%", marginRight: "10px", borderRadius: "5px" }}
                />
                <button onClick={addFailure} style={{ padding: "10px", borderRadius: "5px", backgroundColor: "#1a73e8", color: "white" }}>Add Failure</button>
            </div>



            {/* Failure List */}
            <h2>Failures</h2>
            <ul>
                {failures.map((failure, index) => (
                    <li key={index} style={{ marginBottom: "10px" }}>
                        {failure.text} <br />
                        <small>Failed on: {failure.date}</small>
                        <div>
                            <button onClick={() => moveToSuccess(index)} style={{ marginRight: "5px", backgroundColor: "#4caf50", color: "white", padding: "5px", borderRadius: "5px" }}>Mark as Success</button>
                            <button onClick={() => deleteFailure(index)} style={{ backgroundColor: "#f44336", color: "white", padding: "5px", borderRadius: "5px" }}> Delete </button>
                        </div>
                    </li>
                ))}
            </ul>



            {/* Success List */}
            <h2>Successes</h2>
            <ul>
                {successes.map((success, index) => (
                    <li key={index} style={{ marginBottom: "10px" }}>
                        {success.text} <br />
                        <small>Succeeded on: {success.date}</small>
                        <div>
                            <button onClick={() => deleteSuccess(index)} style={{ backgroundColor: "#f44336", color: "white", padding: "5px", borderRadius: "5px" }}> Delete </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Reflection Section */}
            <h2>Reflection</h2>
            <textarea
                value={reflection}
                onChange={handleReflectionInput}
                placeholder="Write down what you've learned from your failures."
                rows={5}
                style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
            />
        </div>
    );
}

export default Logger;
