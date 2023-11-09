import {useState} from "react";
import Input from "../Input";

interface YourComponentProps {
    svgIcon: React.ReactNode;
    value: string;
    placeholder: string;
    setSearchTerm: (term: string) => void;
    rounded?: string;
}

const SearchBar: React.FC<YourComponentProps> = ({
                                                     svgIcon,
                                                     value,
                                                     placeholder,
                                                     setSearchTerm,
                                                     rounded
                                                 }) => {
    const [isFocused, setIsFocused] = useState(false);



    const handleDivBlur = () => {
        setIsFocused(false);
    };
    const handleDivFocus = () => {
        setIsFocused(true);
    };

    const handleSearch = (event: any) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div
        style={{width: isFocused ? '200px' : ' '}}
        className={`relative w-[40px] hover:w-[200px] after:bg-tableHead transition-all duration-500 ease-out`}
        onFocus={handleDivFocus}
        onBlur={handleDivBlur}
        >
            <Input
                minH={"40"}
                svgIcon={svgIcon}
                value={value}
                placeholder={placeholder}
                onInputChange={handleSearch}
                rounded={rounded}
            />
        </div>
    );
};

export default SearchBar