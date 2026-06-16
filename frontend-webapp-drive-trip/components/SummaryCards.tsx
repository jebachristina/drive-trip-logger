interface Props {
    totalTrips: number;
    totalDistance: number;
    memorableTrips: number;
}

export default function SummaryCards({
    totalTrips,
    totalDistance,
    memorableTrips,
}: Props) {
    return (
        <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-md p-4 border">
                <h3 className="text-gray-500 text-sm">
                    Total Trips
                </h3>
                <p className="text-3xl font-bold">
                    {totalTrips}
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 border">
                <h3 className="text-gray-500 text-sm">
                    Total Distance
                </h3>
                <p className="text-3xl font-bold">
                    {totalDistance} km
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 border">
                <h3 className="text-gray-500 text-sm">
                    Memorable Trips
                </h3>
                <p className="text-3xl font-bold">
                    {memorableTrips}
                </p>
            </div>
        </div>
    );
}