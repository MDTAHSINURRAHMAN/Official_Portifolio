import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const SkillUpdate = () => {
    const [skills, setSkills] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: skillsData, refetch } = useQuery({
        queryKey: ['skills'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/skills');
            return res.data;
        }
    });

    const handleAddSkill = () => {
        setSkills([...skills, { name: '', category: '', iconUrl: '', proficiency: 0 }]);
    };

    const handleRemoveSkill = (index) => {
        const newSkills = skills.filter((_, i) => i !== index);
        setSkills(newSkills);
    };

    const handleSkillChange = (index, field, value) => {
        const newSkills = [...skills];
        newSkills[index][field] = value;
        setSkills(newSkills);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (skillsData?.length > 0) {
                await axios.patch('http://localhost:3000/skills', { skills });
            } else {
                await axios.post('http://localhost:3000/skills', { skills });
            }
            setIsModalOpen(false);
            refetch();
        } catch (error) {
            console.error('Error updating skills:', error);
        }
    };

    const openModal = () => {
        if (skillsData?.length > 0) {
            setSkills(skillsData[0].skills || []);
        } else {
            setSkills([]);
        }
        setIsModalOpen(true);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Skills</h2>
            
            {skillsData?.length > 0 ? (
                <>
                    <div className="bg-base-200 p-6 rounded-lg mb-6">
                        <div className="grid grid-cols-2 gap-4">
                            {skillsData[0].skills?.map((skill, index) => (
                                <div key={index} className="flex items-center space-x-2 bg-base-100 p-4 rounded-lg">
                                    <img src={skill.iconUrl} alt={skill.name} className="w-8 h-8" />
                                    <div>
                                        <h3 className="font-medium">{skill.name}</h3>
                                        <p className="text-sm">{skill.category}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button onClick={openModal} className="btn btn-primary">
                        Update Skills
                    </button>
                </>
            ) : (
                <button onClick={openModal} className="btn btn-primary">
                    Add Skills
                </button>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
                    <div className="bg-base-100 p-6 rounded-lg w-full max-w-2xl my-8">
                        <h3 className="text-xl font-bold mb-4">
                            {skillsData?.length > 0 ? 'Update' : 'Add'} Skills
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {skills.map((skill, index) => (
                                <div key={index} className="border p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-medium">Skill #{index + 1}</h4>
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveSkill(index)}
                                            className="btn btn-error btn-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Name</label>
                                            <input
                                                type="text"
                                                value={skill.name}
                                                onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                                                className="input input-bordered w-full"
                                                placeholder="e.g. React, Node.js, etc."
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Category</label>
                                            <select
                                                value={skill.category}
                                                onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
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
                                            <label className="block text-sm font-medium mb-2">Icon URL</label>
                                            <input
                                                type="url"
                                                value={skill.iconUrl}
                                                onChange={(e) => handleSkillChange(index, 'iconUrl', e.target.value)}
                                                className="input input-bordered w-full"
                                                placeholder="Enter icon URL"
                                            />
                                            {skill.iconUrl && <img src={skill.iconUrl} alt="Icon Preview" className="mt-2 w-10 h-10 object-cover"/>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Proficiency (0-100)</label>
                                            <input
                                                type="number"
                                                value={skill.proficiency}
                                                onChange={(e) => handleSkillChange(index, 'proficiency', parseInt(e.target.value))}
                                                className="input input-bordered w-full"
                                                min="0"
                                                max="100"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button 
                                type="button" 
                                onClick={handleAddSkill}
                                className="btn btn-secondary w-full"
                            >
                                Add Another Skill
                            </button>

                            <div className="flex justify-end gap-4">
                                <button 
                                    type="button" 
                                    className="btn btn-ghost"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                >
                                    {skillsData?.length > 0 ? 'Update' : 'Add'}
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
