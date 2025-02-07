import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: projectsData, refetch } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/projects');
            return res.data;
        }
    });

    const handleAddProject = () => {
        setProjects([...projects, {
            name: '',
            image: '',
            techStack: '',
            description: '',
            liveLink: '',
            githubLink: '',
            challenges: '',
            improvements: ''
        }]);
    };

    const handleRemoveProject = (index) => {
        const newProjects = projects.filter((_, i) => i !== index);
        setProjects(newProjects);
    };

    const handleProjectChange = (index, field, value) => {
        const newProjects = [...projects];
        newProjects[index][field] = value;
        setProjects(newProjects);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (projectsData?.length > 0) {
                await axios.patch('http://localhost:3000/projects', { projects });
            } else {
                await axios.post('http://localhost:3000/projects', { projects });
            }
            setIsModalOpen(false);
            refetch();
        } catch (error) {
            console.error('Error updating projects:', error);
        }
    };

    const openModal = () => {
        if (projectsData?.length > 0) {
            setProjects(projectsData[0].projects || []);
        } else {
            setProjects([]);
        }
        setIsModalOpen(true);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Projects</h2>
            
            {projectsData?.length > 0 ? (
                <div className="bg-base-200 p-6 rounded-lg mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projectsData[0].projects.map((project, index) => (
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

            <button onClick={openModal} className="btn btn-primary w-full">
                {projectsData?.length > 0 ? 'Update Projects' : 'Add Projects'}
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-base-100 p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">
                            {projectsData?.length > 0 ? 'Update Projects' : 'Add Projects'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {projects.map((project, index) => (
                                <div key={index} className="bg-base-200 p-4 rounded-lg relative">
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveProject(index)}
                                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                    >
                                        ✕
                                    </button>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Project Name</label>
                                            <input
                                                type="text"
                                                value={project.name}
                                                onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                                                className="input input-bordered w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Project Image URL</label>
                                            <input
                                                type="text"
                                                value={project.image}
                                                onChange={(e) => handleProjectChange(index, 'image', e.target.value)}
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
                                                onChange={(e) => handleProjectChange(index, 'techStack', e.target.value)}
                                                className="input input-bordered w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Description</label>
                                            <textarea
                                                value={project.description}
                                                onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                                                className="textarea textarea-bordered w-full"
                                                rows="3"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Live Link</label>
                                            <input
                                                type="text"
                                                value={project.liveLink}
                                                onChange={(e) => handleProjectChange(index, 'liveLink', e.target.value)}
                                                className="input input-bordered w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">GitHub Link</label>
                                            <input
                                                type="text"
                                                value={project.githubLink}
                                                onChange={(e) => handleProjectChange(index, 'githubLink', e.target.value)}
                                                className="input input-bordered w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Challenges Faced</label>
                                            <textarea
                                                value={project.challenges}
                                                onChange={(e) => handleProjectChange(index, 'challenges', e.target.value)}
                                                className="textarea textarea-bordered w-full"
                                                rows="3"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Future Improvements</label>
                                            <textarea
                                                value={project.improvements}
                                                onChange={(e) => handleProjectChange(index, 'improvements', e.target.value)}
                                                className="textarea textarea-bordered w-full"
                                                rows="3"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button 
                                type="button" 
                                onClick={handleAddProject}
                                className="btn btn-secondary w-full"
                            >
                                Add Another Project
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
                                    {projectsData?.length > 0 ? 'Update' : 'Add'}
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
