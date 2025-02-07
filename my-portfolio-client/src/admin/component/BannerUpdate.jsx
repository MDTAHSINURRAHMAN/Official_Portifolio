import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const BannerUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [designation, setDesignation] = useState("");
  const [location, setLocation] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  // Get existing about data
  const { data: bannerData, refetch } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const res = await axios.get(
        "https://official-portfolio-nine.vercel.app/banner"
      );
      return res.data[0];
    },
  });

  const handlePhotoUpload = async (e) => {
    const photo = e.target.files[0];
    const formData = new FormData();
    formData.append("image", photo);

    try {
      setLoading(true);
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );
      setPhotoURL(response.data.data.url);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const openModal = () => {
    setDesignation(bannerData?.designation || "");
    setLocation(bannerData?.location || "");
    setPhotoURL(bannerData?.photoURL || "");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const updatedData = {
        designation,
        location,
        photoURL,
      };

      await axios.patch(
        "https://official-portfolio-nine.vercel.app/banner",
        updatedData
      );
      refetch();
      setLoading(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Banner Information</h2>

      {!bannerData ? (
        <div className="text-center">
          <button className="btn btn-primary" onClick={openModal}>
            Add Banner Information
          </button>
        </div>
      ) : (
        <div className="card bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img
              src={bannerData.photoURL}
              alt="Profile"
              className="rounded-xl w-48 h-48 object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Designation: {bannerData.designation}
            </h2>
            <p>Location: {bannerData.location}</p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary" onClick={openModal}>
                Update Information
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              Update Banner Information
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Professional Designation</span>
                </label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="Enter your professional designation"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your location"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Professional Photo</span>
                </label>
                {photoURL && (
                  <div className="mb-2">
                    <img
                      src={photoURL}
                      alt="Professional"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
                <input
                  type="file"
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                />
              </div>

              <div className="modal-action">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Update"
                  )}
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerUpdate;
