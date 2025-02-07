import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const SkillUpdate = () => {
  const [skill, setSkill] = useState({
    name: "",
    category: "",
    iconUrl: "",
    proficiency: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: skillsData, refetch } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const res = await axios.get(
        "https://official-portfolio-nine.vercel.app/skills"
      );
      return res.data;
    },
  });

  const handleSkillChange = (field, value) => {
    setSkill({
      ...skill,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://official-portfolio-nine.vercel.app/skills",
        skill
      );
      setIsModalOpen(false);
      refetch();
      setSkill({
        name: "",
        category: "",
        iconUrl: "",
        proficiency: 0,
      });
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://official-portfolio-nine.vercel.app/skills/${id}`
      );
      refetch();
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Skills</h2>

      <div className="bg-base-200 p-6 rounded-lg mb-6">
        <div className="grid grid-cols-2 gap-4">
          {skillsData?.map((skill) => (
            <div
              key={skill._id}
              className="flex items-center justify-between space-x-2 bg-base-100 p-4 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <img src={skill.iconUrl} alt={skill.name} className="w-8 h-8" />
                <div>
                  <h3 className="font-medium">{skill.name}</h3>
                  <p className="text-sm">{skill.category}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(skill._id)}
                className="btn btn-error btn-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <button onClick={openModal} className="btn btn-primary">
        Add New Skill
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
          <div className="bg-base-100 p-6 rounded-lg w-full max-w-2xl my-8">
            <h3 className="text-xl font-bold mb-4">Add New Skill</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border p-4 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) =>
                        handleSkillChange("name", e.target.value)
                      }
                      className="input input-bordered w-full"
                      placeholder="e.g. React, Node.js, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Category
                    </label>
                    <select
                      value={skill.category}
                      onChange={(e) =>
                        handleSkillChange("category", e.target.value)
                      }
                      className="select select-bordered w-full"
                    >
                      <option value="">Select category</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Tools">Tools</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Icon URL
                    </label>
                    <input
                      type="url"
                      value={skill.iconUrl}
                      onChange={(e) =>
                        handleSkillChange("iconUrl", e.target.value)
                      }
                      className="input input-bordered w-full"
                      placeholder="Enter icon URL"
                    />
                    {skill.iconUrl && (
                      <img
                        src={skill.iconUrl}
                        alt="Icon Preview"
                        className="mt-2 w-10 h-10 object-cover"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Proficiency (0-100)
                    </label>
                    <input
                      type="number"
                      value={skill.proficiency}
                      onChange={(e) =>
                        handleSkillChange(
                          "proficiency",
                          parseInt(e.target.value)
                        )
                      }
                      className="input input-bordered w-full"
                      min="0"
                      max="100"
                    />
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
                  Add Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillUpdate;
