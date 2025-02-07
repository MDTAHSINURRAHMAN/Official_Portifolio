import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from './Loading';

const Contact = () => {
  const form = useRef();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { data: contact, isLoading } = useQuery({
    queryKey: ['contact'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/contact');
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false
  });

  const sendEmail = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    emailjs.sendForm('service_d7aypyg', 'template_57z3ybi', form.current, 'lLc34fENlSbQG8IkO')
      .then((result) => {
        setSuccess('Email sent successfully!');
        form.current.reset();
      })
      .catch((error) => {
        setError('Failed to send email. Please try again later.');
        console.error('Failed to send email:', error);
      });
  };

  if (isLoading) return <Loading />;

  return (
    <motion.section
      id="contact"
      className="rounded-xl p-6 hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-text-color mb-6 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-20 after:h-1 after:bg-red-color"
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2 }}
      >
        Get In Touch
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-red-color/10 flex items-center justify-center">
              <FaEnvelope className="text-xl text-red-color" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-color">Email</h3>
              <p className="text-text-color/70">{contact[0]?.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-red-color/10 flex items-center justify-center">
              <FaPhone className="text-xl text-red-color" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-color">Phone</h3>
              <p className="text-text-color/70">{contact[0]?.phone}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-red-color/10 flex items-center justify-center">
              <FaMapMarkerAlt className="text-xl text-red-color" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-color">Location</h3>
              <p className="text-text-color/70">{contact[0]?.location}</p>
            </div>
          </div>
        </motion.div>

        <motion.form
          ref={form}
          onSubmit={sendEmail}
          className="space-y-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {error && (
            <div className="alert alert-error text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success text-sm">
              {success}
            </div>
          )}
          <div>
            <input
              type="text"
              name="from_name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 rounded-lg bg-background-color/50 border border-red-color/20 focus:border-red-color focus:outline-none text-text-color"
            />
          </div>
          <div>
            <input
              type="email"
              name="from_email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 rounded-lg bg-background-color/50 border border-red-color/20 focus:border-red-color focus:outline-none text-text-color"
            />
          </div>
          <div>
            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows="5"
              className="w-full px-4 py-3 rounded-lg bg-background-color/50 border border-red-color/20 focus:border-red-color focus:outline-none text-text-color resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full btn bg-red-color border-red-color hover:bg-red-600 text-white transition-all duration-300"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </motion.section>
  );
};

export default Contact;
