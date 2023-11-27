import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from '../redux/UserSlice';
import { Delete, Logout } from '../components';

const Profile = () => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
    if (error) {
      const timer = setTimeout(() => {
        dispatch(updateUserFailure(error.message));
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [dispatch, error, success]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getMilliseconds() + '-' + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      () => {
        setFileError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
          setFormData({ ...formData, photo: downloadUrl })
        );
      }
    );
  };

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = '/api/users/current';
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      dispatch(updateUserStart());

      const response = await fetch(apiUrl, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(formData),
      });

      console.log(response);
      if (response.status === 500) throw new Error(response.statusText);
      const updateData = await response.json();

      if (!response.ok) {
        dispatch(updateUserFailure(updateData.errors));
        return;
      }

      dispatch(updateUserSuccess(updateData.data[0]));
      setSuccess(true);
    } catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center uppercase">Profile</h1>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit}
      >
        <img
          className="h-24 w-24 rounded-full self-center cursor-pointer object-cover mt-2"
          src={formData?.photo || currentUser.photo}
          alt={currentUser.name}
          onClick={() => fileRef.current.click()}
        />
        <p className="self-center">
          {fileError ? (
            <small className="text-red-600">
              Error image uploaded! (image only, max-size: 2Mb)
            </small>
          ) : filePerc > 0 && filePerc < 100 ? (
            <small className="text-slate-700">{`Uploading ${filePerc}%`}</small>
          ) : filePerc === 100 ? (
            <small className="text-green-700">Successfully uploaded.</small>
          ) : null}
        </p>

        {error && <small className="text-red-500">{error}</small>}
        {success && <small className="text-green-500">Data saved</small>}

        <input
          type="file"
          id="photo"
          accept="image/*"
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
          hidden
        />
        <input
          type="text"
          id="name"
          placeholder="Name"
          className="border rounded-lg p-3"
          defaultValue={currentUser.name}
          onChange={handleChange}
        />
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="border rounded-lg p-3"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="text"
          id="email"
          placeholder="Email"
          className="border rounded-lg p-3"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <button
          className="bg-slate-500 text-white rounded-lg  hover:bg-slate-700 disabled:opacity-70 p-3"
          disabled={loading}
        >
          <span>{loading ? 'Loading...' : 'UPDATE'}</span>
        </button>
      </form>
      <div className="flex justify-between my-5">
        <Delete />
        <Logout />
      </div>
    </div>
  );
};

export default Profile;
