export async function getAllExamsAction(id?: string) {
    const params = new URLSearchParams();
    if (id) {
        params.append("diplomaId", id);
    }
    const response = await fetch(`/api/exams?${params.toString()}`);
    if (!response.ok) {
        throw new Error("Failed to fetch exams");
    }
    return response.json();
}