"use client";

import { useEffect, useState } from "react";
import API from "../services/tripApi";
import SummaryCards from "../components/SummaryCards";
import TripForm from "../components/TripForm";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

export default function Home() {
const [trips, setTrips] = useState<any[]>([]);
const [selectedTrip, setSelectedTrip] = useState<any>(null);
const [deleteId, setDeleteId] = useState<number | null>(null);

const [showMemorableOnly, setShowMemorableOnly] =
useState(false);

const [summary, setSummary] = useState({
totalTrips: 0,
totalDistance: 0,
memorableTrips: 0,
});

useEffect(() => {
fetchTrips();
fetchSummary();
}, []);

const fetchTrips = async () => {
const response = await API.get("");
setTrips(response.data);
};

const fetchSummary = async () => {
const response = await API.get("/summary");
setSummary(response.data);
};

const confirmDelete = async () => {
if (deleteId === null) return;


await API.delete(`/${deleteId}`);

if (
  selectedTrip &&
  selectedTrip.id === deleteId
) {
  setSelectedTrip(null);
}

setDeleteId(null);

fetchTrips();
fetchSummary();


};

const filteredTrips = (
showMemorableOnly
? trips.filter(
(trip: any) => trip.memorable
)
: trips
).sort(
(a: any, b: any) =>
new Date(b.startTime).getTime() -
new Date(a.startTime).getTime()
);

return ( <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-50"> <div className="max-w-6xl mx-auto p-8">


    <h1 className="text-4xl font-bold mb-8">
      🚗 Drive Trip Logger
    </h1>

    <SummaryCards
      totalTrips={summary.totalTrips}
      totalDistance={summary.totalDistance}
      memorableTrips={summary.memorableTrips}
    />

    <TripForm
      selectedTrip={selectedTrip}
      onSave={() => {
        setSelectedTrip(null);
        fetchTrips();
        fetchSummary();
      }}
    />

    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

      <h2 className="font-semibold text-xl">
        Trips
      </h2>

      <div className="flex gap-2 mt-3 mb-6">

        <button
          onClick={() =>
            setShowMemorableOnly(false)
          }
          className={`px-4 py-2 rounded-lg transition ${
            !showMemorableOnly
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          All Trips
        </button>

        <button
          onClick={() =>
            setShowMemorableOnly(true)
          }
          className={`px-4 py-2 rounded-lg transition ${
            showMemorableOnly
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          ⭐ Memorable Trips
        </button>

      </div>

      {filteredTrips.length === 0 ? (

        <div className="text-center py-12">

          <div className="text-5xl mb-3">
            🚗
          </div>

          <h3 className="text-lg font-semibold">
            No trips yet
          </h3>

          <p className="text-gray-500 mt-2">
            Start by adding your first trip.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          {filteredTrips.map(
            (trip: any) => (
              <div
                key={trip.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-gray-100"
              >
                <h3 className="text-lg font-semibold">
                  {trip.startLocation}
                  {" → "}
                  {trip.endLocation}
                </h3>

                <p className="text-gray-600 mt-2">
                  Distance: {trip.distance} km
                </p>

                {trip.notes && (
                  <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                    {trip.notes}
                  </p>
                )}

                {trip.memorable && (
                  <div className="mt-3 text-yellow-500">
                    ⭐ Memorable Trip
                  </div>
                )}

                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() =>
                      setSelectedTrip(
                        trip
                      )
                    }
                    className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      setDeleteId(
                        trip.id
                      )
                    }
                    className="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                  >
                    Delete
                  </button>

                </div>
              </div>
            )
          )}

        </div>

      )}
    </div>

    <DeleteConfirmationModal
      isOpen={deleteId !== null}
      onConfirm={confirmDelete}
      onCancel={() =>
        setDeleteId(null)
      }
    />

  </div>
</main>


);
}
