import useApiFetch, { fetchData }  from "../hooks/useApiFetch";

export default function ApiCheckPage() {

    const { data, loading, error } = useApiFetch(() => fetchData<string>('https://jsonplaceholder.typicode.com/todos/1'));
 
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return null;
 
    return <div>{JSON.stringify(data)}</div>;
};