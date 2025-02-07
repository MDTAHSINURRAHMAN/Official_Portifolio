import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Project = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [project, setProject] = useState({
        name: '',
        image: '',
        techStack: '',
        description: '',
        liveLink: '',
        githubLink: '',
        challenges: '',
        improvements: '',
        slotID: Date.now().toString()
    });

    const { data: projectsData, refetch } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/projects');
            return res.data;
        }
    });

    const handleProjectChange = (field, value) => {
        setProject(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/projects', project);
            setIsModalOpen(false);
            setProject({
                name: '',
                image: '',
                techStack: '',
                description: '',
                liveLink: '',
                githubLink: '',
                challenges: '',
                improvements: '',
                slotID: Date.now().toString()
            });
            refetch();
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Projects</h2>
            
            {projectsData?.length > 0 ? (
                <div className="bg-base-200 p-6 rounded-lg mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projectsData.map((project, index) => (
                            <div key={index} className="card bg-base-100 shadow-xl">
                                <figure><img src={project.image} alt={project.name} /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{project.name}</h2>
                                    <p className="font-semibold">Tech Stack: {project.techStack}</p>
                                    <p>{project.description}</p>
                                    <div className="flex gap-2">
                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Live Site</a>
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">GitHub</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-center mb-6">No projects added yet.</p>
            )}

            <button onClick={() => setIsModalOpen(true)} className="btn btn-primary w-full">
                Add New Project
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-base-100 p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">Add New Project</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="bg-base-200 p-4 rounded-lg">
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Project Name</label>
                                        <input
                                            type="text"
                                            value={project.name}
                                            onChange={(e) => handleProjectChange('name', e.target.value)}
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Project Image URL</label>
                                        <input
                                            type="text"
                                            value={project.image}
                                            onChange={(e) => handleProjectChange('image', e.target.value)}
                                            className="input input-bordered w-full"
                                            placeholder="Enter image URL"
                                        />
                                        {project.image && (
                                            <img 
                                                src={project.image} 
                                                alt="Preview" 
                                                className="mt-2 w-32 h-32 object-cover rounded-lg"
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Tech Stack</label>
                                        <input
                                            type="text"
                                            value={project.techStack}
                                            onChange={(e) => handleProjectChange('techStack', e.target.value)}
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Description</label>
                                        <textarea
                                            value={project.description}
                                            onChange={(e) => handleProjectChange('description', e.target.value)}
                                            className="textarea textarea-bordered w-full"
                                            rows="3"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Live Link</label>
                                        <input
                                            type="text"
                                            value={project.liveLink}
                                            onChange={(e) => handleProjectChange('liveLink', e.target.value)}
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">GitHub Link</label>
                                        <input
                                            type="text"
                                            value={project.githubLink}
                                            onChange={(e) => handleProjectChange('githubLink', e.target.value)}
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Challenges Faced</label>
                                        <textarea
                                            value={project.challenges}
                                            onChange={(e) => handleProjectChange('challenges', e.target.value)}
                                            className="textarea textarea-bordered w-full"
                                            rows="3"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Future Improvements</label>
                                        <textarea
                                            value={project.improvements}
                                            onChange={(e) => handleProjectChange('improvements', e.target.value)}
                                            className="textarea textarea-bordered w-full"
                                            rows="3"
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
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                >
                                    Add Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Project;
