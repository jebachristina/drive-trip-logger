"use client";

import { useState, useEffect } from "react";
import API from "../services/tripApi";

export default function TripForm({
    onSave,
    selectedTrip,
}: {
    onSave: () => void;
    selectedTrip?: any;
}) {
    const [form, setForm] = useState({
        startLocation: "",
        endLocation: "",
        startTime: "",
        endTime: "",
        distance: "",
        notes: "",
        memorable: false,
    });

    const [errors, setErrors] = useState({
        distance: "",
        sameLocation: "",
        endTime: "",
    });

    const locations = [
        "Bangalore",
        "Chennai",
        "Coimbatore",
        "Hyderabad",
        "Mumbai",
        "Pune",
        "Delhi",
        "Kochi",
        "Mysore",
        "Goa",
    ];

    useEffect(() => {
        if (selectedTrip) {
            setForm({
                startLocation: selectedTrip.startLocation || "",
                endLocation: selectedTrip.endLocation || "",
                startTime: selectedTrip.startTime || "",
                endTime: selectedTrip.endTime || "",
                distance: selectedTrip.distance?.toString() || "",
                notes: selectedTrip.notes || "",
                memorable: selectedTrip.memorable || false,
            });
        }
    }, [selectedTrip]);

    const validateLocations = (
        start: string,
        end: string
    ) => {
        if (
            start &&
            end &&
            start === end
        ) {
            setErrors((prev) => ({
                ...prev,
                sameLocation:
                    "Start and End locations must be different",
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                sameLocation: "",
            }));
        }
    };

    const validateTimes = (
        start: string,
        end: string
    ) => {
        if (
            start &&
            end &&
            new Date(end) <= new Date(start)
        ) {
            setErrors((prev) => ({
                ...prev,
                endTime:
                    "End time must be after Start time",
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                endTime: "",
            }));
        }
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();


        if (
            !form.startLocation ||
            !form.endLocation ||
            !form.startTime ||
            !form.endTime ||
            !form.distance
        ) {
            alert("Please fill all required fields");
            return;
        }

        if (
            errors.sameLocation ||
            errors.distance ||
            errors.endTime
        ) {
            return;
        }

        const payload = {
            ...form,
            distance: Number(form.distance),
        };

        if (selectedTrip) {
            await API.put(
                `/${selectedTrip.id}`,
                payload
            );
        } else {
            await API.post("", payload);
        }

        setForm({
            startLocation: "",
            endLocation: "",
            startTime: "",
            endTime: "",
            distance: "",
            notes: "",
            memorable: false,
        });

        setErrors({
            distance: "",
            sameLocation: "",
            endTime: "",
        });

        onSave();


    };
    const isFormValid =
        form.startLocation &&
        form.endLocation &&
        form.startTime &&
        form.endTime &&
        form.distance &&
        !errors.sameLocation &&
        !errors.distance &&
        !errors.endTime;

    return (<form
        onSubmit={handleSubmit}
        className="border rounded-xl p-4 shadow-md mb-8 bg-white"
    > <h2 className="text-xl font-semibold mb-4">
            {selectedTrip
                ? `Edit Trip - ${selectedTrip.startLocation} → ${selectedTrip.endLocation}`
                : "Add New Trip"} </h2>


        <div className="grid grid-cols-2 gap-2">

            <select
                className="
w-full
border
border-gray-300
bg-white
rounded-lg
px-3
py-2
text-gray-700
focus:outline-none
focus:ring-2
focus:ring-indigo-500
focus:border-indigo-500
transition
"
                value={form.startLocation}
                onChange={(e) => {
                    const value = e.target.value;

                    setForm({
                        ...form,
                        startLocation: value,
                    });

                    validateLocations(
                        value,
                        form.endLocation
                    );
                }}
            >
                <option value="">
                    Select Start Location
                </option>

                {locations.map((location) => (
                    <option
                        key={location}
                        value={location}
                    >
                        {location}
                    </option>
                ))}
            </select>

            <div>
                <select
                    className={`w-full border p-2 rounded-lg ${errors.sameLocation
                        ? "border-red-500"
                        : "border-gray-300"
                        }`}
                    value={form.endLocation}
                    onChange={(e) => {
                        const value = e.target.value;

                        setForm({
                            ...form,
                            endLocation: value,
                        });

                        validateLocations(
                            form.startLocation,
                            value
                        );
                    }}
                >
                    <option value="">
                        Select End Location
                    </option>

                    {locations.map((location) => (
                        <option
                            key={location}
                            value={location}
                            disabled={
                                location ===
                                form.startLocation
                            }
                        >
                            {location}
                        </option>
                    ))}
                </select>

                {errors.sameLocation && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.sameLocation}
                    </p>
                )}
            </div>

            <input
                type="datetime-local"
                className="
w-full
border
border-gray-300
bg-white
rounded-lg
px-3
py-2
text-gray-700
focus:outline-none
focus:ring-2
focus:ring-indigo-500
focus:border-indigo-500
transition
"
                value={form.startTime}
                onChange={(e) => {
                    const value = e.target.value;

                    setForm({
                        ...form,
                        startTime: value,
                    });

                    validateTimes(
                        value,
                        form.endTime
                    );
                }}
            />

            <div>
                <input
                    type="datetime-local"
                    className={`w-full border p-2 rounded-lg ${errors.endTime
                        ? "border-red-500"
                        : "border-gray-300"
                        }`}
                    value={form.endTime}
                    onChange={(e) => {
                        const value = e.target.value;

                        setForm({
                            ...form,
                            endTime: value,
                        });

                        validateTimes(
                            form.startTime,
                            value
                        );
                    }}
                />

                {errors.endTime && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.endTime}
                    </p>
                )}
            </div>

            <div>
                <input
                    type="number"
                    min="1"
                    placeholder="Distance (km) *"
                    className={`w-full p-2 rounded-lg border ${errors.distance
                        ? "border-red-500"
                        : "border-gray-300"
                        }`}
                    value={form.distance}
                    onChange={(e) => {
                        const value = e.target.value;

                        if (
                            value !== "" &&
                            Number(value) <= 0
                        ) {
                            setErrors((prev) => ({
                                ...prev,
                                distance:
                                    "Distance must be greater than 0",
                            }));
                        } else {
                            setErrors((prev) => ({
                                ...prev,
                                distance: "",
                            }));
                        }

                        setForm({
                            ...form,
                            distance: value,
                        });
                    }}
                />

                {errors.distance && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.distance}
                    </p>
                )}

                <label className="flex items-center gap-3 mt-8">
                    <input
                        type="checkbox"
                        checked={form.memorable}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                memorable: e.target.checked,
                            })
                        }
                    />
                    Memorable Trip
                </label>
            </div>

            <textarea
                placeholder="Notes (Optional)"
                rows={4}
                maxLength={500}
                className="border border-gray-300 p-2 rounded-lg"
                value={form.notes}
                onChange={(e) =>
                    setForm({
                        ...form,
                        notes: e.target.value,
                    })
                }
            />
        </div>

        <div className="flex justify-end mt-3">
            <button
                type="submit"
                disabled={!isFormValid}
                className={`px-6 py-2 rounded-lg transition text-white ${isFormValid
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-gray-400 cursor-not-allowed"
                    }`}
            >
                {selectedTrip
                    ? "Update Trip"
                    : "Save Trip"}
            </button>
        </div>

    </form>


    );
}
