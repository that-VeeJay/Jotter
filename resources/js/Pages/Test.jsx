import { useForm } from "@inertiajs/react";

export default function Test() {
    const { data, setData } = useForm({
        file: null,
    });

    return (
        <div>
            <input
                type="file"
                name="file"
                onChange={(e) => setData("file", e.target.files[0])}
            />

            {data.file && <p>{data.file.name}</p>}
        </div>
    );
}
