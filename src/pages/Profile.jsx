import { useSelector } from 'react-redux';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-3">
        <img
          className="h-24 w-24 rounded-full self-center cursor-pointer object-cover mt-2"
          src={currentUser.photo}
          alt={currentUser.name}
        />
        <input
          type="text"
          placeholder="Name"
          className="border rounded-lg p-3"
        />
        <input
          type="text"
          placeholder="Username"
          className="border rounded-lg p-3"
        />
        <input
          type="text"
          placeholder="Email"
          className="border rounded-lg p-3"
        />
        <button className="bg-slate-700 text-white rounded-lg  hover:opacity-90 disabled:opacity-80 uppercase p-3">
          update
        </button>
      </form>
      <div className="flex justify-between my-5">
        <span className="text-red-700 cursor-pointer font-bold hover:opacity-90 p-2">
          Delete Account
        </span>
        <button className="bg-red-700 text-white cursor-pointer rounded-lg hover:opacity-90 p-2">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
