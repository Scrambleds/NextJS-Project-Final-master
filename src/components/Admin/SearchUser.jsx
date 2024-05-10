"use client"
import { Icon } from "@iconify/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function SearchUser({ placeholder1, placeholder2 }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [additionalQuery, setAdditionalQuery] = useState("");

  const serchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    handleSearch();
  }, [searchQuery, additionalQuery]);

  const handleSearch = useDebouncedCallback(() => {
    const params = new URLSearchParams(serchParams);

    const currentPage = params.get("page") || 1;


    if (searchQuery) {
      params.set("username", searchQuery);
    } else {
      params.delete("username");
    }

    if (additionalQuery) {
      params.set("email", additionalQuery);
    } else {
      params.delete("email");
    }
    params.set("page", currentPage);
    replace(`${pathname}?${params}`);
  },400);

  return (
    <div className="flex gap-2">
      <div className="relative ml-2">
        <Icon
          icon="material-symbols:search"
          width={25}
          height={25}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder={placeholder1}
          value={searchQuery}
          className="input input-bordered rounded-lg pr-10 py-2 w-full max-w-sm"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="relative ml-2">
        <Icon
          icon="material-symbols:search"
          width={25}
          height={25}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder={placeholder2}
          value={additionalQuery}
          className="input input-bordered rounded-lg pr-10 py-2 w-full max-w-sm"
          onChange={(e) => setAdditionalQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
