export default function UserProfile({params} : any) {
    return (
        <div className="flex flex-col bg-slate-900 items-center justify-center min-h-screen py-2">
            <h1 className="mb-8 font-extrabold text-4xl">Profile</h1>
            <hr />
            <p className="text-white">Profile page <span className="p-2 rounded bg-cyan-500">{params.id}</span></p>
        </div>
    );
}