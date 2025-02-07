import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Education = () => {
    const [education, setEducation] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: educationData, refetch } = useQuery({
        queryKey: ['education'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/education');
            return res.data;
        }
    });

    const handleAddEducation = () => {
        setEducation([...education, { 
            logo: '',
            startYear: '',
            endYear: '',
            major: '',
            universityName: ''
        }]);
    };

    const handleRemoveEducation = (index) => {
        const newEducation = education.filter((_, i) => i !== index);
        setEducation(newEducation);
    };

    const handleEducationChange = (index, field, value) => {
        const newEducation = [...education];
        newEducation[index][field] = value;
        setEducation(newEducation);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (educationData?.length > 0) {
                await axios.patch('http://localhost:3000/education', { education });
            } else {
                await axios.post('http://localhost:3000/education', { education });
            }
            setIsModalOpen(false);
            refetch();
        } catch (error) {
            console.error('Error updating education:', error);
        }
    };

    const openModal = () => {
        if (educationData?.length > 0) {
            setEducation(educationData[0].education || []);
        } else {
            setEducation([]);
        }
        setIsModalOpen(true);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Education</h2>
            
            {educationData?.length > 0 ? (
                <>
                    <div className="bg-base-200 p-6 rounded-lg mb-6">
                        <div className="grid grid-cols-1 gap-4">
                            {educationData[0].education?.map((edu, index) => (
                                <div key={index} className="flex items-center space-x-4 bg-base-100 p-4 rounded-lg">
                                    <img src={edu.logo} alt={edu.universityName} className="w-16 h-16 object-contain"/>
                                    <div>
                                        <h3 className="font-bold">{edu.universityName}</h3>
                                        <p className="text-sm">{edu.major}</p>
                                        <p className="text-sm text-gray-500">{edu.startYear} - {edu.endYear}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button onClick={openModal} className="btn btn-primary">
                        Update Education
                    </button>
                </>
            ) : (
                <button onClick={openModal} className="btn btn-primary">
                    Add Education
                </button>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
                    <div className="bg-base-100 p-6 rounded-lg w-full max-w-2xl my-8">
                        <h3 className="text-xl font-bold mb-4">
                            {educationData?.length > 0 ? 'Update' : 'Add'} Education
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {education.map((edu, index) => (
                                <div key={index} className="border p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-medium">Education #{index + 1}</h4>
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveEducation(index)}
                                            className="btn btn-error btn-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">University Logo URL</label>
                                            <input
                                                type="url"
                                                value={edu.logo}
                                                onChange={(e) => handleEducationChange(index, 'logo', e.target.value)}
                                                className="input input-bordered w-full"
                                                placeholder="Enter logo URL"
                                            />
                                            {edu.logo && <img src={edu.logo} alt="Logo Preview" className="mt-2 w-16 h-16 object-contain"/>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">University Name</label>
                                            <input
                                                type="text"
                                                value={edu.universityName}
                                                onChange={(e) => handleEducationChange(index, 'universityName', e.target.value)}
                                                className="input input-bordered w-full"
                                                placeholder="Enter university name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Major</label>
                                            <input
                                                type="text"
                                                value={edu.major}
                                                onChange={(e) => handleEducationChange(index, 'major', e.target.value)}
                                                className="input input-bordered w-full"
                                                placeholder="Enter major"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Start Year</label>
                                                <input
                                                    type="text"
                                                    value={edu.startYear}
                                                    onChange={(e) => handleEducationChange(index, 'startYear', e.target.value)}
                                                    className="input input-bordered w-full"
                                                    placeholder="YYYY"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">End Year</label>
                                                <input
                                                    type="text"
                                                    value={edu.endYear}
                                                    onChange={(e) => handleEducationChange(index, 'endYear', e.target.value)}
                                                    className="input input-bordered w-full"
                                                    placeholder="YYYY or Present"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button 
                                type="button" 
                                onClick={handleAddEducation}
                                className="btn btn-secondary w-full"
                            >
                                Add Another Education
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
                                    {educationData?.length > 0 ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Education;
