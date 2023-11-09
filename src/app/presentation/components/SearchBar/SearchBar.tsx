import React from 'react';
import { Search } from "@/svgImports";
import SearchBar from "./SearchPageDesign";

interface SearchSaveProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
  }

export default function SearchSave({ setSearchTerm, searchTerm }: SearchSaveProps) {
    return (
        <div className="w-full h-full">
            <div className="w-full flex justify-center">
            <SearchBar 
                svgIcon={Search} 
                value={searchTerm}
                placeholder="Ara"
                setSearchTerm={setSearchTerm}
                rounded="full"
            />
            </div>
        </div>
    );
}
