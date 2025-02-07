import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FaPhone, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { data: contactData, refetch } = useQuery({
    queryKey: ["contact"],
    queryFn: async () => {
      const res = await axios.get(
        "https://official-portfolio-nine.vercel.app/contact"
      );
      return res.data[0];
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        email,
        phone,
      };

      if (contactData) {
        await axios.patch(
          "https://official-portfolio-nine.vercel.app/contact",
          updatedData
        );
      } else {
        await axios.post(
          "https://official-portfolio-nine.vercel.app/contact",
          updatedData
        );
      }
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setEmail(contactData?.email || "");
    setPhone(contactData?.phone || "");
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Contact Information</h2>

      {!contactData ? (
        <div className="text-center">
          <button className="btn btn-primary" onClick={openModal}>
            Add Contact Information
          </button>
        </div>
      ) : (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <FaEnvelope className="text-2xl" />
              <p className="text-xl">{contactData.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone className="text-2xl" />
              <p className="text-xl">{contactData.phone}</p>
            </div>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary" onClick={openModal}>
                Update Contact Information
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-base-100 p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {contactData
                ? "Update Contact Information"
                : "Add Contact Information"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
