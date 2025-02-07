import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../conponents/Loading";
import { motion } from "framer-motion";

const Quote = () => {
  const { data: quote, isLoading } = useQuery({
    queryKey: ["quote"],
    queryFn: async () => {
      const response = await axios.get(
        "https://official-portfolio-nine.vercel.app/quote"
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const text = form.quote.value;
    const author = form.author.value;

    try {
      await axios.patch("https://official-portfolio-nine.vercel.app/quote", {
        text,
        author,
      });
      form.reset();
    } catch (error) {
      console.error("Error updating quote:", error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-text-color mb-6">
          Update Quote
        </h2>

        <div className="bg-background-color/50 p-6 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-text-color mb-2">Quote Text</label>
              <textarea
                name="quote"
                defaultValue={quote?.[0]?.text}
                className="textarea textarea-bordered w-full h-32 bg-white"
                placeholder="Enter quote text..."
                required
              />
            </div>

            <div>
              <label className="block text-text-color mb-2">Author</label>
              <input
                type="text"
                name="author"
                defaultValue={quote?.[0]?.author}
                className="input input-bordered w-full bg-white"
                placeholder="Enter author name..."
                required
              />
            </div>

            <button
              type="submit"
              className="btn bg-red-color hover:bg-red-600 text-white border-none w-full"
            >
              Update Quote
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Quote;
