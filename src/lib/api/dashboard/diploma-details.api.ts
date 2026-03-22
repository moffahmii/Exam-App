import { cookies } from 'next/headers';
export async function getDiplomaDetails(id: string) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        if (!token) return null;
        const res = await fetch(`https://exam-app.elevate-bootcamp.cloud/api/diplomas/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            next: { revalidate: 60 }
        });
        if (!res.ok) {
            const errorData = await res.json();
            console.error("❌ API Error Detail:", errorData);
            return null;
        }
        const result = await res.json();
        return result.payload.diploma;
    } catch (error) {
        console.error("❌ Fetch Exception:", error);
        return null;
    }
}