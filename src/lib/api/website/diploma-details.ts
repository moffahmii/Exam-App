export const getDiplomaDetails = async (id: string) => {
    const res = await fetch(`/api/diplomas/${id}`);
    return res.json();
};