import { useState, FormEvent, ChangeEvent } from "react";
import Icon from "@components/Icon";
import Search from "@public/icons/search.svg";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    // Perform search logic with the searchQuery value
    console.log("Searching for:", searchQuery);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form
      onSubmit={handleSearch}
      className='relative w-full h-full flex items-center'
    >
      <input
        type='text'
        placeholder='Search...'
        value={searchQuery}
        onChange={handleChange}
        className='pl-2 rounded-full w-full h-full focus:outline-none focus:ring focus:border-white'
      />

      <button
        type='submit'
        className='fill-white h-full w-[40px] flex items-center justify-center absolute top-0 right-0 bg-gray-800 text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring focus:border-white'
      >
        <Icon Svg={Search} />
      </button>
    </form>
  );
}
