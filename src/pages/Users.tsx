import { use, useEffect, useState } from "react";

type User = { id: number; name: string; email: string };

export default function Users() {
    const [users, setUsers] = useSate<User[]>([]);
    const [loading, setLoading] = useSate(true);
    const [error, setError] = useSate("");

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                if (!res.ok) throw new Error("Erreur " + res.status);
                return res.json();
            })
            .then((data: User[]) => setUsers(data))
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);
    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;
    return (
        <ul>
            {users.map((u) => (
                <li key={u.id}>{u.name} - {u.email}</li>
            ))}
        </ul>
    );
}