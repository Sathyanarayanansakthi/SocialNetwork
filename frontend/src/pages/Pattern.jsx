import { useState, useEffect } from "react";
import axios from "axios";
import PatternNav from "../components/Pattern/patternNav";

const Pattern = () => {
    const [patterns, setPatterns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch patterns data from backend when component mounts
    useEffect(() => {
        const fetchPatterns = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/pdf/patterns");
                setPatterns(response.data.patterns);
            } catch (err) {
                setError("Failed to fetch patterns");
            } finally {
                setLoading(false);
            }
        };

        fetchPatterns();
    }, []);

    return (
        <div>
            <PatternNav />
            <div className="p-5">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Patterns</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {patterns.map((pattern) => (
                                <div key={pattern.id} className="bg-white p-4 rounded-lg shadow-lg">
                                    <h3 className="text-xl font-semibold">{pattern.name}</h3>
                                    <p>{pattern.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Pattern;
