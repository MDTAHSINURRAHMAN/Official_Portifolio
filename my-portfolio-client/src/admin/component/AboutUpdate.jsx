import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const AboutUpdate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aboutData, setAboutData] = useState({
    journey: "",
    workInterests: "", 
    hobbies: "",
    personality: ""
  });

  // Fetch existing about data
  const { data: existingAbout, refetch } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/about");
      return response.data[0] || {};
    },
  });

  // Update form fields when existing data is loaded
  useState(() => {
    if (existingAbout) {
      setAboutData(existingAbout);
    }
  }, [existingAbout]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.patch("http://localhost:3000/about", aboutData);
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      console.error("Error updating about section:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAboutData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="bg-base-100 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">Current About Section</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">Programming Journey</h3>
            <p className="whitespace-pre-wrap">{existingAbout?.journey || 'Not set'}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Work Interests</h3>
            <p className="whitespace-pre-wrap">{existingAbout?.workInterests || 'Not set'}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Hobbies & Interests</h3>
            <p className="whitespace-pre-wrap">{existingAbout?.hobbies || 'Not set'}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Personality</h3>
            <p className="whitespace-pre-wrap">{existingAbout?.personality || 'Not set'}</p>
          </div>
        </div>
      </div>

      <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
        Update About Section
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Update About Section</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Programming Journey</span>
                </label>
                <textarea
                  name="journey"
                  value={aboutData.journey}
                  onChange={handleInputChange}
                  placeholder="Describe your programming journey..."
                  className="textarea textarea-bordered h-32"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Work Interests</span>
                </label>
                <textarea
                  name="workInterests"
                  value={aboutData.workInterests}
                  onChange={handleInputChange}
                  placeholder="What type of work do you enjoy?"
                  className="textarea textarea-bordered h-32"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Hobbies & Interests</span>
                </label>
                <textarea
                  name="hobbies"
                  value={aboutData.hobbies}
                  onChange={handleInputChange}
                  placeholder="Share your hobbies and interests outside programming..."
                  className="textarea textarea-bordered h-32"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Personality</span>
                </label>
                <textarea
                  name="personality"
                  value={aboutData.personality}
                  onChange={handleInputChange}
                  placeholder="Describe your personality..."
                  className="textarea textarea-bordered h-32"
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

export default AboutUpdate;
