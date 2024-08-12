"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 9;

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post");
      const data = await res.json();
      setPosts(data);
      setFilteredPosts(data);
    };

    const fetchCategories = async () => {
      const res = await fetch("/api/category");
      const data = await res.json();
      setCategories(data);
    };

    fetchPosts();
    fetchCategories();
  }, []);

  const handleSearch = (event: any) => {
    const keyword = event.target.value.toLowerCase();
    setSearchTerm(keyword);
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(keyword)
    );
    setFilteredPosts(filtered);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryClick = (categoryId) => {
    const updatedSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(updatedSelectedCategories);
    filterPosts(searchTerm, updatedSelectedCategories, sortBy);
  };

  const handleSortChange = (event) => {
    const sortByValue = event.target.value;
    setSortBy(sortByValue);
    filterPosts(searchTerm, selectedCategories, sortByValue);
  };

  const filterPosts = (keyword, categories, sortBy) => {
    let filtered = posts.filter((post) => {
      const matchesKeyword = post.title.toLowerCase().includes(keyword);
      const matchesCategory =
        categories.length === 0 ||
        categories.every((categoryId) =>
          post.techs.some((tech) => tech.id === categoryId)
        );
      return matchesKeyword && matchesCategory;
    });

    if (sortBy === "date") {
      filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "title") {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredPosts(filtered);
    setCurrentPage(1);
  };

  return (
    <main className="flex flex-col justify-center px-[10%]">
      <div className="flex flex-row gap-4">
        <svg
          width="100px"
          height="100px"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.25781 3.11684C3.67771 3.45796 3.83523 3.43193 4.62369 3.37933L12.0571 2.93299C12.2147 2.93299 12.0836 2.77571 12.0311 2.74957L10.7965 1.85711C10.56 1.67347 10.2448 1.46315 9.64083 1.51576L2.44308 2.04074C2.18059 2.06677 2.12815 2.19801 2.2327 2.30322L3.25781 3.11684ZM3.7041 4.84917V12.6704C3.7041 13.0907 3.91415 13.248 4.38693 13.222L12.5562 12.7493C13.0292 12.7233 13.0819 12.4341 13.0819 12.0927V4.32397C13.0819 3.98306 12.9508 3.79921 12.6612 3.82545L4.12422 4.32397C3.80918 4.35044 3.7041 4.50803 3.7041 4.84917ZM11.7688 5.26872C11.8212 5.50518 11.7688 5.74142 11.5319 5.76799L11.1383 5.84641V11.6205C10.7965 11.8042 10.4814 11.9092 10.2188 11.9092C9.79835 11.9092 9.69305 11.7779 9.37812 11.3844L6.80345 7.34249V11.2532L7.61816 11.437C7.61816 11.437 7.61816 11.9092 6.96086 11.9092L5.14879 12.0143C5.09615 11.9092 5.14879 11.647 5.33259 11.5944L5.80546 11.4634V6.29276L5.1489 6.24015C5.09625 6.00369 5.22739 5.66278 5.5954 5.63631L7.53935 5.50528L10.2188 9.5998V5.97765L9.53564 5.89924C9.4832 5.61018 9.69305 5.40028 9.95576 5.37425L11.7688 5.26872ZM1.83874 1.33212L9.32557 0.780787C10.245 0.701932 10.4815 0.754753 11.0594 1.17452L13.4492 2.85424C13.8436 3.14309 13.975 3.22173 13.975 3.53661V12.7493C13.975 13.3266 13.7647 13.6681 13.0293 13.7203L4.33492 14.2454C3.78291 14.2717 3.52019 14.193 3.23111 13.8253L1.47116 11.5419C1.1558 11.1216 1.02466 10.8071 1.02466 10.4392V2.25041C1.02466 1.77825 1.23504 1.38441 1.83874 1.33212Z"
            fill="#fff"
          />
        </svg>
        <div className="flex flex-col">
          <h1>My Notion Blogs</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300" data-fade="1">
            I integrate using Notion you can view my posts, thoughts, mental
            models, and notes about various technologies.
          </p>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={handleSearch}
        className="mt-4 p-2 border text-[#fff] bg-transparent border-gray-300 rounded-md"
      />
      <ul className="flex flex-wrap gap-4 justify-stretch mt-4">
        {categories.map((category) => (
          <li
            key={category.id}
            className={`cursor-pointer py-1 px-2 border rounded-md w-fit ${
              selectedCategories.includes(category.id)
                ? "bg-[#fff] text-[#141414]"
                : "bg-transparent text-[#fff]"
            }`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </li>
        ))}
      </ul>
      <div className="flex w-full items-center justify-end">
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="custom-select mt-4 p-2 border text-[#fff] bg-transparent border-gray-300 rounded-md"
        >
          <option value="date">Sort by Date</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {currentPosts.map((post) => (
          <li
            className="w-full rounded-md border border-gray-300 scale-100 hover:scale-[1.02] active:scale-[0.97] motion-safe:transform-gpu transition duration-100 motion-reduce:hover:scale-100 animate-shadow"
            key={post.id}
          >
            <a
              href={`/blogs/${post.slug}`}
              className="block h-full rounded-md focus:outline-none focus-visible:ring focus-visible:ring-primary-300"
            >
              <div className="relative">
                <figure className="relative pointer-events-none shadow dark:shadow-none overflow-hidden rounded w-full h-48 max-h-48 max-w-full">
                  <Image
                    src={post.background}
                    alt={post.slug}
                    fill
                    loading="lazy"
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover"
                  />
                </figure>

                <div className="absolute bottom-0 w-full px-4 py-2 mt-2 flex flex-wrap justify-end gap-x-2 gap-y-1 text-sm text-black dark:text-gray-100">
                  {post.techs.map((tech: any) => (
                    <button
                      key={tech.id}
                      className="bg-opacity-80 dark:!bg-opacity-60 inline-block rounded-md px-1.5 py-0.5 font-medium transition-colors bg-gray-100 text-gray-700 hover:text-black disabled:bg-gray-200 disabled:text-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:text-white dark:disabled:bg-gray-600 dark:disabled:text-gray-500 focus:outline-none focus-visible:ring focus-visible:ring-primary-300 disabled:cursor-not-allowed"
                    >
                      {tech.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-gray-300">{post.title}</h3>
                <p className="mb-2 mt-4 text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-bold text-gray-800 dark:text-gray-100">
                    {post.date}
                  </span>
                </p>
                <p className="overflow-hidden text-ellipsis box-content line-clamp-3 text-sm text-gray-700 dark:text-gray-300">
                  {post.summary}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded-md border ${
              currentPage === index + 1
                ? "bg-[#fff] text-[#141414]"
                : "bg-transparent text-[#fff]"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </main>
  );
}
