import React, { useRef, useState, useEffect } from "react";
import api from "../api/api";
import SearchUserCard from "./SearchUserCard";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [users, setUsers] = useState([]);
  const [loadding, setLoadding] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const dropDownRef = useRef();
  const { token } = JSON.parse(window.localStorage.getItem("profile"));
  useEffect(() => {
    const timeId = setTimeout(() => {
      setDebounced(search);
    }, 500);

    return () => clearTimeout(timeId);
  }, [search]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadding(true);
      const { data } = await api.get(`user/search/${debounced}`, {
        headers: {
          Authorization: token,
        },
      });
      setShowDropDown(true);
      setLoadding(false);
      setUsers([...data.users]);
    };

    if (debounced.length > 0) {
      fetchUsers();
    } else {
      setShowDropDown(false);
      setUsers([]);
    }
  }, [debounced]);

  const renderedUsers = users?.map((user, index) => {
    return (
      <SearchUserCard
        setShowDropDown={setShowDropDown}
        user={user}
        key={index}
      />
    );
  });
  document.body.addEventListener("click", (e) => {
    if (dropDownRef.current?.contains(e.target)) {
      return;
    } else {
      setShowDropDown(false);
    }
  });
  return (
    <div className="search position-relative px-3 d-flex w-100 rounded-pill bg-light align-items-center">
      <div className="icon bg-light">
        {loadding ? (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        ) : (
          <i className="bi bi-search"></i>
        )}
      </div>
      <input
        onBlur={() => setSearch("")}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={(e) => setSearch(e.target.value)}
        type="text"
        className="form-control text-black bg-light rounded-0"
        placeholder="Search for creator"
      />

      <div
        ref={dropDownRef}
        className={`search-dropdown shadow overflow-hidden rounded-4 bg-white position-absolute ${
          showDropDown ? "d-block" : "d-none"
        }`}
      >
        {renderedUsers}
      </div>
    </div>
  );
};

export default SearchBar;
