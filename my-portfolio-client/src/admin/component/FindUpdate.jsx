import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const FindUpdate = () => {
  const [socialLink, setSocialLink] = useState({
    name: "",
    url: "",
    logo: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: socialLinksData, refetch } = useQuery({
    queryKey: ["socialLinks"],
    queryFn: async () => {
      const res = await axios.get(
        "https://official-portfolio-nine.vercel.app/find-update"
      );
      return res.data;
    },
  });

  const handleLinkChange = (field, value) => {
    setSocialLink({
      ...socialLink,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://official-portfolio-nine.vercel.app/find-update",
        socialLink
      );
      setIsModalOpen(false);
      refetch();
      setSocialLink({
        name: "",
        url: "",
        logo: "",
      });
    } catch (error) {
      console.error("Error adding social link:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://official-portfolio-nine.vercel.app/find-update/${id}`
      );
      refetch();
    } catch (error) {
      console.error("Error deleting social link:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Social Links</h2>

      <div className="bg-base-200 p-6 rounded-lg mb-6">
        <div className="grid grid-cols-2 gap-4">
          {socialLinksData?.map((link) => (
            <div
              key={link._id}
              className="flex items-center justify-between space-x-2 bg-base-100 p-4 rounded-lg"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <img src={link.logo} alt={link.name} className="w-6 h-6 mr-2" />
                <span>{link.name}</span>
              </a>
              <button
                onClick={() => handleDelete(link._id)}
                className="btn btn-error btn-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <button onClick={openModal} className="btn btn-primary">
        Add New Social Link
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
          <div className="bg-base-100 p-6 rounded-lg w-full max-w-2xl my-8">
            <h3 className="text-xl font-bold mb-4">Add New Social Link</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border p-4 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={socialLink.name}
                      onChange={(e) => handleLinkChange("name", e.target.value)}
                      className="input input-bordered w-full"
                      placeholder="e.g. GitHub, LinkedIn, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      URL
                    </label>
                    <input
                      type="url"
                      value={socialLink.url}
                      onChange={(e) => handleLinkChange("url", e.target.value)}
                      className="input input-bordered w-full"
                      placeholder="Enter profile URL"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Logo URL
                    </label>
                    <input
                      type="url"
                      value={socialLink.logo}
                      onChange={(e) => handleLinkChange("logo", e.target.value)}
                      className="input input-bordered w-full"
                      placeholder="Enter logo image URL"
                    />
                    {socialLink.logo && (
                      <img
                        src={socialLink.logo}
                        alt="Logo Preview"
                        className="mt-2 w-10 h-10 object-cover"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindUpdate;
