const CreateProperty = () => {
  return (
    <main className="max-w-4xl p-3">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Property
      </h1>
      <form className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col flex-1 gap-4">
          <input
            type="text"
            id="name"
            className="border p-3 rounded-lg"
            placeholder="Name"
            required
          />
          <input
            type="text"
            id="address"
            className="border p-3 rounded-lg"
            placeholder="Address"
            required
          />
          <textarea
            type="text"
            id="description"
            className="border p-3 rounded-lg"
            placeholder="Description"
            required
          />
          <div className="flex flex-wrap gap-5">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sell"
                className="w-5"
              />
              <label htmlFor="sell">Sell</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
              />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
              />
              <label htmlFor="parking">Parking Spot</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
              />
              <label htmlFor="furnished">Furnished</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
              />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                className="border border-gray-300 rounded-lg p-2"
                min={1}
                max={5}
                required
              />
              <p>Bedrooms</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                className="border border-gray-300 rounded-lg p-2"
                min={1}
                max={5}
                required
              />
              <p>Bathrooms</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                className="border border-gray-300 rounded-lg p-2"
                min={1}
                max={5}
                required
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discontPrice"
                className="border border-gray-300 rounded-lg p-2"
                min={1}
                max={5}
                required
              />
              <div className="flex flex-col items-center">
                <p>Disconted Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-500 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-3">
            <input
              type="file"
              id="image"
              className="w-full border first-letter:border-gray-300 rounded p-3"
              accept="image/*"
              multiple
            />
            <button className="text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80 p-3">
              Upload
            </button>
          </div>
          <button className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-80 p-3">
            Create Property
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateProperty;
