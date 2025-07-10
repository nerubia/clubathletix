import { Text } from "@/components/text";

export function FixtureCard({ data }: { data: any }) {
    return (
        <div className="shadow-md rounded-lg p-4 mb-4 sm:w-sm lg:w-lg">
            <h2 className="text-xl font-bold mb-2">{data.name}</h2>
            <Text>Date: {data.date}</Text>
            <Text>Time: {data.time}</Text>
            <Text>Location: {data.location}</Text>
            <p className="text-gray-700">Teams: {data.teams?.join(' vs ')}</p>
        </div>
    );
}